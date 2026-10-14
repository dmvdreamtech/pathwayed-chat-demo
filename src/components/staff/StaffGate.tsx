import { useEffect, useState, type ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { loadStaffMembership } from '@/lib/staffProgress'
import { StaffShell } from '@/components/staff/StaffShell'

/**
 * Lets through only a signed-in user with an active school_staff row. Everyone
 * else, signed out or not staff, is sent to the welcome screen, which routes
 * them wherever they normally go. Loading the membership also links the staff
 * row to this account on first visit (link_staff_account).
 *
 * This is a convenience, not the security boundary: every read behind it is
 * enforced by RLS and the staff functions in migration 0030.
 */
export function StaffGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  // The membership answer, keyed by the user it was loaded for, so a sign-out
  // or account switch can never reuse another account's answer.
  const [checked, setChecked] = useState<{ uid: string; isStaff: boolean } | null>(null)
  const uid = user?.id ?? null

  useEffect(() => {
    if (!uid) return
    let active = true
    void loadStaffMembership(uid).then((rows) => {
      if (active) setChecked({ uid, isStaff: rows.length > 0 })
    })
    return () => {
      active = false
    }
  }, [uid])

  const state: 'checking' | 'staff' | 'denied' = loading
    ? 'checking'
    : !uid
      ? 'denied'
      : checked?.uid !== uid
        ? 'checking'
        : checked.isStaff
          ? 'staff'
          : 'denied'

  if (state === 'denied') return <Navigate to="/" replace />
  if (state === 'checking') {
    return (
      <StaffShell>
        <div className="panel" style={{ marginTop: 20 }}>
          <p className="muted">Checking your access...</p>
        </div>
      </StaffShell>
    )
  }
  return <>{children}</>
}
