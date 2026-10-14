/**
 * Question Engine, Stage 4 — explanation-by-misconception.
 *
 * Maps the misconception token recorded on a wrong answer (the
 * `chosen_misconception_token` carried on each served choice and stored on
 * question_attempts) to a short, encouraging, kid-appropriate nudge that targets
 * THAT specific mistake — not a generic "the answer is N". Tokens are defined per
 * template in src/lib/mathTemplates.ts; every token there has an entry here (a
 * unit test asserts coverage so the two can't drift). Plain text only (rendered
 * as-is, no math/markdown). Returns null for an unknown/absent token so the
 * caller falls back to the plain verdict + worked solution.
 */
import { VERBAL_MISCONCEPTIONS } from '@/lib/prep/verbalMisconceptions'
import { ANALOGY_MISCONCEPTIONS } from '@/lib/prep/analogyMisconceptions'
import { SENTENCE_COMPLETION_MISCONCEPTIONS } from '@/lib/prep/sentenceCompletionMisconceptions'
import { NUMBER_SERIES_MISCONCEPTIONS } from '@/lib/prep/numberSeriesMisconceptions'
import { QUANT_COMPARE_MISCONCEPTIONS } from '@/lib/prep/quantCompareMisconceptions'
import { LOGIC_MISCONCEPTIONS } from '@/lib/prep/logicMisconceptions'
import { SAT_TRANSITIONS_MISCONCEPTIONS } from '@/lib/prep/satTransitionsMisconceptions'
import { SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS } from '@/lib/prep/satWordsInContextMisconceptions'

