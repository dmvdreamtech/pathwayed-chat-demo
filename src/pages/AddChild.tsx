import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import '@/styles/app-screens.css'
import { useAuth } from '@/context/AuthContext'
import {
  GRADES,
  LEVELS,
  activeStudents,
  avatarModeOf,
  createStudent,
  getStudent,
  gradeLabel,
  hasPin,
  isSeatCapError,
  listStudents,
  setAboveGradeConsent,
  setStudentPin,
  updateAvatarMode,
  updateStudent,
  type AvatarMode,
  type StudentLevel,
} from '@/lib/students'
import { AvatarModePicker } from '@/components/AvatarModePicker'
import { ChildPinControl } from '@/components/pin/ChildPinControl'
import { Switch } from '@/components/ui/switch'
import { isSchoolCovered } from '@/lib/schoolSession'
import { getSubscription, type Subscription } from '@/lib/profile'
import { TRIAL_SEAT_CAP, billingPhase, seatCap } from '@/lib/accessGate'
import {
  ADDON_PRICE,
  formatMoney,
  intervalSuffix,
  updateSeats,
  type BillingPeriod,
} from '@/lib/billing'

const card: React.CSSProperties = {
  background: '#FFFFFF',
  border: '1px solid #ECE4D8',
  borderRadius: 20,
  boxShadow: '0 1px 2px rgba(28,34,48,.04),0 10px 30px rgba(28,34,48,.07)',
  width: '100%',
  maxWidth: 480,
  padding: 34,
}

const inputBase: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '1.6px solid #ECE4D8',
  borderRadius: 14,
  background: '#fff',
  fontSize: 16,
  color: '#1C2230',
}

const inputErr: React.CSSProperties = {
  borderColor: '#C0492F',
  boxShadow: '0 0 0 4px rgba(192,73,47,.12)',
}

