import { useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "@/context/AuthContext"
import { ensureSchoolCheck } from "@/lib/schoolCheck"

/**
 * After any SSO login, ask our server whether this verified email is a covered
 * school student (domain -> school_id map + Dean resolve, all server-side). If so,
 * establish the school session (Stripe bypass + authoritative grade) and route the
 * student to their learning home. Unknown domains / B2C logins fall through — this
 * NEVER blocks the normal consumer flow. Renders nothing.
 *
 * Shares the single memoized ensureSchoolCheck with Welcome's redirect, so a
 * covered 9-12 student is routed HERE and never sent to the parent consent flow.
 */
export function SchoolLoginGate() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const checkedFor = useRef<string | null>(null)

  useEffect(() => {
    if (loading) return
    const token = session?.access_token
    const uid = session?.user?.id
    if (!token || !uid) return
    if (checkedFor.current === uid) return // one check per signed-in user per mount
    checkedFor.current = uid

    let active = true
    void ensureSchoolCheck(uid, token).then((r) => {
      if (!active || !r.covered || !r.student_id) return
      // A covered account can also be school staff or a platform admin (a test
      // account is all three). Leave it on those views rather than pulling it to
      // the student home.
      const path = window.location.pathname
      if (path.startsWith("/staff") || path.startsWith("/admin")) return
      navigate(`/students/${r.student_id}`, { replace: true })
    })
    return () => {
      active = false
    }
  }, [session, loading, navigate])

  return null
}
