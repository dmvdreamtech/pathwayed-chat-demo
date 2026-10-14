import { useState } from 'react'
import { useNavigate } from 'react-router'
import '@/styles/app-screens.css'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/lib/supabase'

const CONSENT_POINTS: { lead: string; rest: string }[] = [
  {
    lead: 'What it is.',
    rest: "Your child talks or types with Nikki, an AI learning partner, to practice math, reading, writing, and science. Nikki guides them toward answers instead of handing them over.",
  },
  {
    lead: 'It uses AI.',
    rest: 'Nikki can sometimes be wrong, so she is a study partner, not the final word. Encourage your child to check important things with you or a teacher.',
  },
  {
    lead: 'What we keep.',
    rest: "Your child's first name, grade, their sessions, and any work or homework they share, so they can pick up where they left off and you can see how it is going. We never ask children for last names, addresses, phone numbers, or passwords.",
  },
  {
    lead: 'You can see it.',
    rest: "You can review your child's sessions any time from your parent area.",
  },
  {
    lead: 'If something feels off.',
    rest: 'If your child seems upset or unsafe, Nikki gently points them to a trusted adult. She is not a counselor or an emergency service.',
  },
]

function initialNameFor(metadata: Record<string, unknown> | undefined): string {
  const full = metadata?.full_name
  const name = metadata?.name
  if (typeof full === 'string') return full
  if (typeof name === 'string') return name
  return ''
}

export function Consent() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState(() => initialNameFor(user?.user_metadata))
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const canSubmit = name.trim().length >= 2 && agreed && !submitting

  const handleSubmit = async () => {
    if (!canSubmit || !user) return
    setSubmitting(true)
    setError(null)
    const trimmed = name.trim()

    // Record the parent attestation. The checkbox gates this submit; it is not
    // a stored column. consented_at is stamped by the database clock (0031).
    const { error: consentError } = await supabase.from('consents').insert({
      parent_id: user.id,
      parent_name: trimmed,
      method: 'web_checkbox',
      consent_version: '1.0',
    })
    if (consentError) {
      setError('Sorry, something went wrong saving your permission. Please try again.')
      setSubmitting(false)
      return
    }

    // Mirror the parent name onto their profile for display.
    await supabase.from('profiles').update({ display_name: trimmed }).eq('id', user.id)

    navigate('/children', { replace: true })
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
        }}
      >
        <p
          style={{
            color: '#CC543C',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}
        >
          For a parent or guardian
        </p>
        <h1
          style={{
            fontFamily: '"Baloo 2", "Trebuchet MS", system-ui, sans-serif',
            color: '#003078',
            fontSize: 22,
            fontWeight: 700,
            margin: '5px 0 10px',
          }}
        >
          Before your child starts
        </h1>
        <p style={{ color: '#5A6172', fontSize: 14.5, margin: 0 }}>
          A quick read, then your okay.
        </p>

        <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0' }}>
          {CONSENT_POINTS.map((point, i) => (
            <li
              key={point.lead}
              style={{
                display: 'flex',
                gap: 13,
                padding: '11px 0',
                borderTop: i === 0 ? 'none' : '1px solid #F3ECE0',
                fontSize: 14.5,
                color: '#5A6172',
              }}
            >
              <span
                aria-hidden
                style={{
                  marginTop: 6,
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: '#CC543C',
                  flexShrink: 0,
                }}
              />
              <span>
                <b style={{ color: '#1C2230', fontWeight: 700 }}>{point.lead}</b> {point.rest}
              </span>
            </li>
          ))}
        </ul>

        <div style={{ margin: '16px 0', textAlign: 'left' }}>
          <label
            htmlFor="parent-name"
            style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 7 }}
          >
            Your name
          </label>
          <input
            id="parent-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Parent or guardian name"
            style={{
              width: '100%',
              padding: '14px 16px',
              border: '1.6px solid #ECE4D8',
              borderRadius: 14,
              background: '#fff',
              fontSize: 16,
              color: '#1C2230',
            }}
          />
        </div>

        <label
          style={{
            display: 'flex',
            gap: 13,
            alignItems: 'flex-start',
            padding: 16,
            background: '#FBEEE9',
            border: '1px solid #F0D4CA',
            borderRadius: 14,
            margin: '14px 0 6px',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            style={{ marginTop: 2, width: 21, height: 21, accentColor: '#CC543C', flexShrink: 0 }}
          />
          <span style={{ fontSize: 14.5, fontWeight: 600 }}>
            I am this child's parent or guardian and I give permission for them to use PathwayEd.
          </span>
        </label>

        {error && (
          <p style={{ color: '#C0492F', fontSize: 14, fontWeight: 500, marginTop: 8 }}>{error}</p>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '15px 22px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15.5,
            marginTop: 14,
            background: '#CC543C',
            color: '#fff',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            opacity: canSubmit ? 1 : 0.45,
          }}
        >
          {submitting ? 'Saving…' : 'I give permission'}
        </button>

        <button
          type="button"
          onClick={() => signOut()}
          style={{
            display: 'block',
            margin: '14px auto 0',
            background: 'none',
            color: '#5A6172',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}
