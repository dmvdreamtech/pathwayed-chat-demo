import { useEffect, useState, type ReactNode } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '@/context/AuthContext'
import { isSchoolCovered } from '@/lib/schoolSession'
import { getSubscription, type Subscription } from '@/lib/profile'
import { listStudents, type Student } from '@/lib/students'
import { hasCoveredStudent, hasLearningAccess } from '@/lib/accessGate'
import { getPrepEntitlements, isKidEntitled, prepModulesUsingSkill } from '@/lib/prep/entitlements'
import { PlanPicker } from '@/components/PlanPicker'
import { SCHOOL_PROVIDED_BODY, SCHOOL_PROVIDED_TITLE, billingOffer, useSchoolProvided } from '@/lib/schoolProvided'
import { TopMenu } from '@/components/TopMenu'
import '@/styles/app-screens.css'

/**
 * Route guard for learning sessions + homework help. Blocks entry for the whole
 * account once the app-managed free trial has ended and there's no active
 * subscription — showing a parent-facing subscribe prompt (with the plan picker)
 * instead of the learning surface. No data is deleted or hidden; only the session
 * is locked.
 *
 * ORDER MATTERS: school-covered students bypass entirely and are checked FIRST,
 * before any trial state is read (isSchoolCovered() short-circuits below). This
 * is the same covered-student bypass the Billing card uses.
 *
 * COVERAGE HAS TWO SOURCES, AND BOTH ARE SERVER-WRITTEN.
 *   1. isSchoolCovered() - the sessionStorage flag from a verified Dean resolve.
 *      Synchronous, so it bypasses without waiting on any read.
 *   2. students.school_covered - the durable record of the same fact, for a
 *      covered student who signed in normally and so has no school session.
 *      Only trustworthy because migration 0025 leaves the service role its only
 *      writer; see hasCoveredStudent() in accessGate.
 *
 * A NON-COVERED FAMILY IS UNAFFECTED. Source 2 resolves false for every B2C
 * account, so the trial countdown, the day-seven lock and this subscribe prompt
 * behave exactly as before. The students read it depends on was already being
 * made here for the plan picker, so this adds no request.
 */
export function SubscriptionGate({
  children,
  allowPrepSkill = false,
}: {
  children: ReactNode
  /**
   * On a Practice route (/students/:id/practice/:skill): also let through a child
   * who has an active prep entitlement for a module that uses this skill, so a
   * prep-only family can use prep Train/Practice. The server checks the same rule
   * when each answer is submitted (can_practice_skill, migration 0033).
   */
  allowPrepSkill?: boolean
}) {
  const { user } = useAuth()
  const sessionCovered = isSchoolCovered()
  const { id: routeStudentId, skill: routeSkill } = useParams<{ id?: string; skill?: string }>()
  const wantsPrep = allowPrepSkill && !!routeStudentId && !!routeSkill
  // Whether the prep entitlement opens this route. Null until it has been read.
  const [prepAllowed, setPrepAllowed] = useState<boolean | null>(null)
  const [sub, setSub] = useState<Subscription | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  // Snapshot the clock once at mount — a stable render-time value for the gate.
  const [now] = useState(() => Date.now())
  // Migration 0037: staff, platform admins and school addresses get a note, not
  // a plan picker, if they ever reach a locked screen.
  const schoolReason = useSchoolProvided(sessionCovered ? null : user?.id)

  useEffect(() => {
    // Covered students never touch billing state; an unauthenticated view (no
    // parent to check) is left to the pages' own handling. Either way, skip —
    // the render short-circuits to children before the loading gate below.
    if (sessionCovered || !user) return
    let active = true
    Promise.all([getSubscription(user.id), listStudents(user.id)]).then(([s, kids]) => {
      if (!active) return
      setSub(s)
      setStudents(kids)
    })
    return () => {
      active = false
    }
  }, [sessionCovered, user])

  useEffect(() => {
    if (!wantsPrep || sessionCovered || !user || !routeStudentId || !routeSkill) return
    let active = true
    const modules = prepModulesUsingSkill(routeSkill)
    getPrepEntitlements([routeStudentId])
      .then((ents) => {
        if (active) setPrepAllowed(ents.some((e) => isKidEntitled(e.status) && modules.includes(e.moduleId)))
      })
      .catch(() => {
        if (active) setPrepAllowed(false)
      })
    return () => {
      active = false
    }
  }, [wantsPrep, sessionCovered, user, routeStudentId, routeSkill])

  // Covered → straight through. No user → preserve existing (ungated) behavior.
  if (sessionCovered || !user) return <>{children}</>

  // Still fetching (sub not yet loaded) — hold rather than flash the lock screen.
  if (!sub) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }

  // The students list is loaded by now, so database coverage can be read. A
  // covered student reaches this line (not the early return above) whenever they
  // signed in without a school session.
  if (hasLearningAccess(sub, now, hasCoveredStudent(students))) return <>{children}</>

  // No learning plan, but this may be a prep skill the child is entitled to.
  if (wantsPrep && prepAllowed === null) {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }
  if (wantsPrep && prepAllowed) return <>{children}</>

  const offer = billingOffer(schoolReason, students)
  if (offer === 'wait') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <p className="muted">Loading…</p>
        </div>
      </div>
    )
  }
  if (offer === 'school') {
    return (
      <div className="kid-screen">
        <div className="shell">
          <TopMenu />
          <h1 className="greet" style={{ marginTop: 18 }}>
            {SCHOOL_PROVIDED_TITLE}
          </h1>
          <p className="muted">
            {SCHOOL_PROVIDED_BODY} Learning on this account is set up through your school.
          </p>
        </div>
      </div>
    )
  }

  // Locked: parent-facing subscribe prompt with the plan picker.
  return (
    <div className="kid-screen">
      <div className="shell">
        <TopMenu />
        <h1 className="greet" style={{ marginTop: 18 }}>
          Your free trial has ended
        </h1>
        <p className="muted">
          Subscribe to unlock learning sessions and homework help for your children again. Nothing has been
          deleted, every child’s saved progress is right where they left it.
        </p>
        <div className="panel" style={{ marginTop: 20, padding: '16px 18px' }}>
          <PlanPicker students={students} ctaLabel="Subscribe now" />
        </div>
      </div>
    </div>
  )
}