export function AddChild() {
  const { id } = useParams<{ id: string }>()
  const editing = !!id
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  // Where to go after saving/cancelling. Settings launches this flow with
  // returnTo:'/settings' so account management returns to Settings; the
  // first-time onboarding entry has no state and continues to '/children'
  // (the "add another or continue" step → student picker).
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? '/children'

  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const [originalGrade, setOriginalGrade] = useState('')
  const [confirmReassess, setConfirmReassess] = useState(false)
  const [level, setLevel] = useState<StudentLevel>('on')
  const [avatarMode, setAvatarMode] = useState<AvatarMode>('video')
  // SAT / above-grade FRAMING consent (the students.above_grade_ok field the
  // onboarding placement step writes). Framing/emphasis only — never access.
  const [aboveGradeOk, setAboveGradeOk] = useState(false)
  // Optional sign-in PIN. When editing, ChildPinControl writes immediately and
  // pinSet tracks the loaded child's state. When adding, the child has no id yet,
  // so we hold the 4 digits as a draft and apply them right after creation.
  const [pinSet, setPinSet] = useState(false)
  const [pinDraft, setPinDraft] = useState('')
  const [nameError, setNameError] = useState(false)
  const [gradeError, setGradeError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  // A save that was rejected at the DB (most often a plan/seat-cap block the client
  // did not catch) — surfaces a clear message + an upgrade path instead of a silent no-op.
  const [capBlocked, setCapBlocked] = useState(false)
  const [loading, setLoading] = useState(editing)
  const [saving, setSaving] = useState(false)
  // A school-covered child: the school sets their name, grade, level and SAT
  // framing, and the database refuses browser changes to them (0031). Only the
  // avatar and PIN stay editable here.
  const [schoolManaged, setSchoolManaged] = useState(false)
  // Billing state (only relevant when adding, not editing).
  const [sub, setSub] = useState<Subscription | null>(null)
  const [childCount, setChildCount] = useState(0)
  const [billingLoaded, setBillingLoaded] = useState(editing)
  const [confirmBilling, setConfirmBilling] = useState(false)
  // Snapshot the clock once at mount — a stable render-time value for the phase.
  const [now] = useState(() => Date.now())

  useEffect(() => {
    if (!editing || !id) return
    let active = true
    getStudent(id).then((student) => {
      if (!active) return
      if (!student) {
        navigate(returnTo, { replace: true })
        return
      }
      setName(student.first_name)
      setGrade(student.grade)
      setOriginalGrade(student.grade)
      setLevel((student.level as StudentLevel) ?? 'on')
      setAvatarMode(avatarModeOf(student))
      setAboveGradeOk(!!student.above_grade_ok)
      setPinSet(hasPin(student))
      setSchoolManaged(!!student.school_covered)
      setLoading(false)
    })
    return () => {
      active = false
    }
  }, [editing, id, navigate, returnTo])

  // When adding a child, learn the parent's subscription and current child count
  // so we can tell whether this child exceeds their plan's included seats.
  useEffect(() => {
    if (editing || !user) return
    let active = true
    Promise.all([getSubscription(user.id), listStudents(user.id)]).then(([s, kids]) => {
      if (!active) return
      setSub(s)
      // Only ACTIVE children count against the seat cap.
      setChildCount(activeStudents(kids).length)
      setBillingLoaded(true)
    })
    return () => {
      active = false
    }
  }, [editing, user])

  // Seat cap for this account: paid_seats when subscribed, else the trial cap (2).
  // A school-covered student is never billed or capped (their school holds the license).
  const covered = isSchoolCovered()
  const phase = sub ? billingPhase(sub, now) : 'expired'
  const cap = sub ? seatCap(sub) : TRIAL_SEAT_CAP
  const wouldExceedCap = !editing && !covered && childCount + 1 > cap
  // Subscribed: another child beyond the paid seats buys a seat (bill + proration).
  const willBill = wouldExceedCap && phase === 'active'
  // Free trial / expired: the 2-child cap requires subscribing before adding more.
  const needsSubscribe = wouldExceedCap && phase !== 'active'
  const period: BillingPeriod = sub?.billingPeriod === 'annual' ? 'annual' : 'monthly'
  const addCost = `${formatMoney(ADDON_PRICE[period])}${intervalSuffix(period)}`

  const handleSave = async () => {
    if (saving || !user) return
    const trimmed = name.trim()
    const missingName = trimmed.length === 0
    const missingGrade = grade.length === 0
    setNameError(missingName)
    setGradeError(missingGrade)
    if (missingName || missingGrade) {
      setErrMsg('Please fill in the highlighted fields to continue.')
      return
    }
    setErrMsg('')
    setCapBlocked(false)

    // Free trial (or expired) at the 2-child cap: can't add for free — send the
    // parent to Billing to subscribe. We never create the child here.
    if (needsSubscribe) {
      navigate('/settings')
      return
    }

    // If this child is billable, require an explicit confirmation of the cost
    // first — never charge silently.
    if (willBill && !confirmBilling) {
      setConfirmBilling(true)
      return
    }

    // Editing + grade changed → prompt first; on confirm, save and route into a
    // fresh assessment that resets their level (layered on existing mastery).
    const gradeChanged = editing && grade !== originalGrade
    if (gradeChanged && !confirmReassess) {
      setConfirmReassess(true)
      return
    }

    setSaving(true)

    const input = { first_name: trimmed, grade, level, avatar_mode: avatarMode }

    if (editing && id && schoolManaged) {
      const { error: avatarError } = await updateAvatarMode(id, avatarMode)
      if (avatarError) {
        setErrMsg('Sorry, something went wrong saving. Please try again.')
        setSaving(false)
        return
      }
      navigate(returnTo, { replace: true })
      return
    }

    if (editing && id) {
      // Save the details and the SAT/above-grade framing consent together, both
      // through the existing student update path (consent = above_grade_ok).
      const [{ error: updateError }, { error: consentError }] = await Promise.all([
        updateStudent(id, input),
        setAboveGradeConsent(id, aboveGradeOk),
      ])
      if (updateError || consentError) {
        setErrMsg('Sorry, something went wrong saving. Please try again.')
        setSaving(false)
        setConfirmReassess(false)
        return
      }
      navigate(gradeChanged ? `/students/${id}/diagnostic?fresh=1` : returnTo, { replace: true })
      return
    }

    // Adding a child. Bill the extra seat first (with proration) so we never add
    // an unpaid child; the seat change is idempotent, so a retry won't double-charge.
    if (willBill) {
      try {
        await updateSeats(childCount + 1)
      } catch {
        setErrMsg("Sorry, we couldn't update your billing. Please try again.")
        setSaving(false)
        setConfirmBilling(false)
        return
      }
    }

    const { id: newId, error } = await createStudent(user.id, input)
    if (error || !newId) {
      // The insert was rejected or returned no row. The client's own seat check
      // didn't stop us here, so the most likely cause is a plan/child-limit block
      // the client couldn't see (or a transient error). Never fail silently: show a
      // clear message with an upgrade path (capBlocked renders the Settings CTA).
      console.error('[add-child] createStudent failed', { error, newId })
      setErrMsg(
        isSeatCapError(error)
          ? `Every seat on your plan is in use, so we couldn't add ${trimmed}. Add a seat or change your ` +
              `plan in Settings, then try again.`
          : `We couldn't add ${trimmed}. If you've reached your plan's child limit, add a seat or ` +
              `change your plan in Settings, then try again.`,
      )
      setCapBlocked(true)
      setSaving(false)
      setConfirmBilling(false)
      return
    }
    // Apply an optional sign-in PIN chosen during add (best-effort; a failure here
    // shouldn't block the child being created — the parent can set it later).
    if (pinDraft.length === 4) {
      await setStudentPin(newId, pinDraft)
    }
    // Return to where the parent came from (onboarding "add another / continue"
    // or Settings) — NEVER force the diagnostic here, so a parent adding several
    // children isn't trapped in each child's placement. Placement is offered, not
    // forced: the child is offered it at their first session (see KidHome).
    navigate(returnTo, { replace: true })
  }

  return (
    <div className="auth-screen" style={{ color: '#1C2230' }}>
      <div className="auth-card" style={card}>
        <p
          style={{
            color: '#CC543C',
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
          }}
        >
          {editing ? 'Edit child' : 'Add a child'}
        </p>
        <h1
          style={{
            fontFamily: '"Baloo 2", "Trebuchet MS", system-ui, sans-serif',
            color: '#003078',
            fontSize: 23,
            fontWeight: 700,
            margin: '5px 0 14px',
          }}
        >
          {editing ? 'Update their details' : 'Tell us about them'}
        </h1>

        {loading ? (
          <p style={{ color: '#5A6172', fontSize: 14.5 }}>Loading…</p>
        ) : (
          <>
            {schoolManaged && (
              <p style={{ color: '#5A6172', fontSize: 14, margin: '0 0 6px', textAlign: 'left' }}>
                {name}’s school manages their name, grade, and level. You can still change the avatar and PIN
                here.
              </p>
            )}
            <div style={{ margin: '16px 0', textAlign: 'left' }}>
              <label
                htmlFor="child-name"
                style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 7 }}
              >
                First name
              </label>
              <input
                id="child-name"
                value={name}
                maxLength={20}
                placeholder="Their first name"
                disabled={schoolManaged}
                onChange={(e) => {
                  setName(e.target.value)
                  if (nameError) setNameError(false)
                }}
                style={nameError ? { ...inputBase, ...inputErr } : inputBase}
              />
            </div>

            <div style={{ margin: '16px 0', textAlign: 'left' }}>
              <label
                htmlFor="child-grade"
                style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 7 }}
              >
                Current grade
              </label>
              <select
                id="child-grade"
                value={grade}
                disabled={schoolManaged}
                onChange={(e) => {
                  setGrade(e.target.value)
                  if (gradeError) setGradeError(false)
                }}
                style={gradeError ? { ...inputBase, ...inputErr } : inputBase}
              >
                <option value="">Choose a grade</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {gradeLabel(g)}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ margin: '16px 0', textAlign: 'left' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 7 }}>
                How should Nikki challenge them?
              </label>
              {LEVELS.map((opt) => {
                const on = level === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={schoolManaged}
                    onClick={() => setLevel(opt.id)}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      border: on ? '1.6px solid #CC543C' : '1.6px solid #ECE4D8',
                      borderRadius: 14,
                      padding: '14px 16px',
                      marginBottom: 10,
                      background: on ? '#FBEEE9' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1C2230' }}>{opt.label}</div>
                    <div style={{ fontSize: 13, color: '#5A6172', marginTop: 2 }}>{opt.desc}</div>
                  </button>
                )
              })}
            </div>

            <AvatarModePicker value={avatarMode} onChange={setAvatarMode} />

            {/* Optional sign-in PIN. Lets this child open their own space on a
                shared device; a child with no PIN just taps in as before. When
                editing, changes save immediately; when adding, the PIN is applied
                right after the child is created. */}
            <div
              style={{
                border: '1.6px solid #ECE4D8',
                borderRadius: 14,
                padding: '14px 16px',
                margin: '16px 0',
                background: '#fff',
                textAlign: 'left',
              }}
            >
              <label style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#1C2230' }}>
                Sign-in PIN <span style={{ fontWeight: 500, color: '#5A6172' }}>(optional)</span>
              </label>
              <p style={{ fontSize: 13, color: '#5A6172', margin: '4px 0 12px' }}>
                A 4-digit PIN lets {name.trim() || 'your child'} enter their own space on a shared device. Leave it
                blank for direct entry.
              </p>
              {editing && id ? (
                <ChildPinControl studentId={id} hasPin={pinSet} onChanged={setPinSet} />
              ) : (
                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={pinDraft}
                  onChange={(e) => setPinDraft(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="0000"
                  aria-label="4-digit sign-in PIN"
                  style={{
                    width: 120,
                    padding: '12px 14px',
                    border: '1.6px solid #ECE4D8',
                    borderRadius: 12,
                    background: '#fff',
                    fontSize: 20,
                    letterSpacing: '0.3em',
                    textAlign: 'center',
                    color: '#1C2230',
                  }}
                />
              )}
            </div>

            {/* SAT / above-grade FRAMING consent, editable post-onboarding. Wired
                to the same students.above_grade_ok field the placement step writes.
                Framing/emphasis only: it enables SAT-readiness framing + the SAT
                Practice card, never access or advancement (mastery still governs). */}
            {editing && !schoolManaged && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  border: aboveGradeOk ? '1.6px solid #CC543C' : '1.6px solid #ECE4D8',
                  borderRadius: 14,
                  padding: '14px 16px',
                  margin: '16px 0',
                  background: aboveGradeOk ? '#FBEEE9' : '#fff',
                  textAlign: 'left',
                }}
              >
                <div style={{ flex: 1 }}>
                  <label
                    htmlFor="above-grade-ok"
                    style={{ display: 'block', fontWeight: 700, fontSize: 15, color: '#1C2230' }}
                  >
                    SAT &amp; above-grade framing
                  </label>
                  <p style={{ fontSize: 13, color: '#5A6172', margin: '4px 0 0' }}>
                    When on, Nikki can show SAT-readiness framing and unlock SAT practice for this child. This changes
                    how work is framed, not what your child is allowed to learn. They advance at their real mastery level
                    either way.
                  </p>
                </div>
                <Switch
                  id="above-grade-ok"
                  checked={aboveGradeOk}
                  onCheckedChange={setAboveGradeOk}
                  aria-label="SAT and above-grade framing"
                  style={{ marginTop: 3 }}
                />
              </div>
            )}

            {/* Free-trial seat limit reached, subscribing is required to add more. */}
            {needsSubscribe && (
              <div
                style={{
                  border: '1.6px solid #003078',
                  background: '#EAF1FB',
                  borderRadius: 14,
                  padding: '13px 15px',
                  margin: '12px 0 0',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1C2230' }}>
                  Subscribe to add more children
                </div>
                <p style={{ fontSize: 13.5, color: '#5A6172', margin: '4px 0 0' }}>
                  Your free trial covers up to {TRIAL_SEAT_CAP} children. Subscribe to add{' '}
                  {name.trim() || 'this child'} and keep everyone learning.
                </p>
              </div>
            )}

            {/* Heads-up when this child goes beyond the plan's included seats. */}
            {willBill && !confirmBilling && (
              <p style={{ color: '#5A6172', fontSize: 13.5, margin: '4px 2px 0' }}>
                This child is beyond your plan’s included seats, so it adds{' '}
                <b style={{ color: '#1C2230' }}>{addCost}</b>, prorated for this period.
              </p>
            )}

            {/* Explicit confirmation before any charge. */}
            {willBill && confirmBilling && (
              <div
                style={{
                  border: '1.6px solid #CC543C',
                  background: '#FBEEE9',
                  borderRadius: 14,
                  padding: '13px 15px',
                  margin: '12px 0 0',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1C2230' }}>Confirm extra child</div>
                <p style={{ fontSize: 13.5, color: '#5A6172', margin: '4px 0 0' }}>
                  Adding a child adds <b style={{ color: '#1C2230' }}>{addCost}</b>, prorated for this
                  period. Continue?
                </p>
              </div>
            )}

            {/* Grade changed → a fresh assessment is needed to reset their level. */}
            {confirmReassess && (
              <div
                style={{
                  border: '1.6px solid #003078',
                  background: '#EAF1FB',
                  borderRadius: 14,
                  padding: '13px 15px',
                  margin: '12px 0 0',
                  textAlign: 'left',
                }}
              >
                <div style={{ fontWeight: 700, fontSize: 14.5, color: '#1C2230' }}>New grade, quick re-check</div>
                <p style={{ fontSize: 13.5, color: '#5A6172', margin: '4px 0 0' }}>
                  Changing {name.trim() || 'their'}’s grade means we’ll do a short fresh assessment to reset their
                  level. What they’ve already mastered is kept, we’ll save and start it now.
                </p>
              </div>
            )}

            <div
              style={{
                color: '#C0492F',
                fontSize: 14,
                fontWeight: 500,
                minHeight: 18,
                marginTop: 8,
              }}
            >
              {errMsg}
            </div>

            {/* Upgrade path shown when a save was rejected (most often a seat/plan
                limit): a clear, explicit route to Settings rather than a dead end. */}
            {capBlocked && (
              <button
                type="button"
                onClick={() => navigate('/settings', { state: { returnTo: '/children/new' } })}
                style={{
                  display: 'block',
                  margin: '0 0 4px',
                  background: 'none',
                  border: 'none',
                  color: '#003078',
                  fontWeight: 700,
                  fontSize: 14.5,
                  textDecoration: 'underline',
                  textUnderlineOffset: 3,
                  cursor: 'pointer',
                }}
              >
                Manage your plan in Settings →
              </button>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || (!editing && !billingLoaded)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                padding: '15px 22px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15.5,
                background: '#CC543C',
                color: '#fff',
                cursor: saving || (!editing && !billingLoaded) ? 'not-allowed' : 'pointer',
                opacity: saving || (!editing && !billingLoaded) ? 0.45 : 1,
              }}
            >
              {saving
                ? 'Saving…'
                : editing
                  ? confirmReassess
                    ? 'Save & start assessment'
                    : 'Save changes'
                  : needsSubscribe
                    ? 'Subscribe to add a child'
                    : confirmBilling
                      ? `Confirm & add child (${addCost})`
                      : 'Save child'}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() =>
                confirmBilling
                  ? setConfirmBilling(false)
                  : confirmReassess
                    ? setConfirmReassess(false)
                    : navigate(returnTo)
              }
              style={{
                display: 'block',
                margin: '12px auto 0',
                background: 'none',
                color: '#003078',
                fontWeight: 700,
                fontSize: 14.5,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
                cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? 0.45 : 1,
              }}
            >
              {confirmBilling || confirmReassess ? 'Not now' : 'Cancel'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
