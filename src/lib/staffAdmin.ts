import { supabase } from '@/lib/supabase'

/**
 * /admin/staff: platform admins manage each school's staff list. The database
 * (migration 0038) refuses everyone else and never deletes a row; people are
 * deactivated instead.
 *
 * The CSV preview runs the SAME checks the database runs (admin_save_staff),
 * so a row flagged here is a row the save would refuse, and a clean row is one
 * it will take. Only clean rows are sent.
 */

export const STAFF_ROLES = ['teacher', 'guidance', 'admin', 'academic_dean'] as const
export type StaffRole = (typeof STAFF_ROLES)[number]

export const ROLE_LABEL: Record<StaffRole, string> = {
  teacher: 'Teacher',
  guidance: 'Guidance',
  admin: 'Admin',
  academic_dean: 'Academic dean',
}

export interface StaffSchool {
  schoolId: string
  name: string
  domains: string[]
  staffActive: number
  staffTotal: number
}

export interface StaffMember {
  id: string
  email: string
  fullName: string | null
  role: StaffRole
  active: boolean
  /** Has signed in, so the row is tied to an account. */
  linked: boolean
}

export interface StaffInput {
  email: string
  full_name: string
  role: StaffRole
}

// Mirrors admin_save_staff in migration 0038.
const EMAIL_RE = /^[^@\s,;]+@[^@\s,;]+\.[a-z]{2,}$/

/** "Academic Dean", "academic-dean", "ACADEMIC_DEAN" all mean academic_dean. */
export function normalizeRole(raw: string): StaffRole | null {
  const r = raw.trim().toLowerCase().replace(/[\s-]+/g, '_')
  return (STAFF_ROLES as readonly string[]).includes(r) ? (r as StaffRole) : null
}

/** The problems with one person's details, in plain words. Empty when it is fine. */
export function checkStaffInput(email: string, fullName: string, role: string): string[] {
  const problems: string[] = []
  const e = email.trim().toLowerCase()
  if (!EMAIL_RE.test(e)) problems.push(e ? `${e} is not an email address` : 'Email is missing')
  const n = fullName.trim()
  if (!n) problems.push('Name is missing')
  else if (n.length > 120) problems.push('Name is longer than 120 characters')
  if (!normalizeRole(role)) {
    problems.push(role.trim() ? `"${role.trim()}" is not a role (teacher, guidance, admin, academic dean)` : 'Role is missing')
  }
  return problems
}

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

/** RFC 4180 style: quoted fields, doubled quotes, commas and line breaks inside quotes, CRLF or LF, a BOM. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let quoted = false
  // A byte-order mark (Excel adds one) is not part of the first column name.
  const s = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (quoted) {
      if (c === '"' && s[i + 1] === '"') {
        field += '"'
        i++
      } else if (c === '"') quoted = false
      else field += c
    } else if (c === '"') quoted = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && s[i + 1] === '\n') i++
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else field += c
  }
  if (field !== '' || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows.filter((r) => r.some((f) => f.trim() !== ''))
}

const HEADER: Record<string, 'email' | 'full_name' | 'role'> = {
  email: 'email',
  'email address': 'email',
  full_name: 'full_name',
  'full name': 'full_name',
  name: 'full_name',
  role: 'role',
}

export type PreviewStatus = 'new' | 'update' | 'reactivate' | 'unchanged' | 'error'

export interface PreviewRow {
  /** 1-based line in the file, counting the header as line 1. */
  line: number
  email: string
  fullName: string
  role: string
  status: PreviewStatus
  problems: string[]
  /** Saved anyway, but worth a look: e.g. not at one of the school's domains. */
  warnings: string[]
  input: StaffInput | null
}

export interface CsvPreview {
  /** A problem with the file itself (no header, missing columns). */
  fileError: string | null
  rows: PreviewRow[]
  counts: Record<PreviewStatus, number>
  /** The rows the save will send: everything not flagged and not unchanged. */
  toSave: StaffInput[]
}

/**
 * Pure: read a CSV (email, full_name, role, any order, header required) and
 * say what saving it would do to the current list.
 */
