# Maryland's 2025 math standards: what it means for the Math gaps

The Phase A report flagged that Maryland's revised math standards move some
content between grades. A check on 2026-10-15 found that the revision is larger
than a few moves, and that it takes effect this school year for K to 8.

## What changed

- The State Board adopted revised math standards on **July 29, 2025**. This is
  the first major revision since the 2010 Common Core based standards, and it
  runs from Pre-K through Integrated Algebra 2.
- **Pre-K to grade 8 take effect in 2026-27** (this school year). Integrated
  Algebra 1 follows in 2027-28.
- **High school becomes an integrated pathway.** Instead of Algebra I, then
  Geometry, then Algebra II, geometry is folded into Integrated Algebra 1 and
  Integrated Algebra 2. Starting with the Class of 2031, students need an A, B
  or C in both courses.
- The revision uses **new codes**, for example `1.GR.C.6`. A crosswalk to the
  2010 standards exists for each grade.
- Some examples of content moving or growing:
  - Money moves to grade 1. Grade 1 now covers the penny, nickel, dime and
    quarter, and the 1, 5, 10 and 20 dollar bills. In 2010 money started in
    grade 2.
  - Grade 2 time goes from the nearest five minutes to the nearest minute, and
    adds elapsed time.
  - Grade 6 ratio content now sits under a new "Algebraic Thinking" domain.
  - Estimation, reasoning, and a structured data and statistics strand get more
    weight.

MSDE's own documents (the grade crosswalks at msde.maryland.gov) could not be
fetched from here; the server refuses automated requests. The points above come
from district and press summaries of them. Read the MSDE crosswalks before
relying on any specific grade move.

## What it means for this build

- **Done so far:** the high school Math gap skills (grades 9 to 12) follow the
  Common Core course order: Algebra I, Geometry, Algebra II, then Precalculus
  and Statistics. They target the standards in `coverage_targets`. The content
  itself, such as quadratics, circles, trig and probability, carries over to the
  integrated courses. Only the grade and course labels would shift.
- **Waiting on a decision:** I have **not** started the K to 8 Math gaps. They
  should be planned against the 2025 Maryland standards, since those are what
  K to 8 classrooms teach this year, not the 2010 ones that 0040's targets use.
  Two ways to do it:
  1. Get the MSDE crosswalks (download them by hand, or share the files). Then
     rebuild the K to 8 math targets from the new codes and write the missing
     skills against them. This is the recommended option.
  2. Build K to 8 against the 2010 targets now, and accept that some skills
     will sit a grade off for Maryland students.
- **Reading and Writing** are unaffected. Maryland's ELA standards still match
  Common Core one for one.

## Sources

- [Maryland State Board adopts new math policy (Baltimore Sun, 2025-03-25)](https://www.baltimoresun.com/2025/03/25/maryland-board-of-education-votes-to-adopt-new-math-policy/)
- [What the New MSDE Math Policy Means for MCPS](https://www.montgomeryschoolsmd.org/news/mcps-news/2026/02/math-update/)
- [Howard County board item: MSDE Mathematics Policy and District Implementation](https://go.boarddocs.com/mabe/hcpssmd/Board.nsf/files/DRUR546C40D4/$file/03%2026%2026%20MSDE%20Mathematics%20Policy%20and%20District%20Implementation%20BR.pdf)
- [MSDE: Grade 6 Maryland College and Career Ready Standards for Mathematics](https://msde.maryland.gov/media/17816)
- [MSDE Maryland standards document](https://msde.maryland.gov/media/25289)
- [Maryland outlines major math standards revisions and phased timeline](https://citizenportal.ai/articles/6532907/maryland/school-boards/maryland-department-of-education/maryland-outlines-major-math-standards-revisions-and-timeline-for-phased-implementation)
- [MSDE Unveils New PreK-12 Math Plan (Southern Maryland Chronicle)](https://southernmarylandchronicle.com/2025/03/31/msde-unveils-new-prek-12-math-plan-drops-geometry-focus/)
- [New Maryland Math Standards: What Changed for K-2](https://www.diapers2deposits.com/news-articles/new-maryland-math-standards-k-2)
