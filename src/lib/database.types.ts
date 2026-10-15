export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

/**
 * Minimal hand-written Supabase schema types.
 *
 * `profiles` already exists (created by the handle_new_user trigger, keyed by
 * the auth user id) with `display_name` and `nikki` columns — we do not create
 * or alter it. `consents` holds one row per consenting auth user. Regenerate
 * with the Supabase CLI (`supabase gen types typescript`) once the full schema
 * is in place.
 */
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string | null
          nikki: string | null
          subscription_status: string | null
          plan: string | null
          billing_period: string | null
          stripe_customer_id: string | null
          extra_kids: number | null
          // App-managed trial (migration 0012): trial window + one-trial-per-account
          // marker, and the seat cap once subscribed (included plan seats + the
          // Additional Child add-on quantity, written by the Stripe webhook).
          trial_end: string | null
          current_period_end: string | null
          has_trialed: boolean
          paid_seats: number | null
          trial_reminder_sent_at: string | null
          trial_ended_email_sent_at: string | null
          // Optional account "parent PIN" (migration 0013): bcrypt hash gating the
          // Parent dashboard / Settings / Sign out when a child is signed in on a
          // shared device. Null = no PIN (open access). Written only via the
          // set_parent_pin / clear_parent_pin RPCs; the client only reads null-ness.
          parent_pin_hash: string | null
        }
        Insert: {
          id: string
          display_name?: string | null
          nikki?: string | null
          subscription_status?: string | null
          plan?: string | null
          billing_period?: string | null
          stripe_customer_id?: string | null
          extra_kids?: number | null
          trial_end?: string | null
          current_period_end?: string | null
          has_trialed?: boolean
          paid_seats?: number | null
          trial_reminder_sent_at?: string | null
          trial_ended_email_sent_at?: string | null
          parent_pin_hash?: string | null
        }
        Update: {
          id?: string
          display_name?: string | null
          nikki?: string | null
          subscription_status?: string | null
          plan?: string | null
          billing_period?: string | null
          stripe_customer_id?: string | null
          extra_kids?: number | null
          trial_end?: string | null
          current_period_end?: string | null
          has_trialed?: boolean
          paid_seats?: number | null
          trial_reminder_sent_at?: string | null
          trial_ended_email_sent_at?: string | null
          parent_pin_hash?: string | null
        }
        Relationships: []
      }
      consents: {
        Row: {
          id: string
          parent_id: string
          parent_name: string | null
          method: string
          consent_version: string
          consented_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          parent_name?: string | null
          method: string
          consent_version: string
          consented_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          parent_name?: string | null
          method?: string
          consent_version?: string
          consented_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          id: string
          parent_id: string
          first_name: string
          grade: string
          level: string
          // Academic OS Phase 1 (migration 0001): forward-compat learning
          // preferences (modality, pace, …). Grade band is NOT stored — it is
          // derived from `grade` via gradeBand() in src/lib/gradeBand.ts.
          learning_preferences: Json
          // Placement (migration 0006): parent consent to show above-grade / SAT
          // framing. Governs framing only, not whether the child advances.
          above_grade_ok: boolean
          // Earned skill grade ('K'=0 .. 12), null until the student is promoted.
          // Defaults to `grade`. Raised by one rung when the ADVANCE bar is cleared
          // on every skill at the current working grade in a subject; NEVER lowered
          // automatically. Governs how far UP the practice ladder reaches. It does
          // NOT govern content age-appropriateness — that stays pinned to `grade`
          // (see CONTENT_AGE_CEILING_OFFSET in src/lib/gradeLadder.ts).
          working_grade: number | null
          // When and why the working grade last moved (migration 0021), so a
          // promotion is auditable and explainable to a parent.
          working_grade_updated_at: string | null
          working_grade_reason: string | null
          // Parent-chosen Nikki visual per child: 'video' | 'orb' | 'voice'
          // (default 'video'). Check-constrained in the DB.
          avatar_mode: string
          // School-license bridge: stable Dean student id (null for B2C) and
          // the covered marker. Set server-side after a Dean resolve; never
          // client-set (it drives the Stripe bypass).
          dean_student_id: string | null
          school_covered: boolean
          // The covering school (migration 0030), written server-side beside
          // school_covered. Null for B2C and for unmapped test accounts.
          school_id: string | null
          // Seat enforcement (migration 0012): a child counts against the plan's
          // seat cap only while active. Over-cap children are marked inactive by
          // the parent's seat picker (never deleted).
          active: boolean
          // Optional per-child sign-in PIN (migration 0013): bcrypt hash of a
          // 4-digit PIN, or null when the child has none (direct entry). Written
          // only via the set_student_pin / clear_student_pin RPCs; the client
          // reads null-ness to decide whether to prompt at the "Who's learning" picker.
          pin_hash: string | null
        }
        Insert: {
          id?: string
          parent_id: string
          first_name: string
          grade: string
          level: string
          learning_preferences?: Json
          above_grade_ok?: boolean
          working_grade?: number | null
          working_grade_updated_at?: string | null
          working_grade_reason?: string | null
          avatar_mode?: string
          dean_student_id?: string | null
          school_covered?: boolean
          school_id?: string | null
          active?: boolean
          pin_hash?: string | null
        }
        Update: {
          id?: string
          parent_id?: string
          first_name?: string
          grade?: string
          level?: string
          learning_preferences?: Json
          above_grade_ok?: boolean
          working_grade?: number | null
          working_grade_updated_at?: string | null
          working_grade_reason?: string | null
          avatar_mode?: string
          dean_student_id?: string | null
          school_covered?: boolean
          school_id?: string | null
          active?: boolean
          pin_hash?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          id: string
          student_id: string
          subject: string
          messages: Json
          updated_at: string
          // Coarse session timing (migration 0011): first-touch / last-touch.
          started_at: string
          ended_at: string | null
          // Academic OS Phase 1 (migration 0001): skills touched this session
          // and the mastery deltas written, so a finished session self-describes.
          skills_practiced: Json
          mastery_updates: Json
        }
        Insert: {
          id?: string
          student_id: string
          subject: string
          messages: Json
          updated_at?: string
          started_at?: string
          ended_at?: string | null
          skills_practiced?: Json
          mastery_updates?: Json
        }
        Update: {
          id?: string
          student_id?: string
          subject?: string
          messages?: Json
          updated_at?: string
          started_at?: string
          ended_at?: string | null
          skills_practiced?: Json
          mastery_updates?: Json
        }
        Relationships: []
      }
      feedback: {
        Row: {
          id: string
          student_id: string
          subject: string
          rating: string
          note: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          subject: string
          rating: string
          note?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          subject?: string
          rating?: string
          note?: string | null
          created_at?: string
        }
        Relationships: []
      }
      // Academic OS Phase 1 (migration 0001): self-referential taxonomy
      // (Subject -> Domain -> Skill -> MicroSkill). `slug` equals a focusAreas
      // value on Skill rows so the resolver is a clean join.
      skills: {
        Row: {
          id: string
          level: Database['public']['Enums']['skill_level']
          parent_id: string | null
          subject: string
          name: string
          slug: string | null
          grade_band: Database['public']['Enums']['grade_band'] | null
          // True Common Core grade (migration: re-level). grade_band is kept for
          // back-compat; ccss_grade_num ('K'=0 .. 12) is the orderable placement key.
          ccss_grade: string | null
          ccss_code: string | null
          ccss_grade_num: number | null
          // Migration 0034: which of the 30 official College Board SAT skills this
          // row is (sat_official_skills.code), or null for every other skill.
          sat_skill_code: string | null
          sat_alignment: string | null
          prerequisite_skills: string[]
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          level: Database['public']['Enums']['skill_level']
          parent_id?: string | null
          subject: string
          name: string
          slug?: string | null
          grade_band?: Database['public']['Enums']['grade_band'] | null
          ccss_grade?: string | null
          ccss_code?: string | null
          ccss_grade_num?: number | null
          sat_alignment?: string | null
          prerequisite_skills?: string[]
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          level?: Database['public']['Enums']['skill_level']
          parent_id?: string | null
          subject?: string
          name?: string
          slug?: string | null
          grade_band?: Database['public']['Enums']['grade_band'] | null
          ccss_grade?: string | null
          ccss_code?: string | null
          ccss_grade_num?: number | null
          sat_alignment?: string | null
          prerequisite_skills?: string[]
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      // Academic OS Phase 1 (migration 0001): per-student mastery, written
      // client-side under RLS gated by owns_student(parent_id).
      student_skill_mastery: {
        Row: {
          id: string
          student_id: string
          skill_id: string
          mastery_percentage: number
          accuracy: number
          attempts: number
          last_practiced: string | null
          created_at: string
          updated_at: string
          // Evidence-driven mastery (migration 0010), computed from graded
          // question_attempts by recompute_skill_mastery(). These are the
          // authoritative, parent/school-facing signals; mastery_percentage/
          // accuracy/attempts above are the legacy self-rated values, kept.
          status: 'not_started' | 'practicing' | 'advanced' | 'mastered'
          evidence_accuracy: number | null
          attempts_counted: number
          first_bar_met_at: string | null
          recheck_passed_at: string | null
          computed_at: string | null
          legacy_self_rating_mastery: number | null
          // First time the ADVANCE bar was met (migration 0030). Stamped once by
          // the engine and never cleared.
          advanced_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          skill_id: string
          mastery_percentage?: number
          accuracy?: number
          attempts?: number
          last_practiced?: string | null
          created_at?: string
          updated_at?: string
          status?: 'not_started' | 'practicing' | 'advanced' | 'mastered'
          evidence_accuracy?: number | null
          attempts_counted?: number
          first_bar_met_at?: string | null
          recheck_passed_at?: string | null
          computed_at?: string | null
          legacy_self_rating_mastery?: number | null
          advanced_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          skill_id?: string
          mastery_percentage?: number
          accuracy?: number
          attempts?: number
          last_practiced?: string | null
          created_at?: string
          updated_at?: string
          status?: 'not_started' | 'practicing' | 'advanced' | 'mastered'
          evidence_accuracy?: number | null
          attempts_counted?: number
          first_bar_met_at?: string | null
          recheck_passed_at?: string | null
          computed_at?: string | null
          legacy_self_rating_mastery?: number | null
          advanced_at?: string | null
        }
        Relationships: []
      }
      // Practice-SAT Phase 2: per-student focus skills (missed SAT skills the
      // learning path serves next). Active = resolved_at is null. Written
      // client-side under RLS gated by owns_student(student_id).
      student_focus_skills: {
        Row: {
          id: string
          student_id: string
          skill_id: string
          source: string
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          skill_id: string
          source?: string
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          skill_id?: string
          source?: string
          created_at?: string
          resolved_at?: string | null
        }
        Relationships: []
      }
      // Academic OS Phase 2 (migration 0002): computed readiness / Pathway Score
      // per student per type ('pathway' overall + 'math'/'reading'/'writing').
      // Written client-side under RLS gated by owns_student(student_id).
      readiness_scores: {
        Row: {
          id: string
          student_id: string
          readiness_type: string
          score: number
          strengths: Json
          gaps: Json
          next_skill_slug: string | null
          recommendations: Json
          // Academic OS Phase 2 (migration 0003): engine version that computed
          // this row, for self-healing recompute when the engine changes.
          engine_version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          readiness_type: string
          score?: number
          strengths?: Json
          gaps?: Json
          next_skill_slug?: string | null
          recommendations?: Json
          engine_version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          readiness_type?: string
          score?: number
          strengths?: Json
          gaps?: Json
          next_skill_slug?: string | null
          recommendations?: Json
          engine_version?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      // Question Engine Stage 1 (migration 0004): hybrid content model. Shared,
      // school-agnostic content; client sees only status='published' rows.
      // Drafts are authored/reviewed via the service role.
      question_templates: {
        Row: {
          id: string
          code: string | null
          skill_id: string
          sat_alignment: string | null
          difficulty: Database['public']['Enums']['question_difficulty']
          kind: Database['public']['Enums']['question_kind']
          generation_spec: Json
          distractor_spec: Json
          status: Database['public']['Enums']['question_status']
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          skill_id: string
          sat_alignment?: string | null
          difficulty: Database['public']['Enums']['question_difficulty']
          kind: Database['public']['Enums']['question_kind']
          generation_spec?: Json
          distractor_spec?: Json
          status?: Database['public']['Enums']['question_status']
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          skill_id?: string
          sat_alignment?: string | null
          difficulty?: Database['public']['Enums']['question_difficulty']
          kind?: Database['public']['Enums']['question_kind']
          generation_spec?: Json
          distractor_spec?: Json
          status?: Database['public']['Enums']['question_status']
          version?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      // Original reading stimuli (Phase 2). One passage backs many
      // generated_questions rows via generated_questions.passage_id; only
      // status='published' rows are client-readable (RLS mirrors
      // generated_questions).
      passages: {
        Row: {
          id: string
          code: string | null
          skill_id: string
          sat_alignment: string | null
          grade_band: Database['public']['Enums']['grade_band'] | null
          title: string | null
          body: string
          status: Database['public']['Enums']['question_status']
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          code?: string | null
          skill_id: string
          sat_alignment?: string | null
          grade_band?: Database['public']['Enums']['grade_band'] | null
          title?: string | null
          body: string
          status?: Database['public']['Enums']['question_status']
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          code?: string | null
          skill_id?: string
          sat_alignment?: string | null
          grade_band?: Database['public']['Enums']['grade_band'] | null
          title?: string | null
          body?: string
          status?: Database['public']['Enums']['question_status']
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      generated_questions: {
        Row: {
          id: string
          template_id: string | null
          skill_id: string
          sat_alignment: string | null
          difficulty: Database['public']['Enums']['question_difficulty']
          stem: string
          // choices, correct_answer and solution hold the answer key. Since
          // migration 0033 the browser cannot read them; it reads choices_public
          // (the choices without is_correct or misconception_token) and gets the
          // verdict from submit_answer after answering.
          choices: Json
          correct_answer: string
          solution: string | null
          choices_public: Json
          status: Database['public']['Enums']['question_status']
          // Reading-set link (migration 0007): the passage this question is
          // asked about, or null for math/writing standalone stems.
          passage_id: string | null
          // K–2 pre-reader (audio-picture) support: render mode + optional visual
          // prompt. Existing rows default to 'text'.
          render_mode: string
          prompt: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          template_id?: string | null
          skill_id: string
          sat_alignment?: string | null
          difficulty: Database['public']['Enums']['question_difficulty']
          stem: string
          choices?: Json
          correct_answer: string
          solution?: string | null
          status?: Database['public']['Enums']['question_status']
          passage_id?: string | null
          render_mode?: string
          prompt?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          template_id?: string | null
          skill_id?: string
          sat_alignment?: string | null
          difficulty?: Database['public']['Enums']['question_difficulty']
          stem?: string
          choices?: Json
          correct_answer?: string
          solution?: string | null
          status?: Database['public']['Enums']['question_status']
          passage_id?: string | null
          render_mode?: string
          prompt?: Json | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      // The real scored-performance signal. APPEND-ONLY (RLS allows select +
      // insert only), owned via owns_student(student_id) like mastery.
      question_attempts: {
        Row: {
          id: string
          student_id: string
          generated_question_id: string | null
          skill_id: string
          sat_alignment: string | null
          is_correct: boolean
          chosen_choice_index: number | null
          chosen_misconception_token: string | null
          time_ms: number | null
          created_at: string
          // Placement (migration 0006): true for diagnostic-recorded attempts so
          // seeding can tell them apart from real practice history.
          is_diagnostic: boolean
        }
        // Since migration 0031 the browser sends only the inputs (question,
        // option, time, placement flag). A trigger grades the answer and fills
        // skill_id, sat_alignment, is_correct and the misconception token.
        Insert: {
          id?: string
          student_id: string
          generated_question_id?: string | null
          skill_id?: string
          sat_alignment?: string | null
          is_correct?: boolean
          chosen_choice_index?: number | null
          chosen_misconception_token?: string | null
          time_ms?: number | null
          created_at?: string
          is_diagnostic?: boolean
        }
        Update: {
          id?: string
          student_id?: string
          generated_question_id?: string | null
          skill_id?: string
          sat_alignment?: string | null
          is_correct?: boolean
          chosen_choice_index?: number | null
          chosen_misconception_token?: string | null
          time_ms?: number | null
          created_at?: string
          is_diagnostic?: boolean
        }
        Relationships: []
      }
      // Test-prep modules (migration 0015). Per-child, keyed on student_id ->
      // public.students(id). prep_entitlements is written only by the Stripe
      // webhook (service role) and is read-only to the client; the other three
      // are client read/write under owns_student RLS.
      prep_entitlements: {
        Row: {
          id: string
          student_id: string
          module_id: string
          status: string
          stripe_subscription_item_id: string | null
          created_at: string
          ends_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          module_id: string
          status: string
          stripe_subscription_item_id?: string | null
          created_at?: string
          ends_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          module_id?: string
          status?: string
          stripe_subscription_item_id?: string | null
          created_at?: string
          ends_at?: string | null
        }
        Relationships: []
      }
      prep_settings: {
        Row: {
          student_id: string
          module_id: string
          test_date: string | null
        }
        Insert: {
          student_id: string
          module_id: string
          test_date?: string | null
        }
        Update: {
          student_id?: string
          module_id?: string
          test_date?: string | null
        }
        Relationships: []
      }
      prep_attempts: {
        Row: {
          id: string
          student_id: string
          module_id: string
          section_id: string
          mode: string
          status: string
          started_at: string | null
          submitted_at: string | null
          time_limit_sec: number | null
          question_ids: Json | null
          answers: Json | null
          score: number | null
          full_test_group_id: string | null
        }
        Insert: {
          id?: string
          student_id: string
          module_id: string
          section_id: string
          mode: string
          status: string
          started_at?: string | null
          submitted_at?: string | null
          time_limit_sec?: number | null
          question_ids?: Json | null
          answers?: Json | null
          score?: number | null
          full_test_group_id?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          module_id?: string
          section_id?: string
          mode?: string
          status?: string
          started_at?: string | null
          submitted_at?: string | null
          time_limit_sec?: number | null
          question_ids?: Json | null
          answers?: Json | null
          score?: number | null
          full_test_group_id?: string | null
        }
        Relationships: []
      }
      prep_essay_attempts: {
        Row: {
          id: string
          student_id: string
          prompt_id: string
          essay_text: string | null
          nikki_feedback: string | null
          started_at: string | null
          submitted_at: string | null
          time_limit_sec: number | null
        }
        Insert: {
          id?: string
          student_id: string
          prompt_id: string
          essay_text?: string | null
          nikki_feedback?: string | null
          started_at?: string | null
          submitted_at?: string | null
          time_limit_sec?: number | null
        }
        Update: {
          id?: string
          student_id?: string
          prompt_id?: string
          essay_text?: string | null
          nikki_feedback?: string | null
          started_at?: string | null
          submitted_at?: string | null
          time_limit_sec?: number | null
        }
        Relationships: []
      }
      // School staff with read-only access to their school's progress
      // (migration 0030). A signed-in user can read only their own rows;
      // writes are service role only.
      school_staff: {
        Row: {
          id: string
          school_id: string
          email: string
          user_id: string | null
          role: 'teacher' | 'guidance' | 'admin' | 'academic_dean'
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          school_id: string
          email: string
          user_id?: string | null
          role: 'teacher' | 'guidance' | 'admin' | 'academic_dean'
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          school_id?: string
          email?: string
          user_id?: string | null
          role?: 'teacher' | 'guidance' | 'admin' | 'academic_dean'
          active?: boolean
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: {
      // Optional PIN management (migration 0013). set/clear return void; verify
      // returns whether the supplied 4-digit PIN matches the stored bcrypt hash.
      set_student_pin: {
        Args: { p_student_id: string; p_pin: string }
        Returns: undefined
      }
      clear_student_pin: {
        Args: { p_student_id: string }
        Returns: undefined
      }
      verify_student_pin: {
        Args: { p_student_id: string; p_pin: string }
        Returns: boolean
      }
      set_parent_pin: {
        Args: { p_pin: string }
        Returns: undefined
      }
      clear_parent_pin: {
        Args: Record<string, never>
        Returns: undefined
      }
      verify_parent_pin: {
        Args: { p_pin: string }
        Returns: boolean
      }
      // Prep timed-section engine (migration 0016). All server-authoritative:
      // start/resume stamps started_at with now(); finalize decides submitted vs
      // expired from the server clock and scores the stored answers. Each returns
      // the attempt as jsonb (Json) including a server-computed remaining_seconds.
      // Migration 0033: the server picks the questions and the time limit.
      prep_start_section: {
        Args: {
          p_student_id: string
          p_module_id: string
          p_section_id: string
        }
        Returns: Json
      }
      prep_attempt_review: {
        Args: { p_attempt_id: string }
        Returns: Json
      }
      submit_answer: {
        Args: {
          p_student_id: string
          p_question_id: string
          p_choice_index: number
          p_time_ms?: number | null
          p_is_diagnostic?: boolean
        }
        Returns: Json
      }
      prep_remaining_seconds: {
        Args: { p_attempt_id: string }
        Returns: number | null
      }
      prep_finalize_attempt: {
        Args: { p_attempt_id: string; p_client_expired?: boolean }
        Returns: Json
      }
      // Prep essay engine (migration 0018). start/resume stamps started_at with
      // now(); remaining_seconds is server-computed; finalize stamps submitted_at.
      // Each returns the essay as jsonb (Json) incl. remaining_seconds.
      // (prep_essay_save_feedback is service-role only — not listed here, as the
      // browser client never calls it.)
      prep_essay_start: {
        Args: { p_student_id: string; p_module_id: string; p_prompt_id: string }
        Returns: Json
      }
      prep_essay_remaining_seconds: {
        Args: { p_attempt_id: string }
        Returns: number | null
      }
      prep_essay_finalize: {
        Args: { p_attempt_id: string; p_essay_text?: string | null; p_client_expired?: boolean }
        Returns: Json
      }
      // Server-decided results (migration 0031). Each checks the caller owns
      // the student and works only from answers the database graded itself.
      record_practice_result: {
        Args: { p_student_id: string; p_skill_id: string; p_attempt_ids: string[] }
        Returns: Json
      }
      seed_placement_mastery: {
        Args: { p_student_id: string; p_skill_ids: string[] }
        Returns: number
      }
      raise_working_grade_if_earned: {
        Args: { p_student_id: string }
        Returns: Json
      }
      // Staff progress view (migration 0030). Each returns only safe columns:
      // never chat content, PINs or billing ids.
      link_staff_account: {
        Args: Record<string, never>
        Returns: number
      }
      staff_role_for: {
        Args: { p_school_id: string }
        Returns: string | null
      }
      can_view_test_scores: {
        Args: { p_school_id: string }
        Returns: boolean
      }
      // Migration 0034: platform admins only; refuses everyone else.
      is_platform_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
      sat_coverage: {
        Args: Record<string, never>
        Returns: {
          code: string
          name: string
          section: string
          domain: string
          sort: number
          target: number
          skill_id: string | null
          skill_slug: string | null
          drafted: number
          checks_passing: number
          reviewed: number
          published: number
        }[]
      }
      // 'recent' (default): most recently active first. 'name': A to Z.
      staff_search_students: {
        Args: { p_query: string; p_order?: 'recent' | 'name' }
        Returns: {
          student_id: string
          school_id: string
          first_name: string
          grade: string
          email: string | null
          last_active_at: string | null
        }[]
      }
      staff_student_profile: {
        Args: { p_student_id: string }
        Returns: {
          student_id: string
          school_id: string
          first_name: string
          grade: string
          email: string | null
          last_active_at: string | null
          days_active_this_month: number
        }[]
      }
      staff_student_sessions: {
        Args: { p_student_id: string }
        Returns: {
          subject: string
          started_at: string
          ended_at: string | null
          updated_at: string
        }[]
      }
    }
    Enums: {
      // Must match the canonical resolver gradeBand() in src/lib/gradeBand.ts.
      grade_band: 'k-2' | '3-5' | '6-8' | '9-12'
      skill_level: 'subject' | 'domain' | 'skill' | 'microskill'
      // Question Engine Stage 1 (migration 0004).
      question_difficulty: 'easy' | 'medium' | 'hard'
      question_kind: 'template_math' | 'llm_generated'
      question_status: 'draft' | 'reviewed' | 'published'
    }
    CompositeTypes: Record<string, never>
  }
}