export function previewCsv(text: string, current: StaffMember[], schoolDomains: string[]): CsvPreview {
  const counts: Record<PreviewStatus, number> = { new: 0, update: 0, reactivate: 0, unchanged: 0, error: 0 }
  const empty = (fileError: string): CsvPreview => ({ fileError, rows: [], counts, toSave: [] })
  const table = parseCsv(text)
  if (table.length === 0) return empty('The file is empty.')

  const cols = table[0].map((h) => HEADER[h.trim().toLowerCase()] ?? null)
  const at = (k: 'email' | 'full_name' | 'role') => cols.indexOf(k)
  const missing = (['email', 'full_name', 'role'] as const).filter((k) => at(k) < 0)
  if (missing.length) {
    return empty(`The first line must name the columns email, full_name and role. Missing: ${missing.join(', ')}.`)
  }
  if (table.length === 1) return empty('The file has a header but no people.')
  if (table.length - 1 > 500) return empty('At most 500 people at a time. Split the file and upload each part.')

  const byEmail = new Map(current.map((m) => [m.email.toLowerCase(), m]))
  const seen = new Map<string, number>()
  const domains = schoolDomains.map((d) => d.toLowerCase())
  const rows: PreviewRow[] = table.slice(1).map((cells, i) => {
    const line = i + 2
    const email = (cells[at('email')] ?? '').trim().toLowerCase()
    const fullName = (cells[at('full_name')] ?? '').trim()
    const role = (cells[at('role')] ?? '').trim()
    const problems = checkStaffInput(email, fullName, role)
    if (email && seen.has(email)) problems.push(`Same email as line ${seen.get(email)}`)
    else if (email) seen.set(email, line)
    const warnings: string[] = []
    const domain = email.split('@')[1] ?? ''
    if (!problems.length && domains.length && !domains.includes(domain)) {
      warnings.push(`Not a school address (${domains.join(', ')}); this person signs in with ${domain}`)
    }
    let status: PreviewStatus = 'error'
    let input: StaffInput | null = null
    if (!problems.length) {
      input = { email, full_name: fullName, role: normalizeRole(role)! }
      const now = byEmail.get(email)
      if (!now) status = 'new'
      else if (!now.active) status = 'reactivate'
      else if (now.fullName === input.full_name && now.role === input.role) status = 'unchanged'
      else status = 'update'
    }
    counts[status]++
    return { line, email, fullName, role, status, problems, warnings, input }
  })
  return {
    fileError: null,
    rows,
    counts,
    toSave: rows.filter((r) => r.input && r.status !== 'unchanged').map((r) => r.input!),
  }
}

// ---------------------------------------------------------------------------
// Database calls
// ---------------------------------------------------------------------------

export type AdminLoad<T> = { ok: true; value: T } | { ok: false; reason: 'not_admin' | 'failed'; message?: string }

function failure(error: { message?: string; code?: string }): { ok: false; reason: 'not_admin' | 'failed'; message?: string } {
  const notAdmin = error.code === '42501' || /platform_admin_required|permission denied/i.test(error.message ?? '')
  if (!notAdmin) console.error('[admin/staff]', error)
  return { ok: false, reason: notAdmin ? 'not_admin' : 'failed', message: error.message }
}

export async function loadStaffSchools(): Promise<AdminLoad<StaffSchool[]>> {
  const { data, error } = await supabase.rpc('admin_staff_schools')
  if (error) return failure(error)
  return {
    ok: true,
    value: (data ?? []).map((s) => ({
      schoolId: s.school_id,
      name: s.name,
      domains: s.domains ?? [],
      staffActive: s.staff_active,
      staffTotal: s.staff_total,
    })),
  }
}

export async function loadStaffList(schoolId: string): Promise<AdminLoad<StaffMember[]>> {
  const { data, error } = await supabase.rpc('admin_list_staff', { p_school: schoolId })
  if (error) return failure(error)
  return {
    ok: true,
    value: (data ?? []).map((m) => ({
      id: m.id,
      email: m.email,
      fullName: m.full_name,
      role: m.role,
      active: m.active,
      linked: m.linked,
    })),
  }
}

export interface SaveCounts {
  added: number
  updated: number
  reactivated: number
  unchanged: number
}

export async function saveStaff(schoolId: string, rows: StaffInput[]): Promise<AdminLoad<SaveCounts>> {
  const { data, error } = await supabase.rpc('admin_save_staff', { p_school: schoolId, p_rows: rows as never })
  if (error) return failure(error)
  return { ok: true, value: data as unknown as SaveCounts }
}

export async function setStaffRole(staffId: string, role: StaffRole): Promise<AdminLoad<null>> {
  const { error } = await supabase.rpc('admin_set_staff_role', { p_staff_id: staffId, p_role: role })
  return error ? failure(error) : { ok: true, value: null }
}

export async function setStaffActive(staffId: string, active: boolean): Promise<AdminLoad<null>> {
  const { error } = await supabase.rpc('admin_set_staff_active', { p_staff_id: staffId, p_active: active })
  return error ? failure(error) : { ok: true, value: null }
}

/** "Added 3, updated 1, reactivated 1. 2 were already up to date." */
export function savedMessage(c: SaveCounts): string {
  const parts = [`Added ${c.added}`, `updated ${c.updated}`, `reactivated ${c.reactivated}`]
  return `${parts.join(', ')}.${c.unchanged ? ` ${c.unchanged} already up to date.` : ''}`
}
