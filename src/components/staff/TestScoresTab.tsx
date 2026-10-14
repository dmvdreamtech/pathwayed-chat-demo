/**
 * Placeholder for the Test Scores tab (step 3: placement results, HSPT/ISEE
 * sections, SAT readiness). Hidden for everyone in this step: the student page
 * renders no tab bar while this flag is false.
 *
 * The data is already gated in the database (migration 0030): only guidance,
 * admin and academic_dean can read it, via can_view_test_scores(school_id).
 * When this tab is built, show it only when that function returns true, and
 * show measured scores only.
 */
export const SHOW_TEST_SCORES_TAB = false

export function TestScoresTab() {
  return null
}
