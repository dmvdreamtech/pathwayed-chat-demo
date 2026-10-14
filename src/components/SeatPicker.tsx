import { useState } from 'react'
import { activeStudents, isSeatCapError, setStudentActive, type Student } from '@/lib/students'
import { Switch } from '@/components/ui/switch'

const dispFont = '"Baloo 2", "Trebuchet MS", system-ui, sans-serif'

/**
 * Parent-facing picker for which children stay active when the account has more
 * children than the plan's seat cap allows. Nothing is deleted — over-cap
 * children are simply marked inactive (paused) and can be turned back on once
 * there's room (after subscribing or buying more seats). An inactive child can't
 * run learning sessions until reactivated.
 *
 * Turning a child ON is blocked once `cap` children are already active, so the
 * parent must pause one before activating another. Under the cap, everything is
 * freely toggleable, which is also how a paused child gets reactivated.
 */
export function SeatPicker({
  students,
  cap,
  onChange,
}: {
  students: Student[]
  cap: number
  onChange: (next: Student[]) => void
}) {
  const [busyId, setBusyId] = useState<string | null>(null)
  const [errMsg, setErrMsg] = useState('')
  const activeCount = activeStudents(students).length
  const overCap = activeCount > cap

  const toggle = async (student: Student, next: boolean) => {
    if (busyId) return
    // Block activating beyond the cap — a seat must be freed first.
    if (next && activeCount >= cap) return
    setBusyId(student.id)
    setErrMsg('')
    const { error } = await setStudentActive(student.id, next)
    setBusyId(null)
    if (error) {
      // The database holds the same cap, and is the one that counts (0031).
      setErrMsg(
        isSeatCapError(error)
          ? `Every seat on your plan is in use. Pause another child first, or add a seat in Billing.`
          : `We couldn't change ${student.first_name} right now. Please try again.`,
      )
      return
    }
    onChange(students.map((s) => (s.id === student.id ? { ...s, active: next } : s)))
  }

  return (
    <div
      className="panel"
      style={{
        border: overCap ? '1.6px solid #CC543C' : undefined,
        background: overCap ? '#FBEEE9' : undefined,
      }}
    >
      <h3>Active profiles</h3>
      <p className="muted" style={{ fontSize: 13.5, margin: '4px 0 10px' }}>
        {overCap
          ? `Your plan covers ${cap} active ${cap === 1 ? 'child' : 'children'}, but ${activeCount} are on. Choose which stay active. The rest are paused, not deleted.`
          : `${activeCount} of ${cap} seats in use. Paused children keep all their progress and can be turned back on any time there’s room.`}
      </p>
      <div style={{ display: 'grid', gap: 8 }}>
        {students.map((child) => {
          const atCapForOn = !child.active && activeCount >= cap
          return (
            <div
              key={child.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '1.6px solid #ECE4D8',
                borderRadius: 14,
                padding: '12px 14px',
                background: '#fff',
                opacity: child.active ? 1 : 0.7,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: dispFont, fontWeight: 700, fontSize: 16, color: '#003078' }}>
                  {child.first_name}
                </div>
                <div style={{ fontSize: 12.5, color: '#5A6172', marginTop: 1 }}>
                  {child.active ? 'Active' : 'Paused'}
                </div>
              </div>
              <Switch
                checked={child.active}
                disabled={busyId === child.id || atCapForOn}
                onCheckedChange={(next) => void toggle(child, next)}
                aria-label={`${child.active ? 'Pause' : 'Activate'} ${child.first_name}`}
              />
            </div>
          )
        })}
      </div>
      {errMsg && (
        <p role="alert" style={{ color: '#B23A23', fontSize: 13.5, margin: '10px 0 0' }}>
          {errMsg}
        </p>
      )}
    </div>
  )
}
