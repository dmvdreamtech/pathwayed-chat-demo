import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { ReviewItem } from '@/lib/contentReview'

vi.mock('@/lib/voice', () => ({ speakWithNikki: vi.fn() }))
vi.mock('@/lib/supabase', () => ({ supabase: {} }))

const { PictureItem, QueueView } = await import('./ContentReview')

describe('the review page lists new skills and live fixes separately', () => {
  it('puts the skill list under its own heading, with the live fixes in a section below it', () => {
    const row = { skillId: 's1', slug: 's1', name: 'Shapes', subject: 'math', grade: 0, drafts: 40, draftsFailing: 0, state: 'none' as const, openReviewId: null, lastReviewer: null, lastDecidedAt: null }
    const html = renderToStaticMarkup(<QueueView rows={[row]} name="Phil" onOpen={() => {}} onFixes={() => {}} />)
    const skills = html.indexOf('Review new skills')
    const table = html.indexOf('<table')
    const fixes = html.indexOf('Review fixes to live questions')
    expect(skills).toBeGreaterThan(-1)
    expect(table).toBeGreaterThan(skills)
    expect(fixes).toBeGreaterThan(html.indexOf('</table>'))
    // The table scrolls inside its own box instead of running past the panel.
    expect(html).toMatch(/class="staff-table-scroll"><table/)
    expect(html).toContain('Open sample')
    expect(html).toContain('Open the fixes')
  })
})

const item = (choices: ReviewItem['choices'], prompt: ReviewItem['prompt'] = null): ReviewItem => ({
  id: 'q1',
  stem: 'Which one barks? Tap the picture.',
  choices,
  correctAnswer: 'dog',
  solution: 'A dog says woof.',
  difficulty: 'easy',
  renderMode: 'audio_picture',
  prompt,
  passageTitle: null,
  passageBody: null,
  issues: [],
  lastFlag: null,
})
const pic = (image: string, correct = false) => ({
  text: image,
  correct,
  misconception: null,
  tile: { kind: 'object_group' as const, image, count: 1 },
})

describe('the review page shows a K-2 picture item as the child gets it', () => {
  it('starts with no key and no tile labels, and shows the full line Nikki says', () => {
    const html = renderToStaticMarkup(<PictureItem item={item([pic('dog', true), pic('cat')])} />)
    expect(html).not.toContain('correct')
    expect(html).not.toContain('(key)')
    expect(html).toContain('Which one barks? Tap the picture. Your choices are: dog, cat.')
    expect(html).toContain('Play the question')
    expect(html).toContain('Show the key')
    // Two tiles, drawn by the same figure the child sees, in the practice card.
    expect(html.match(/class="picq-tile ?"/g)?.length).toBe(2)
    expect(html).toContain('practice-q')
    expect(html).not.toContain('kid-screen')
  })
  it('keeps word tiles silent in the spoken line', () => {
    const word = (w: string, correct = false) => ({ text: w, correct, misconception: null, tile: { kind: 'word' as const, value: w } })
    const html = renderToStaticMarkup(<PictureItem item={{ ...item([word('the', true), word('and')]), stem: 'Tap the word: the.' }} />)
    expect(html).toContain('Nikki says: <i>Tap the word: the.</i>')
  })
})
