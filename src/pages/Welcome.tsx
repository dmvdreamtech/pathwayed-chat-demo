import { useEffect, useState, type ReactElement } from 'react'
import '@/styles/app-screens.css'
import { useNavigate } from 'react-router'
import { useAuth, type OAuthProvider } from '@/context/AuthContext'
import { getConsentStatus } from '@/lib/consent'
import { ensureSchoolCheck } from '@/lib/schoolCheck'
import { loadStaffMembership } from '@/lib/staffProgress'
import logoImg from '@/assets/logo-horizontal.png'

const iconStyle = { width: 20, height: 20, flexShrink: 0 } as const

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '13px 15px',
  border: '1.6px solid #ECE4D8',
  borderRadius: 14,
  background: '#fff',
  fontSize: 16,
  color: '#1C2230',
}

const linkButtonStyle: React.CSSProperties = {
  background: 'none',
  color: '#003078',
  fontWeight: 700,
  fontSize: 13.5,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  cursor: 'pointer',
}

function tabStyle(active: boolean): React.CSSProperties {
  return {
    flex: 1,
    padding: '10px',
    borderRadius: 9,
    fontWeight: 700,
    fontSize: 14,
    cursor: 'pointer',
    border: 'none',
    background: active ? '#003078' : 'transparent',
    color: active ? '#fff' : '#5A6172',
  }
}

function friendlyAuthError(raw: string, mode: 'signin' | 'signup'): string {
  const m = raw.toLowerCase()
  if (m.includes('invalid login credentials')) return 'Wrong email or password.'
  if (m.includes('email not confirmed'))
    return 'Please confirm your email address (check your inbox), then sign in.'
  if (
    m.includes('email logins are disabled') ||
    m.includes('email signups are disabled') ||
    m.includes('signups not allowed') ||
    m.includes('logins are disabled')
  )
    return 'Email and password sign-in is turned off for this project right now.'
  if (m.includes('already registered') || m.includes('already been registered') || m.includes('already exists'))
    return 'An account with this email already exists, switch to the Sign in tab.'
  if (m.includes('password should be at least') || m.includes('at least 6'))
    return 'Please use a password with at least 6 characters.'
  if (m.includes('invalid email') || m.includes('unable to validate email'))
    return 'Please enter a valid email address.'
  if (m.includes('invalid api key') || m.includes('api key'))
    return 'Sign-in is misconfigured (API key). Please contact support.'
  // Unknown error — surface the real message so the failure is diagnosable.
  return `${mode === 'signin' ? "We couldn't sign you in" : "We couldn't create your account"}: ${raw}`
}

const GoogleIcon: ReactElement = (
  <svg viewBox="0 0 48 48" style={iconStyle}>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.1 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 34.9 26.7 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C39.9 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z" />
  </svg>
)

const MicrosoftIcon: ReactElement = (
  <svg viewBox="0 0 48 48" style={iconStyle}>
    <path fill="#F25022" d="M6 6h17v17H6z" />
    <path fill="#7FBA00" d="M25 6h17v17H25z" />
    <path fill="#00A4EF" d="M6 25h17v17H6z" />
    <path fill="#FFB900" d="M25 25h17v17H25z" />
  </svg>
)

/* Apple sign-in is temporarily disabled — re-enable by restoring AppleIcon and
   the PROVIDERS entry below ('apple' stays in OAuthProvider for that).
const AppleIcon: ReactElement = (
  <svg viewBox="0 0 24 24" fill="#000" style={iconStyle}>
    <path d="M16.4 12.7c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.1 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.2-.9-2.2-3.5zM14.3 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 1.9-.5 2.5-1.2z" />
  </svg>
)
*/

// Microsoft SSO is hidden from the UI for now — the mechanics (the 'azure'
// provider, signInWith, MicrosoftIcon, and the OAuth callback) stay intact.
// Flip this ONE line to `true` to bring the "Continue with Microsoft" button back.
const MICROSOFT_SSO_ENABLED = false

