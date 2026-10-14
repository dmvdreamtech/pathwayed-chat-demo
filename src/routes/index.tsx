import { Routes, Route, Navigate } from 'react-router'
import { SchoolLoginGate } from '@/components/SchoolLoginGate'
import { SubscriptionGate } from '@/components/SubscriptionGate'
import { SchoolStation } from '@/pages/SchoolStation'
import { Welcome } from '@/pages/Welcome'
import { ResetPassword } from '@/pages/ResetPassword'
import { Consent } from '@/pages/Consent'
import { YourChildren } from '@/pages/YourChildren'
import { AddChild } from '@/pages/AddChild'
import { StudentPicker } from '@/pages/StudentPicker'
import { KidHome } from '@/pages/KidHome'
import { SkillsBuilding } from '@/pages/SkillsBuilding'
import { HomeworkStart } from '@/pages/HomeworkStart'
import { Practice } from '@/pages/Practice'
import { PracticeSat } from '@/pages/PracticeSat'
import { Diagnostic } from '@/pages/Diagnostic'
import { Session } from '@/pages/Session'
import { ParentArea } from '@/pages/ParentArea'
import { Settings } from '@/pages/Settings'
import { AccountSetup } from '@/pages/AccountSetup'
import { GradeSelect } from '@/pages/GradeSelect'
import { TeacherSetup } from '@/pages/TeacherSetup'
import { ParentSetup } from '@/pages/ParentSetup'
import { StudentHome } from '@/pages/StudentHome'
import { StudentSubject } from '@/pages/StudentSubject'
import { PrepModuleHome } from '@/pages/prep/PrepModuleHome'
import { PrepTimedSection } from '@/pages/prep/PrepTimedSection'
import { PrepReview } from '@/pages/prep/PrepReview'
import { PrepEssay } from '@/pages/prep/PrepEssay'
import { StaffSearch } from '@/pages/staff/StaffSearch'
import { StaffStudent } from '@/pages/staff/StaffStudent'

export function AppRoutes() {
  return (
    <>
    <SchoolLoginGate />
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/consent" element={<Consent />} />
      {/* Persona-selection step retired (orb is the only visual presence). Redirect
          any lingering link into onboarding rather than 404. */}
      <Route path="/choose-nikki" element={<Navigate to="/children" replace />} />
      <Route path="/children" element={<YourChildren />} />
      <Route path="/children/new" element={<AddChild />} />
      <Route path="/children/:id/edit" element={<AddChild />} />
      {/* K-8 staff-supervised station: staff SSO (Dean) then student PIN entry. */}
      <Route path="/school" element={<SchoolStation />} />
      {/* Read-only staff view of school students' tutoring progress. Each page
          gates on an active school_staff row and redirects everyone else to /. */}
      <Route path="/staff" element={<StaffSearch />} />
      <Route path="/staff/students/:id" element={<StaffStudent />} />
      <Route path="/students" element={<StudentPicker />} />
      {/* Learning surface, gated by the app-managed trial. Once the trial ends
          with no active subscription, SubscriptionGate blocks entry (for all
          children on the account) and shows a parent-facing subscribe prompt.
          School-covered students bypass it entirely (checked first). */}
      <Route path="/students/:id" element={<SubscriptionGate><KidHome /></SubscriptionGate>} />
      {/* Arrival choices (Phase 1 stubs): skills building (Phase 2) + homework (Phase 3). */}
      <Route path="/students/:id/learn" element={<SubscriptionGate><SkillsBuilding /></SubscriptionGate>} />
      <Route path="/students/:id/homework" element={<SubscriptionGate><HomeworkStart /></SubscriptionGate>} />
      <Route path="/students/:id/session/:subject" element={<SubscriptionGate><Session /></SubscriptionGate>} />
      <Route path="/students/:id/practice/:skill" element={<SubscriptionGate allowPrepSkill><Practice /></SubscriptionGate>} />
      {/* Practice SAT, Phase 1: HS-only, consent-gated, Math-only. The page
          re-checks the gate and redirects anyone who fails it. */}
      <Route path="/students/:id/practice-sat" element={<SubscriptionGate><PracticeSat /></SubscriptionGate>} />
      {/* Test-prep module shell (kid-facing). NOT behind SubscriptionGate: prep is
          separately paid, so a prep-only family (expired/no learning plan but an
          active prep entitlement) must still reach it. The page's own entitlement
          check (active/past_due for this module) is the gate, it redirects home
          otherwise. Child identity comes from getStudent(id) under RLS. */}
      <Route path="/students/:id/prep/:moduleId" element={<PrepModuleHome />} />
      {/* Timed section engine + review. Ungated like the module home; each page
          checks the module entitlement itself. The timed screen has no Nikki. */}
      <Route path="/students/:id/prep/:moduleId/section/:sectionId" element={<PrepTimedSection />} />
      <Route path="/students/:id/prep/:moduleId/review/:attemptId" element={<PrepReview />} />
      {/* ISEE practice essay (server-timed) + review of a past essay. Same
          entitlement self-check; the writing screen has no Nikki (she returns only
          on the feedback/review screen). */}
      <Route path="/students/:id/prep/:moduleId/essay" element={<PrepEssay />} />
      <Route path="/students/:id/prep/:moduleId/essay/review/:attemptId" element={<PrepEssay />} />
      {/* Placement diagnostic, Phase 1 (silent scoring). Temporary direct-hit
          verification route; not yet wired into onboarding. */}
      <Route path="/students/:id/diagnostic" element={<Diagnostic />} />
      <Route path="/parent" element={<ParentArea />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/account-setup" element={<AccountSetup />} />
      <Route path="/grade-select" element={<GradeSelect />} />
      <Route path="/teacher-setup" element={<TeacherSetup />} />
      <Route path="/parent-setup" element={<ParentSetup />} />
      <Route path="/student" element={<StudentHome />} />
      <Route path="/student/:subject" element={<StudentSubject />} />
      {/* Legacy mock parent screens (ParentDashboard, ParentView) retired, both
          old routes now redirect to the one real dashboard. (/parent-view is
          still linked from the untouched legacy StudentHome, so we redirect
          rather than 404 it.) */}
      <Route path="/parent-dashboard" element={<Navigate to="/parent" replace />} />
      <Route path="/parent-view" element={<Navigate to="/parent" replace />} />
    </Routes>
    </>
  )
}
