import { supabase } from '@/lib/supabase'
import type { ReadStatus } from '@/lib/readStatus'
import type { Database } from '@/lib/database.types'

export type Student = Database['public']['Tables']['students']['Row']
export type StudentLevel = 'on' | 'ahead' | 'advanced'

/** How Nikki appears for this child (parent-chosen). Voice = static nameplate,
 *  ElevenLabs voice still plays. Defaults to video. */
export type AvatarMode = 'video' | 'orb' | 'voice'

export const AVATAR_MODES: { id: AvatarMode; label: string; desc: string }[] = [
  { id: 'video', label: 'Video', desc: "Nikki's animated face" },
  { id: 'orb', label: 'Orb', desc: 'A calmer animated orb' },
  { id: 'voice', label: 'Voice only', desc: 'A simple nameplate, no animated face' },
]

/** Resolve a student's avatar mode, defaulting to video for null/legacy/invalid. */
export function avatarModeOf(student: Pick<Student, 'avatar_mode'> | null | undefined): AvatarMode {
  const m = student?.avatar_mode
  return m === 'orb' || m === 'voice' ? m : 'video'
}

export interface StudentInput {
  first_name: string
  grade: string
  level: StudentLevel
  avatar_mode?: AvatarMode
}

export const GRADES = ['K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']

export const LEVELS: { id: StudentLevel; label: string; desc: string }[] = [
  { id: 'on', label: 'On grade level', desc: 'Practice right at their current grade' },
  { id: 'ahead', label: 'Getting ahead', desc: 'Build toward the next grade up' },
  { id: 'advanced', label: 'Advanced challenge', desc: 'Stretch well beyond their grade' },
]

const AV_COLORS = ['#2E5BB8', '#1F9E6F', '#8B5CD6', '#E8943A', '#CC543C', '#0E8B8B']

export function gradeLabel(grade: string): string {
  return grade === 'K' ? 'Kindergarten' : `Grade ${grade}`
}

export function levelLabel(level: string): string {
  return LEVELS.find((l) => l.id === level)?.label ?? level
}

export function avColor(index: number): string {
  return AV_COLORS[index % AV_COLORS.length]
}

export function initials(name: string): string {
  return (name || '?').trim().charAt(0).toUpperCase()
}

/** Children belonging to a parent, ordered stably by id so avatar colors are consistent. */
/**
 * This parent's children. Best-effort: [] on a read failure.
 *
 * Pass a ReadStatus when an empty list would be SHOWN to someone. "No children
 * yet, add one to get started" is an invitation to re-add a child who already
 * exists, and a failed read must never produce it.
 */
export async function listStudents(parentId: string, status?: ReadStatus): Promise<Student[]> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('parent_id', parentId)
    .order('id', { ascending: true })

  if (error || !data) {
    console.error('listStudents read failed', error)
    if (status) status.failed = true
    return []
  }
  return data
}

export async function getStudent(id: string): Promise<Student | null> {
  const { data } = await supabase.from('students').select('*').eq('id', id).maybeSingle()
  return data ?? null
}

/** Create a child and return its new id (needed to route into placement). */
export async function createStudent(
  parentId: string,
  input: StudentInput,
): Promise<{ id: string | null; error: unknown }> {
  const { data, error } = await supabase
    .from('students')
    .insert({ parent_id: parentId, ...input })
    .select('id')
    .single()
  // A blocked or no-op insert must never fail silently in production: surface the
  // real cause (Postgres error code + message) so a seat-cap trigger, an RLS
  // with-check failure, or a policy issue is visible in the console, not swallowed.
  if (error || !data?.id) {
    const e = (error ?? {}) as { code?: string; message?: string; details?: string }
    console.error('[createStudent] insert did not return a row', {
      code: e.code,
      message: e.message,
      details: e.details,
      hadRow: !!data?.id,
    })
  }
  return { id: data?.id ?? null, error }
}

/**
 * Set the per-child consent to surface above-grade / SAT framing. Placement still
 * advances the child at their real level regardless; this governs framing only.
 */
export async function setAboveGradeConsent(studentId: string, ok: boolean) {
  return supabase.from('students').update({ above_grade_ok: ok }).eq('id', studentId)
}

export async function updateStudent(id: string, input: StudentInput) {
  return supabase.from('students').update(input).eq('id', id)
}

/** Focused write of just the Nikki avatar mode — the same students.avatar_mode
 *  field the edit form writes, so Settings and the edit form stay in sync. Does
 *  not touch grade, so it never triggers a reassessment. */
export async function updateAvatarMode(studentId: string, mode: AvatarMode) {
  return supabase.from('students').update({ avatar_mode: mode }).eq('id', studentId)
}

export async function deleteStudent(id: string) {
  return supabase.from('students').delete().eq('id', id)
}

// ---------------------------------------------------------------------------
// Optional per-child sign-in PIN (migration 0013).
//
// Children never get an auth account — this is light, shared-device gating so a
// child can open their own space (and not wander into a sibling's or the parent
// area) on a device the parent is already signed into. The raw PIN is hashed in
// the database by the set_student_pin RPC; the client only ever learns whether a
// PIN exists (pin_hash is non-null) and asks the DB to verify an attempt.
// ---------------------------------------------------------------------------

/** Whether this child has a sign-in PIN set (so the picker prompts before entry). */
export function hasPin(student: Pick<Student, 'pin_hash'>): boolean {
  return !!student.pin_hash
}

/** Set/replace a child's 4-digit PIN (hashed server-side). Owner-checked in the RPC. */
export async function setStudentPin(studentId: string, pin: string) {
  return supabase.rpc('set_student_pin', { p_student_id: studentId, p_pin: pin })
}

/** Remove a child's PIN (returns them to direct entry). Owner-checked in the RPC. */
export async function clearStudentPin(studentId: string) {
  return supabase.rpc('clear_student_pin', { p_student_id: studentId })
}

/** Verify a child's PIN attempt. Returns false on any error or mismatch. */
export async function verifyStudentPin(studentId: string, pin: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('verify_student_pin', {
    p_student_id: studentId,
    p_pin: pin,
  })
  return !error && data === true
}

/** Children that count against the plan's seat cap (active only). */
export function activeStudents(students: Student[]): Student[] {
  return students.filter((s) => s.active)
}

/**
 * Pause or resume a child profile for seat enforcement. Inactive children are
 * never deleted — their data is kept; they just don't count against the cap and
 * can't run learning sessions until reactivated. Used by the over-cap seat picker.
 * The database refuses turning a child on beyond the seat cap (see isSeatCapError).
 */
export async function setStudentActive(id: string, active: boolean) {
  return supabase.from('students').update({ active }).eq('id', id)
}

/** Postgres error text for a refusal, without trusting its shape. */
function errorText(error: unknown): string {
  if (!error || typeof error !== 'object') return ''
  const e = error as { message?: unknown; details?: unknown }
  return `${typeof e.message === 'string' ? e.message : ''} ${typeof e.details === 'string' ? e.details : ''}`
}

/**
 * Did the database refuse this because every seat is in use? Migration 0031
 * refuses adding an active child, or turning a paused one on, beyond the seat
 * cap, with a message starting seat_cap_reached.
 */
export function isSeatCapError(error: unknown): boolean {
  return errorText(error).includes('seat_cap_reached')
}

/**
 * Did the database refuse this because the school manages the field? Migration
 * 0031 locks name, grade, level and SAT framing on a school-covered student.
 */
export function isSchoolManagedError(error: unknown): boolean {
  return errorText(error).includes('school_managed')
}