const EXPLANATIONS: Record<string, string> = {
  // Prep tokens — defined per template module in src/lib/prep/*Templates.ts.
  ...VERBAL_MISCONCEPTIONS,
  ...ANALOGY_MISCONCEPTIONS,
  ...SENTENCE_COMPLETION_MISCONCEPTIONS,
  ...NUMBER_SERIES_MISCONCEPTIONS,
  ...QUANT_COMPARE_MISCONCEPTIONS,
  ...LOGIC_MISCONCEPTIONS,
  ...SAT_TRANSITIONS_MISCONCEPTIONS,
  ...SAT_WORDS_IN_CONTEXT_MISCONCEPTIONS,

  // percent-of
  'overstated-the-percent':
    'Close! It looks like you used a percent a little higher than the one in the question. Re-read the percent, then take that much of the number.',
  'understated-the-percent':
    'Close! It looks like you used a percent a little lower than the one in the question. Re-read the percent, then take that much of the number.',
  'complement-instead-of-percent':
    'That is how much would be left over after taking the percent away. The question asks for the percent OF the number. Turn the percent into a fraction over 100 and multiply by the number.',
  'answered-the-percent':
    'That is the percent from the question, not the amount. Turn the percent into a fraction over 100, then multiply by the number.',

  // linear-equation-solve
  'forgot-to-divide':
    "You're almost there! That is the value of a times x. Now divide by the number in front of x to get x by itself.",
  'sign-error':
    'Watch the sign! It looks like a plus or minus flipped. When you move a number to the other side of the equals sign, its sign changes.',
  'mishandled-constant':
    'Good start! First move the constant to the other side (add or subtract it), and then divide.',

  // multiplication-basic
  'skip-count-error':
    'So close! That is one group off. Try counting one more (or one fewer) group of the number.',
  'off-by-one-factor':
    'Almost! That is like using one group too many. Multiply the exact two numbers shown.',
  'added-instead-of-multiplied':
    'It looks like you added the two numbers. This one asks you to multiply them. Think of it as counting equal groups.',

  // division-basic
  'quotient-too-high':
    'So close! That is a little too high. Ask yourself: how many times does the smaller number fit into the bigger one?',
  'quotient-too-low':
    'So close! That is a little too low. Count how many times the smaller number fits into the bigger one.',
  'subtracted-instead-of-divided':
    'It looks like you subtracted. This one asks you to divide. How many equal groups can you make?',
  'answered-the-divisor':
    'That is the number you are dividing by, not the answer. Try: how many of it fit into the total?',

  // fraction-of-number
  'numerator-too-high':
    'Close! That is a bit too much. Split the number into equal parts first, then take exactly the number of parts on top of the fraction.',
  'numerator-too-low':
    'So close! That is a bit too little. Take one more of the equal parts.',
  'part-size-too-small':
    'So close! Just a little low. Find the size of one part by dividing the number by the bottom of the fraction, then take the top-number of them.',
  'part-size-too-big':
    'So close! Just a little high. Find the size of one part by dividing the number by the bottom of the fraction, then take the top-number of them.',
  'used-the-other-part':
    'That is the other part of the whole. The top number of the fraction tells you how many parts to take. Count those.',
  'answered-the-whole':
    'That is the whole amount. The fraction asks for just part of it. Split it into equal parts first, then take some.',

  // rectangle-area
  'miscounted-a-row':
    'Almost! It looks like you counted one extra row. Multiply the exact length and width.',
  'miscounted-a-column':
    'Almost! It looks like you missed a column. Multiply the exact length and width.',
  'confused-area-perimeter':
    'That is the perimeter, the distance around the edge. Area is the space inside: multiply length times width.',

  // retired percent tokens (kept so pre-Stage-6 questions / historical attempts
  // still get a targeted explanation)
  'decimal-place-error':
    'Careful with the decimal. This answer is 10 times too big. A percent means out of 100, so divide by 100, not 10.',
  'halved-the-base':
    'Close! It looks like you divided by 50 instead of 100. A percent is always out of 100.',

  // ratios (ratio-scale)
  'inverted-the-ratio':
    'It looks like you swapped the two parts of the ratio. Match each number to the right color. The first number goes with the first color.',
  'ratio-scaled-too-far':
    'So close! That is one scale-step too high. Find how many times bigger the real count is, then use that same amount for the other part.',
  'ratio-scaled-too-short':
    'So close! That is one scale-step too low. Find how many times bigger the real count is, then use that same amount for the other part.',
  'added-instead-of-scaled':
    'Ratios and rates scale by multiplying, not adding. Find how many times bigger the amount is, then multiply the other part by that same number.',
  'answered-the-ratio-part':
    'That is just the number from the ratio. You still need to scale it up to match the real count.',

  // proportional-reasoning (proportion-scale)
  'rate-scaled-too-far':
    'So close! A little too high. Find the amount for one first, then multiply by how many you need.',
  'rate-scaled-too-short':
    'So close! A little too low. Find the amount for one first, then multiply by how many you need.',
  'answered-the-total':
    'That is the amount you started with. Find the amount for just one first, then scale up to the new number.',
  'answered-the-unit-rate':
    'That is the amount for just one. Multiply it by how many you need.',

  // data-analysis (mean-from-total)
  'mean-too-high':
    'So close! A little high. The mean is the total shared equally: total divided by the number of games.',
  'mean-too-low':
    'So close! A little low. The mean is the total shared equally: total divided by the number of games.',
  'forgot-to-divide-total':
    'That is the total. To get the mean, share it equally: divide the total by the number of games.',
  'answered-the-count':
    'That is the number of games, not the average. Divide the total points by the number of games.',

  // --- Phase 3 tiered math (tieredMathTemplates.ts) --------------------------
  // The hard tiers ask a child to reason BACKWARDS from a result, so their
  // misconceptions are about direction, not arithmetic slips.

  // multiplication, near-miss group counting
  'counted-an-extra-group':
    'Almost! That is one whole group too many. Count out exactly the number of groups the question asks for.',
  'missed-a-group':
    'So close! That is one group short. Count out exactly the number of groups the question asks for.',

  // multiplication, unknown factor (3.OA.A.4)
  'answered-the-product':
    'That is the total already shown in the question. The box is one of the two numbers being multiplied. How many groups make that total?',
  'answered-the-known-factor':
    'That is the number already shown next to the box. The box is the other one. How many of that number make the total?',

  // fractions, recovering the whole (3.NF)
  'scaled-the-part-not-the-unit':
    'Careful! That grew the part instead of the single piece. Find one piece first by dividing, then build the whole from those pieces.',
  'answered-one-part':
    'That is the size of just one equal piece. The question asks for the whole thing, so you need all of the pieces.',
  'answered-the-part':
    'That is the amount the question already gave you. It is only part of the whole. Work back to find the whole number.',
  'answered-the-denominator':
    'That is the bottom number of the fraction, which tells you how many equal parts to make. Now find how big one of those parts is.',

  // percentages, finding the whole (6.RP.A.3.C)
  'took-the-percent-again':
    'It looks like the percent was applied a second time. Here you already have the part, so work backwards to find the whole.',

  // data analysis, working back from a mean (6.SP)
  'answered-the-mean':
    'That is the average, not the missing game. Find the season total first, then take away the points already counted.',
  'subtracted-the-mean-instead':
    'Close thinking, but that took away one average instead of the games already played. Work out the season total, then subtract the points so far.',
  'dropped-one-game':
    'That is the season total with one average game removed. Subtract the points actually scored in the earlier games instead.',

  // expressions / algebra (evaluate a*x + b, a*x + b*y)
  'wrong-order-of-operations':
    'Careful with the order. Multiply before you add. Work out the times part first, then add the extra number.',
  'dropped-the-constant':
    'So close! It looks like you left off the number being added at the end. Do the multiply, then add it back.',
  'coefficient-too-high':
    'So close! Just a little high. Double-check the number in front of the variable and multiply by exactly that.',
  'coefficient-too-low':
    'So close! Just a little low. Double-check the number in front of the variable and multiply by exactly that.',
  'added-the-coefficient':
    'It looks like you added the number in front instead of multiplying. "3x" means 3 times x.',
  'doubled-the-constant':
    'Close! It looks like the number on the end got added twice. Add it just once.',
  'swapped-the-variables':
    'It looks like the two numbers in front got matched to the wrong variables. Keep each one with its own letter.',
  'dropped-a-term':
    'So close! It looks like one whole term was left out. Work out both parts, then add them together.',
  'added-everything':
    'It looks like all the numbers were added. Multiply each variable by its own number first, then add those results.',

  // functions / advanced functions (evaluate x^2 + b, a*x^2 + c)
  'multiplied-instead-of-squared':
    'Squaring means the number times itself, not times 2. For example, $5^2 = 5 \\times 5 = 25$, not $10$.',
  'base-too-high':
    'So close! A little high. Square exactly the number given, not one more than it.',
  'base-too-low':
    'So close! A little low. Square exactly the number given, not one less than it.',
  'squared-the-coefficient':
    'Only the variable is squared, not the number in front. Square the variable first, then multiply by the number.',

  // hs-geometry (triangle area)
  'forgot-to-halve':
    'That is the whole rectangle. A triangle is half of it, divide base times height by 2.',
  'base-too-short':
    'So close! A little low. Use the exact base length, then take half of base times height.',
  'base-too-long':
    'So close! A little high. Use the exact base length, then take half of base times height.',
  'height-too-tall':
    'So close! A little high. Use the exact height, then take half of base times height.',

  // algebra-2 (solve x^2 = k)
  'answered-the-square':
    'That is the number being squared, not x. You need the number that, times itself, gives it.',
  'root-too-high':
    'So close! A little high. Find the number that multiplied by itself gives exactly that value.',
  'root-too-low':
    'So close! A little low. Find the number that multiplied by itself gives exactly that value.',
  'doubled-the-root':
    'To undo a square you take the square root, not divide the exponent to get double. Find the number whose square is given.',
  'root-way-too-high':
    'That is too big, the number times itself would be much larger than the value shown. Try a smaller number.',

  // grammar — subject-verb agreement
  'agreed-with-nearby-noun':
    'Careful! The verb should match the real subject, not the closest noun. Find who or what is doing the action, then match the verb to that.',
  'plural-verb-for-singular':
    'The subject here is singular, so it needs a singular verb. A plural verb form does not match.',
  'treated-collective-as-plural':
    'A group word like "committee" or "team" acting as one unit is singular, match it with a singular verb.',
  'singular-for-compound-subject':
    'Two subjects joined by "and" make a plural subject, so use the plural verb.',
  'nonfinite-verb':
    "That is an \"-ing\" form, which can't be the main verb by itself, it would leave the sentence unfinished. Use a complete verb.",
  'used-infinitive':
    'That is the "to ___" form, which can\'t serve as the main verb here. Use a verb that matches the subject.',
  'singular-verb-for-plural':
    'The subject here is plural, so it needs a plural verb. A singular verb form does not match.',
  'matched-farther-subject':
    'With "neither … nor" or "either … or," the verb agrees with the subject CLOSER to it, not the one farther away. Match the verb to the nearer subject.',
  'treated-unit-as-plural':
    'This subject names a single thing or amount (like one dish, or one sum of money), so it takes a singular verb even though it looks plural or is joined by "and."',

  // grammar — punctuation
  'missing-comma':
    'A comma is needed here, after an introductory part, or to separate items, so the sentence reads clearly.',
  'comma-splice':
    "A comma alone can't join two complete sentences (that's a comma splice). Use a period or a semicolon, or add a joining word.",
  'run-on':
    'Two complete sentences are run together with no punctuation. Separate them with a period or a semicolon.',
  'unnecessary-comma':
    'No comma belongs here, the "and" is joining two actions of the same subject, not two separate sentences.',
  'semicolon-misused':
    "A semicolon joins two complete sentences. It doesn't belong here, a comma or a period fits instead.",
  'period-creates-fragment':
    "A period here leaves a piece that isn't a complete sentence (a fragment). Keep it connected with a comma.",
  'question-mark-for-indirect-question':
    "This sentence only reports a question (\"wondered whether…\"); it's a statement, so it ends with a period, not a question mark.",
  'exclamation-misuse':
    "An exclamation point is for strong emphasis, which doesn't fit a plain statement like this. End it with a period.",
  'missing-end-punctuation':
    'Every sentence needs end punctuation, this one should finish with a period.',
  'missing-question-mark':
    'This sentence asks a direct question, so it must end with a question mark, not a period.',
  'comma-splits-subject-verb':
    'No comma belongs between a subject and its verb, a comma here wrongly splits the main parts of the sentence.',
  'unneeded-restrictive-comma':
    'This clause is essential, it identifies which one, so it should NOT be set off with a comma.',

  // grammar — sentence structure / boundaries
  'creates-a-fragment':
    "That leaves an incomplete sentence (a fragment). Make sure the sentence has a subject and a complete main verb.",
  'colon-needs-complete-clause':
    'A colon does not join two complete sentences, use a period or semicolon there instead.',
  'comma-in-complex-list':
    'When the items in a list already contain commas, separate the items with semicolons so the list stays clear.',
  'comma-where-colon-needed':
    'A comma cannot introduce a list or explanation after a complete clause, a colon does that job.',
  'missing-colon':
    'A complete clause that introduces a list or explanation needs a colon before it.',
  'unpaired-dash':
    'A dash that sets off an aside in the middle of a sentence needs a matching partner, use a pair of dashes, or a pair of commas, not one lone dash.',
  'colon-after-incomplete-clause':
    'A colon must follow a complete sentence. It can\'t come right after a verb, a preposition, or a phrase like "such as."',

  // grammar — pronouns
  'pronoun-matches-nearby-noun':
    'Match the pronoun to the noun it actually replaces, not just the closest noun in the sentence.',
  'pronoun-number-mismatch':
    'A pronoun must match its noun in number, singular with singular, plural with plural.',
  'wrong-pronoun-case':
    "Check the pronoun's job: subject pronouns (I, he, they, who) and object pronouns (me, him, them, whom) are not interchangeable.",
  'wrong-pronoun-type':
    'That is the wrong kind of pronoun for this spot. Use the one that fits the noun and its role in the sentence.',
  'reflexive-misuse':
    'A "-self" pronoun (myself, himself) is only for pointing back to the subject, it is not a fancy way to say "me" or "I."',
  'which-for-person':
    'Use "who" or "whom" for a person, not "which" (which is for things).',
  'contraction-for-possessive':
    'That is a contraction (it\'s = "it is," they\'re = "they are," who\'s = "who is"), but a possessive is needed here.',
  'wrong-word-homophone':
    'That word sounds the same but means something different (there = a place, their = belonging to them). Pick the one that fits.',
  'vague-pronoun-reference':
    'This pronoun does not clearly point to one specific noun, so the reference is unclear. Name the thing directly instead.',

  // grammar — verb tense/form
  'wrong-tense-for-context':
    'The time clues in the sentence call for a different tense here.',
  'verb-tense-shift':
    'Keep the tense consistent, this verb jumps to a different time than the rest of the sentence.',
  'wrong-past-participle':
    'That is not the correct past form of the verb. After "has," "have," or "had," use the past participle (for example, "gone," not "went").',
  'nonstandard-past-tense':
    'That is not the standard past-tense form of the verb. Use the correct simple past (for example, "fell," not "falled").',
  'subjunctive-error':
    'A hypothetical "if" statement uses the subjunctive "were," not "was", for example, "if it were open."',

  // grammar — possessives & apostrophes
  'possessive-missing-apostrophe':
    'To show possession, add an apostrophe, a plain word without one just names the thing, it does not own anything.',
  'wrong-possessive-form':
    'Check singular vs. plural ownership: one owner takes ’s, and more than one owner takes s’.',
  'apostrophe-in-plural':
    'A plain plural (more than one) does not take an apostrophe, an apostrophe here wrongly signals possession.',
  'extra-apostrophe':
    'That has an extra apostrophe. A possessive needs just one, in the right spot.',
  'whos-whose-confusion':
    '"Whose" shows possession; "who\'s" means "who is." This spot needs the possessive.',
  'wrong-number-noun':
    'Check whether the noun should be singular or plural here, the sentence calls for the other one.',
  'possessive-for-contraction':
    'This spot needs a contraction (it\'s = "it is"), but a possessive was used instead. Read it back as the two full words to check.',
  'wrong-joint-possession':
    'When two people own one thing together, only the LAST name takes the apostrophe (Mia and Carlos\'s bakery); when they own things separately, EACH name does.',

  // grammar — modifier placement
  'dangling-modifier':
    'The opening description has nothing sensible to attach to, the thing right after it cannot do what the phrase describes. Start the main part with the person or thing being described.',
  'illogical-modifier-subject':
    'An opener like "it" or "there" cannot be what the opening phrase describes. Begin the main clause with the real doer.',
  'wrong-subject-for-modifier':
    "The opening phrase should describe the sentence's subject, but here the subject is an -ing action or the wrong noun. Start with who or what the phrase is really about.",

  // reading — comprehension (passage-based). Shared across all reading skills so
  // Stage-4 explanations stay coherent.
  'contradicts-text':
    'That choice goes against what the passage actually says. Look back for the exact line, the right answer agrees with the text, not against it.',
  'unsupported-inference':
    'That may sound reasonable, but the passage does not give enough to support it. Pick the choice the text actually backs up.',
  'plausible-but-unstated':
    'That could be true in real life, but the passage never says it. Answer only from what is on the page.',
  'out-of-scope':
    'That brings in something the passage never discusses. Stay with the topic the text actually covers.',
  'too-broad':
    'That choice claims more than the passage supports, a word like "all," "always," or "only" often gives it away. Match the size of the claim to the text.',
  'too-narrow':
    'That is just one small detail, not the overall point. The main idea covers what the whole passage is about.',
  'detail-not-main-idea':
    'That is a true detail from the passage, but it is not the main point. Ask what the passage is mostly about.',
  'reverses-relationship':
    'That choice flips the cause and effect (or the comparison) around. Check which thing leads to which in the passage.',
  'wrong-evidence':
    'That fact does not actually support the claim in question. Find the choice that directly backs up the specific point.',
  'partly-right':
    'Part of that choice matches the passage, but another part does not. The best answer has to be right the whole way through.',
  'misreads-tone':
    "That misjudges the author's attitude. Notice the words that signal how the author feels about the topic.",
  'wrong-word-meaning':
    'That is a common meaning of the word, but not the way it is used here. Reread the sentence and pick the meaning that fits this context.',

  // math — grade-3 place value (3.NBT). Kid-friendly, one idea each.
  'used-digit-not-value':
    "That is the digit by itself, not what it's worth. A digit's value depends on its place, the 7 in 70 is worth 70, not 7.",
  'used-value-not-digit':
    'The question asks for the digit, one number from 0 to 9, not its value. The digit is 8; 800 is what it is worth.',
  'wrong-place-named':
    'That digit is in a different place. Count the places from the right: ones, tens, hundreds.',
  'read-wrong-digit':
    'That is a different digit in the number. Find the one the question is asking about.',
  'miscounted-place':
    'Careful counting the places. You are off by one. Line up ones, then tens, then hundreds, starting from the right.',
  'place-value-off-by-one':
    'So close! That is one place too big or too small. Each place to the left is worth ten times more.',
  'digits-reversed':
    'The digits got turned around. Keep them in order. The digit on the left has the biggest value.',
  'kept-the-zeros':
    'When you put the parts together, the zeros overlap, do not write them all out. 300 + 6 is 306, not 3,006.',
  'ignored-zero-placeholder':
    'Do not skip the zero, it holds a place. Without it, the other digits slide into the wrong spots.',
  'zero-place-misread':
    'A zero in a place means there are none of that place, it is worth 0, not 10. It just holds the spot.',
  'added-the-parts':
    'It looks like you added the digits or the group counts. Put each part in its place instead of adding them together.',
  'forgot-the-zero':
    'When you multiply by tens, keep the ten: 3 times 40 is 12 tens, which is 120, not 12.',
  'extra-zero':
    'That has one too many zeros. Multiply by the tens once, not twice.',
  'added-to-wrong-place':
    'You changed the wrong place. "100 more" changes the hundreds digit, not the tens or ones.',
  'wrong-amount-changed':
    'That changes the number by the wrong amount, like adding 1 instead of 10, or 10 instead of 100. Match the size to what is being added.',
  'subtracted-instead':
    'It looks like you went the wrong way, that is less, but the question asks for more (or the other way around).',
  'compared-wrong-place':
    'Compare the biggest place first. Only move to the next place when those digits are the same.',
  'thought-equal':
    'Those numbers are not equal, the same digits in different places make different numbers.',
  'picked-smallest':
    'That is actually the smallest one. Check again which has the most in the biggest place.',
  'no-change':
    'That is just the number you started with. The question asks how many of a place, so do the step.',
  'treated-extra-tens-as-digits':
    'You can have more than 9 of a place, 12 tens is 120, not the digits "12." Regroup it into hundreds and tens.',
  'counted-by-tens':
    'That counts by tens, but this pattern jumps by hundreds, change the hundreds digit each time.',

  // math — rounding (3.NBT.A.1)
  'rounded-wrong-way':
    'Check the digit to the right: 5 or more rounds up, 4 or less rounds down. It looks like you went the other way.',
  'rounded-to-wrong-place':
    'That is rounded to a different place. Round to the place the question names, the nearest ten, or the nearest hundred.',
  'kept-original-number':
    'That is the number you started with. Rounding means changing it to the nearest ten or hundred.',
  'rounded-wrong-digit':
    'Look at the digit just to the RIGHT of the place you are rounding to, that is the one that decides up or down.',

  // math — multi-digit add/subtract (3.NBT.A.2, 4.NBT.B.4)
  'forgot-to-regroup':
    'When a column adds to 10 or more, carry the extra to the next place. It looks like the carry got left out.',
  'subtracted-smaller-from-larger':
    'You can’t just take the smaller digit from the larger in each column, regroup (borrow) from the next place instead.',
  'regrouped-wrong':
    'The regrouping (carrying or borrowing) slipped. Redo it one column at a time, right to left.',
  'added-instead-of-subtracted':
    'It looks like you added. This one asks you to subtract, take away, don’t combine.',
  'subtracted-instead-of-added':
    'It looks like you subtracted. This one asks you to add, combine the amounts.',

  // math — multi-digit multiplication (4.NBT.B.5)
  'partial-product-error':
    'Multiply by each place and add the parts. It looks like one of the partial products (like the tens) was missed or misplaced.',

  // math — long division (4.NBT.B.6)
  'remainder-ignored':
    'There is a remainder left over, don’t drop it. Check what is left after the last full group.',
  'remainder-too-big':
    'The remainder must be smaller than the divisor. If it isn’t, another group fits, bump the quotient up.',
  'quotient-digit-off':
    'One digit of the quotient is off by one. Check how many times the divisor fits at each step.',
  'multiplied-instead-of-divided':
    'It looks like you multiplied. This one asks how many equal groups fit, that’s division.',

  // math — fractions: equivalence & comparison (4.NF.A)
  'not-equivalent':
    'Those fractions are not equal. To make an equivalent fraction, multiply (or divide) the top AND bottom by the same number.',
  'multiplied-only-numerator':
    'You changed only the top. To keep the same value, multiply the top and bottom by the same number.',
  'multiplied-only-denominator':
    'You changed only the bottom. To keep the same value, multiply the top and bottom by the same number.',
  'compared-numerators-only':
    'You looked only at the top numbers. With different bottoms, the size of each piece changes, compare with a common denominator or a picture.',
  'bigger-denominator-bigger':
    'A bigger bottom number means smaller pieces, not a bigger fraction. More pieces to make a whole means each piece is tinier.',

  // math — fractions: add/subtract (like: 4.NF.B; unlike: 5.NF.A)
  'added-the-denominators':
    'Keep the bottom the same, it tells the size of the pieces. Add only the top numbers.',
  'kept-wrong-denominator':
    'The denominator (bottom) names the piece size and stays the same when the pieces are equal. Don’t change it while adding the tops.',
  'no-common-denominator':
    'You can only add or subtract fractions when the pieces are the same size. Rename them to a common denominator first.',
  'added-across':
    'Don’t add straight across (top+top and bottom+bottom). Give them a common denominator, then add just the tops.',

  // math — fractions: multiply/divide (5.NF.B)
  'cross-multiplied':
    'To multiply fractions, go straight across: top times top, bottom times bottom. No cross-multiplying here.',
  'forgot-to-invert':
    'To divide by a fraction, flip the second fraction and multiply. It looks like it wasn’t flipped.',

  // math — decimals: place value & comparison (5.NBT.A)
  'compared-decimals-as-wholes':
    'Line up the decimal points and compare place by place. 0.5 is bigger than 0.45 even though 45 looks larger.',
  'longer-decimal-is-bigger':
    'More digits after the point does not mean a bigger number. Compare tenths first, then hundredths.',
  'wrong-decimal-place-value':
    'Name the place carefully: the first digit after the point is tenths, the next is hundredths.',

  // math — decimals: operations (5.NBT.B.7)
  'misaligned-decimals':
    'Line up the decimal points before adding or subtracting, so tenths go under tenths.',
  'wrong-number-of-decimal-places':
    'When multiplying decimals, count the total decimal places in both factors, the product has that many.',

  // math — measurement, data & time (3.MD, 4.MD)
  'read-clock-wrong':
    'Read the hour hand and the minute hand carefully, the short hand is the hour, the long hand the minutes.',
  'elapsed-time-miscount':
    'Count the hours and minutes from the start to the end time, it’s easy to be off by an hour or by some minutes.',
  'wrong-measure-unit':
    'Check the unit the question asks for (like grams vs kilograms, or minutes vs hours) and match it.',
  'misread-the-graph':
    'Read the graph carefully, line each bar or picture up with the scale to get the right amount.',
  'wrong-scale':
    'Notice the scale: each step on this graph stands for more than one, so count by that amount.',

  // math — geometry: shapes, lines, angles (3.G, 4.G, 4.MD.C)
  'wrong-shape-name':
    'Count the sides and check the angles, that name belongs to a different shape.',
  'miscounted-sides':
    'Recount the sides or corners carefully; the count is off by one.',
  'wrong-attribute':
    'That is a property of a different shape. Match the shape to the attribute the question describes.',
  'not-a-right-angle':
    'A right angle is a square corner (90 degrees). That angle is bigger or smaller than a square corner.',
  'confused-lines-rays-segments':
    'A line goes on forever both ways, a ray starts at a point and goes one way, and a segment has two endpoints. Check which this is.',
  'wrong-symmetry-count':
    'A line of symmetry folds the shape onto itself exactly. Recount how many folds work.',
  'wrong-angle-type':
    'Sort by size: less than a square corner is acute, a square corner is right, more than that is obtuse.',

  // math — volume (5.MD.C)
  'confused-volume-with-area':
    'Area covers a flat surface (length times width). Volume fills a solid, multiply length times width times height.',
  'added-the-dimensions':
    'To find volume, MULTIPLY length, width, and height, don’t add them.',
  'used-only-two-dimensions':
    'That only used two dimensions. Volume needs all three: length times width times height.',

  // math — coordinate plane (5.G.A)
  'reversed-coordinates':
    'Read the pair in order: the first number is across (x), the second is up (y). It looks like they got switched.',
  'counted-from-wrong-axis':
    'Start at 0 (the origin) and count across first, then up. Check which axis you started counting on.',
  'off-by-one-on-grid':
    'Recount the grid lines from 0, the count is off by one.',

  // math — numerical expressions / order of operations (5.OA.A)
  'ignored-the-parentheses':
    'Do the part inside the parentheses FIRST, then the rest.',
  'went-left-to-right':
    'Order of operations, not just left to right: handle parentheses, then multiply/divide, then add/subtract.',
  // NOTE: K–2 pre-reader items (see preReaderTemplates.ts) intentionally carry NO
  // misconception tokens — a wrong tap gets a warm "let's count together" spoken
  // from the item's solution, not a diagnostic nudge.
}

/**
 * A targeted, encouraging explanation for the misconception behind a wrong
 * answer, or null when the token is absent/unknown (caller shows the generic
 * verdict + solution instead).
 */
export function explainMisconception(token: string | null | undefined): string | null {
  if (!token) return null
  return EXPLANATIONS[token] ?? null
}
