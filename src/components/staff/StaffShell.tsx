import type { ReactNode } from 'react'
import { useNavigate } from 'react-router'
import logoImg from '@/assets/logo-horizontal.png'
import { useAuth } from '@/context/AuthContext'
import '@/styles/app-screens.css'
import '@/styles/staff.css'

/** Page frame for the staff view: the PathwayEd lockup, who is signed in, and
 *  a sign-out link. No family menu, since none of it applies to staff. */
export function StaffShell({ children }: { children: ReactNode }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  return (
    <div className="kid-screen">
      <div className="shell staff-shell">
        <div className="topbar">
          <img className="markimg" src={logoImg} alt="PathwayEd" style={{ height: 34 }} />
          <div className="staff-who">
            {user?.email && <span className="muted">{user.email}</span>}
            <button
              type="button"
              className="link"
              onClick={async () => {
                await signOut()
                navigate('/', { replace: true })
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
