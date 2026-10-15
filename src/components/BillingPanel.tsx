import { useEffect, useRef, useState } from 'react'
import { SCHOOL_PROVIDED_BODY, SCHOOL_PROVIDED_TITLE, billingOffer, useSchoolProvided } from '@/lib/schoolProvided'
import { activeStudents, type Student } from '@/lib/students'
import { ACTIVE_PREP_STATUSES, getPrepEntitlements } from '@/lib/prep/entitlements'
import { getSubscription, type Subscription } from '@/lib/profile'
import { billingPhase, seatCap } from '@/lib/accessGate'
import { PlanPicker } from '@/components/PlanPicker'
import {
  PLANS,
  formatMoney,
  intervalSuffix,
  openPortal,
  totalPrice,
  type BillingPeriod,
} from '@/lib/billing'

function statusBadge(label: string, bg: string, color: string) {
  return { label, bg, color }
}

/** Friendly date like "January 3, 2026", or null if the ISO string is missing/invalid. */
function formatFriendlyDate(iso: string | null): string | null {
  if (!iso) return null
  const d = new Date(iso)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  background: bg,
  color,
  fontSize: 11.5,
  fontWeight: 700,
  padding: '3px 9px',
  borderRadius: 999,
})

export function BillingPanel({ students, userId }: { students: Student[]; userId: string }) {
  const [sub, setSub] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const inFlight = useRef(false)
  // Snapshot the clock once at mount — a stable render-time value for the phase.
  const [now] = useState(() => Date.now())
  // Whether any child has a live prep entitlement. A prep-only family can have one
  // of these while their learning status is trial/expired, and still needs the
  // portal — see the trial/expired branches below.
  const [hasActivePrep, setHasActivePrep] = useState(false)
  // Staff, platform admins, covered students and school addresses are never
  // offered a plan (migration 0037). Read from the database, not this tab.
  const offer = billingOffer(useSchoolProvided(userId), students)

  useEffect(() => {
    let active = true
    getSubscription(userId).then((s) => {
      if (!active) return
      setSub(s)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [userId])

  useEffect(() => {
    let active = true
    getPrepEntitlements(students.map((s) => s.id)).then((es) => {
      if (active) setHasActivePrep(es.some((e) => ACTIVE_PREP_STATUSES.has(e.status)))
    })
    return () => {
      active = false
    }
  }, [students])

  // When the user navigates to Stripe and then hits BACK, the page is restored
  // from the browser's bfcache with the component still mounted — so the portal
  // double-click guards are left stuck in their "in flight" state and the button
  // stays disabled. 'pageshow' fires on that restore (event.persisted === true);
  // clear the guards so the button is usable again.
  useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        inFlight.current = false
        setBusy(false)
      }
    }
    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])

  const portal = async () => {
    if (inFlight.current) return
    inFlight.current = true
    setBusy(true)
    setError('')
    try {
      await openPortal()
    } catch {
      setError('Could not open the billing portal.')
      setBusy(false)
      inFlight.current = false
    }
  }

  // A school-provided account never sees a plan, a trial countdown or a price.
  // Checked before any trial or subscription state is considered.
  if (offer === 'school') {
    return (
      <div className="panel" style={{ padding: '16px 18px' }}>
        <h3 style={{ margin: 0 }}>{SCHOOL_PROVIDED_TITLE}</h3>
        <p className="muted" style={{ fontSize: 13, margin: '8px 0 0' }}>
          {SCHOOL_PROVIDED_BODY}
        </p>
      </div>
    )
  }

  if (loading || offer === 'wait') {
    return (
      <div className="panel" style={{ padding: '16px 18px' }}>
        <h3 style={{ margin: 0 }}>Billing</h3>
        <p className="muted" style={{ fontSize: 13, margin: '8px 0 0' }}>Loading…</p>
      </div>
    )
  }

  const phase = sub ? billingPhase(sub, now) : 'expired'

  // --- Active subscription: current-plan summary, seats, next invoice ---
  if (phase === 'active' && sub) {
    const badge = statusBadge('Active', '#E7F5EF', '#1F9E6F')
    const period: BillingPeriod = sub.billingPeriod === 'annual' ? 'annual' : 'monthly'
    const planDef = PLANS.find((p) => p.id === sub.plan)
    const extraKids = sub.extraKids ?? 0
    const amount = planDef ? totalPrice(planDef.id, period, extraKids) : null
    const seatsUsed = activeStudents(students).length
    const seatsPaid = seatCap(sub)
    const nextInvoice = formatFriendlyDate(sub.currentPeriodEnd)

    return (
      <div className="panel" style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: 0 }}>Billing</h3>
          <span style={badgeStyle(badge.bg, badge.color)}>{badge.label}</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: '#1C2230' }}>
            {planDef ? `${planDef.name} · ${planDef.grades}` : 'Your plan'}
          </div>
          <div style={{ fontSize: 13.5, color: '#5A6172', marginTop: 2 }}>
            Seats: <b style={{ color: '#1C2230' }}>{seatsUsed}</b> used of {seatsPaid} paid
          </div>
          {amount != null && nextInvoice && (
            <div style={{ fontSize: 13.5, color: '#5A6172', marginTop: 2 }}>
              Next invoice: <b style={{ color: '#1C2230' }}>{formatMoney(amount)}{intervalSuffix(period)}</b> on {nextInvoice}
            </div>
          )}
        </div>
        <button className="btn btn-soft" style={{ marginTop: 12 }} disabled={busy} onClick={portal}>
          Manage billing
        </button>
        {error && <p style={{ color: '#C0492F', fontSize: 14, fontWeight: 500, margin: '10px 0 0' }}>{error}</p>}
      </div>
    )
  }

  // --- Free trial: countdown + Subscribe now ---
  if (phase === 'trial' && sub) {
    const badge = statusBadge('Free trial', '#FBEEE9', '#B0432E')
    const daysLeft = Math.max(0, Math.ceil((Date.parse(sub.trialEnd ?? '') - now) / (24 * 60 * 60 * 1000)))
    const daysLabel = Number.isFinite(daysLeft)
      ? `${daysLeft} ${daysLeft === 1 ? 'day' : 'days'} left in your free trial`
      : 'Your free trial is running'

    return (
      <div className="panel" style={{ padding: '16px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
          <h3 style={{ margin: 0 }}>Billing</h3>
          <span style={badgeStyle(badge.bg, badge.color)}>{badge.label}</span>
        </div>
        <p style={{ fontSize: 14.5, fontWeight: 700, color: '#1C2230', margin: '8px 0 2px' }}>{daysLabel}</p>
        <p className="muted" style={{ fontSize: 13, margin: '0 0 12px' }}>
          Subscribe any time to keep learning without interruption.
        </p>
        <PlanPicker students={students} ctaLabel="Subscribe now" />
        {sub.stripeCustomerId && hasActivePrep && (
          <button className="btn btn-soft" style={{ marginTop: 12 }} disabled={busy} onClick={portal}>
            Manage billing
          </button>
        )}
        {error && <p style={{ color: '#C0492F', fontSize: 14, fontWeight: 500, margin: '10px 0 0' }}>{error}</p>}
      </div>
    )
  }

  // --- Expired: trial-ended notice + plan picker ---
  const endedLabel = formatFriendlyDate(sub?.trialEnd ?? null)
  return (
    <div className="panel" style={{ padding: '16px 18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <h3 style={{ margin: 0 }}>Billing</h3>
        <span style={badgeStyle('#FBE3DE', '#C0492F')}>Trial ended</span>
      </div>
      <p style={{ fontSize: 14.5, fontWeight: 700, color: '#1C2230', margin: '8px 0 2px' }}>
        {endedLabel ? `Your trial ended ${endedLabel}` : 'Your free trial has ended'}
      </p>
      <p className="muted" style={{ fontSize: 13, margin: '0 0 12px' }}>
        Subscribe to unlock learning sessions and homework help again. Your children’s progress is saved.
      </p>
      <PlanPicker students={students} ctaLabel="Subscribe now" />
      {sub?.stripeCustomerId && hasActivePrep && (
        <button className="btn btn-soft" style={{ marginTop: 12 }} disabled={busy} onClick={portal}>
          Manage billing
        </button>
      )}
      {error && <p style={{ color: '#C0492F', fontSize: 14, fontWeight: 500, margin: '10px 0 0' }}>{error}</p>}
    </div>
  )
}