const PROVIDERS: { id: OAuthProvider; label: string; icon: ReactElement }[] = [
  { id: 'google', label: 'Continue with Google', icon: GoogleIcon },
  ...(MICROSOFT_SSO_ENABLED
    ? [{ id: 'azure' as OAuthProvider, label: 'Continue with Microsoft', icon: MicrosoftIcon }]
    : []),
  // { id: 'apple', label: 'Continue with Apple', icon: AppleIcon },
]

export function Welcome() {
  const { user, session, loading, signInWith, signInWithPassword, signUpWithEmail, resetPasswordForEmail } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formMessage, setFormMessage] = useState('')

  const switchMode = (next: 'signin' | 'signup' | 'forgot') => {
    setMode(next)
    setFormError('')
    setFormMessage('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (submitting) return
    const em = email.trim()
    if (!em) {
      setFormError('Please enter your email.')
      return
    }
    if (mode !== 'forgot' && !password) {
      setFormError('Please enter your email and password.')
      return
    }
    setSubmitting(true)
    setFormError('')
    setFormMessage('')

    if (mode === 'forgot') {
      const { error } = await resetPasswordForEmail(em)
      setSubmitting(false)
      if (error) {
        setFormError("We couldn't send the reset email. Please try again.")
      } else {
        setFormMessage('If an account exists for that email, a reset link is on the way.')
      }
      return
    }

    if (mode === 'signin') {
      const { error } = await signInWithPassword(em, password)
      if (error) {
        setFormError(friendlyAuthError(error, 'signin'))
        setSubmitting(false)
      }
      // success → the redirect effect takes over (same consent check as SSO)
    } else {
      const { error, needsConfirmation } = await signUpWithEmail(em, password)
      if (error) {
        setFormError(friendlyAuthError(error, 'signup'))
        setSubmitting(false)
      } else if (needsConfirmation) {
        setFormMessage('Check your email to confirm your account, then sign in.')
        setSubmitting(false)
        setMode('signin')
      }
      // success with a session → the redirect effect takes over
    }
  }

  // Once signed in (incl. returning from the OAuth redirect), route the user.
  // A covered 9-12 SSO student must NOT be sent to the parent consent flow, so we
  // first resolve the shared school check (memoized with SchoolLoginGate): if
  // covered, the gate routes them to tutoring and we do nothing; otherwise this is
  // a normal consumer login → consent if not on record, else the student picker.
  useEffect(() => {
    if (loading || !user) return
    const token = session?.access_token
    let active = true
    ensureSchoolCheck(user.id, token ?? '').then(async (r) => {
      if (!active || r.covered) return
      // School staff go to the staff progress view, not the parent flow.
      // loadStaffMembership resolves to [] on any failure, so this can never
      // block a family sign-in.
      const staff = await loadStaffMembership(user.id)
      if (!active) return
      if (staff.length > 0) {
        navigate('/staff', { replace: true })
        return
      }
      getConsentStatus(user.id).then((hasConsent) => {
        if (active) navigate(hasConsent ? '/students' : '/consent', { replace: true })
      })
    })
    return () => {
      active = false
    }
  }, [user, session, loading, navigate])

  if (loading || user) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBF8F3',
          color: '#5A6172',
          fontSize: 14.5,
        }}
      >
        Signing you in…
      </div>
    )
  }

  return (
    <div className="auth-screen" style={{ color: '#1C2230' }}>
      <div
        className="auth-card"
        style={{
          background: '#FFFFFF',
          border: '1px solid #ECE4D8',
          borderRadius: 20,
          boxShadow: '0 1px 2px rgba(28,34,48,.04),0 10px 30px rgba(28,34,48,.07)',
          width: '100%',
          maxWidth: 480,
          padding: 34,
          textAlign: 'center',
        }}
      >
        <img
          src={logoImg}
          alt="PathwayEd"
          style={{ width: 'min(340px,80%)', height: 'auto', display: 'block', margin: '2px auto 4px' }}
        />

        <p
          style={{
            color: '#CC543C',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            marginTop: 18,
          }}
        >
          Welcome
        </p>

        <h1
          style={{
            fontFamily: '"Baloo 2", "Trebuchet MS", system-ui, sans-serif',
            color: '#003078',
            fontSize: 25,
            fontWeight: 700,
            letterSpacing: '-.01em',
            margin: '5px 0 8px',
          }}
        >
          Learning that meets your child where they are
        </h1>

        <p style={{ color: '#5A6172', fontSize: 14.5, margin: '0 0 22px' }}>
          A friendly tutor named Nikki helps with math, reading, writing, and science,
          guiding kids to the answer instead of just giving it.
        </p>

        <div style={{ textAlign: 'left' }}>
          {PROVIDERS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => signInWith(p.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 11,
                width: '100%',
                padding: '14px 18px',
                border: '1.6px solid #ECE4D8',
                borderRadius: 999,
                background: '#FFFFFF',
                fontWeight: 600,
                fontSize: 15,
                marginBottom: 11,
                color: '#1C2230',
                cursor: 'pointer',
              }}
            >
              {p.icon}
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0' }}>
          <span style={{ flex: 1, height: 1, background: '#ECE4D8' }} />
          <span style={{ color: '#9aa1ad', fontSize: 12, fontWeight: 600 }}>or</span>
          <span style={{ flex: 1, height: 1, background: '#ECE4D8' }} />
        </div>

        <div style={{ display: 'flex', gap: 6, background: '#F4EEE4', padding: 4, borderRadius: 12, marginBottom: 14 }}>
          <button type="button" onClick={() => switchMode('signin')} style={tabStyle(mode !== 'signup')}>
            Sign in
          </button>
          <button type="button" onClick={() => switchMode('signup')} style={tabStyle(mode === 'signup')}>
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <input
            type="email"
            autoComplete="email"
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          {mode !== 'forgot' && (
            <input
              type="password"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              aria-label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...inputStyle, marginTop: 10 }}
            />
          )}
          {mode === 'signup' && (
            <p style={{ color: '#5A6172', fontSize: 12.5, margin: '8px 2px 0' }}>
              Use at least 6 characters.
            </p>
          )}

          {formError && (
            <p style={{ color: '#C0492F', fontSize: 14, fontWeight: 500, margin: '10px 0 0' }}>{formError}</p>
          )}
          {formMessage && (
            <p style={{ color: '#003078', fontSize: 14, fontWeight: 500, margin: '10px 0 0' }}>{formMessage}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              padding: '14px 18px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15.5,
              marginTop: 12,
              background: '#CC543C',
              color: '#fff',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.5 : 1,
            }}
          >
            {submitting
              ? 'Please wait…'
              : mode === 'forgot'
                ? 'Send reset link'
                : mode === 'signin'
                  ? 'Sign in'
                  : 'Create account'}
          </button>
        </form>

        {mode === 'signin' && (
          <p style={{ margin: '12px 0 0' }}>
            <button type="button" onClick={() => switchMode('forgot')} style={linkButtonStyle}>
              Forgot password?
            </button>
          </p>
        )}
        {mode === 'forgot' && (
          <p style={{ margin: '12px 0 0' }}>
            <button type="button" onClick={() => switchMode('signin')} style={linkButtonStyle}>
              Back to sign in
            </button>
          </p>
        )}

        <p style={{ color: '#5A6172', fontSize: 12, margin: '16px 0 0' }}>
          A parent or guardian signs in. You will add your children next.
        </p>

        {/* Discoverable entry to the K-8 classroom station (staff signs in first,
            then a student enters their PIN). 9-12 school SSO needs no separate
            entry, those students use the sign-in buttons above and SchoolLoginGate
            recognizes a covered school email automatically. */}
        <p style={{ color: '#9aa1ad', fontSize: 12, margin: '18px 0 0' }}>
          School staff?{' '}
          <button type="button" onClick={() => navigate('/school')} style={linkButtonStyle}>
            Open the classroom login
          </button>
        </p>
      </div>
    </div>
  )
}
