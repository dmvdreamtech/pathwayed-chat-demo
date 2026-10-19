import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { KidIcon } from '@/components/KidIcon'
import { PictureFigure } from '@/components/PictureFigure'
import { EXTRA_ICONS } from '@/components/kidIcons'
import { KID_IMAGES } from './kidImages'
import { parsePicturePrompt, parsePictureTile, pictureIssues, type PicturePrompt, type PictureTile } from './pictureModel'

describe('the K-2 picture set', () => {
  it('draws every name in KID_IMAGES', () => {
    const missing = KID_IMAGES.filter((n) => !renderToStaticMarkup(<KidIcon name={n} />).includes('<svg'))
    expect(missing).toEqual([])
  })
  it('has no drawing without a name', () => {
    const names = new Set<string>(KID_IMAGES)
    expect(Object.keys(EXTRA_ICONS).filter((n) => !names.has(n))).toEqual([])
  })
  it('lists each name once', () => {
    expect(new Set(KID_IMAGES).size).toBe(KID_IMAGES.length)
  })
})

describe('picture tiles and prompts', () => {
  const tiles: PictureTile[] = [
    { kind: 'number', value: '7' },
    { kind: 'letter', value: 'b' },
    { kind: 'word', value: 'the' },
    { kind: 'word', value: 'The dog ran fast.' },
    { kind: 'object_group', image: 'apple', count: 3 },
    { kind: 'clock', hour: 3, minute: 30 },
    { kind: 'base_ten', tens: 4, ones: 6 },
    { kind: 'base_ten', hundreds: 2, tens: 0, ones: 5 },
    { kind: 'array', image: 'star', rows: 2, cols: 4 },
    { kind: 'fraction', shape: 'circle', parts: 4, shaded: 1 },
    { kind: 'fraction', shape: 'rectangle', parts: 2, shaded: 1, equal: false },
    { kind: 'measure', image: 'pencil', units: 6 },
  ]
  it('parses back every kind the app draws, and each one renders', () => {
    for (const t of tiles) {
      expect(parsePictureTile(JSON.parse(JSON.stringify(t)))).toEqual(t)
      expect(pictureIssues(t, 'tile')).toEqual([])
      expect(renderToStaticMarkup(<div className="kid-screen"><PictureFigure figure={t} place="tile" /></div>).length).toBeGreaterThan(40)
    }
  })
  it('accepts a picture graph prompt and a word prompt', () => {
    const rows: PicturePrompt = { kind: 'object_rows', rows: [{ image: 'cat', count: 3 }, { image: 'dog', count: 5 }] }
    expect(parsePicturePrompt(rows)).toEqual(rows)
    expect(parsePicturePrompt({ kind: 'word', value: 'cat' })).toEqual({ kind: 'word', value: 'cat' })
    expect(renderToStaticMarkup(<PictureFigure figure={rows} place="prompt" />)).toContain('picq-row')
  })
  it('refuses pictures the app cannot draw', () => {
    expect(pictureIssues({ kind: 'object_group', image: 'unicorn', count: 2 }, 'tile')[0]).toContain('not in KID_IMAGES')
    expect(pictureIssues({ kind: 'clock', hour: 13, minute: 0 }, 'tile')).not.toEqual([])
    expect(pictureIssues({ kind: 'fraction', shape: 'circle', parts: 4, shaded: 5 }, 'tile')).not.toEqual([])
    expect(pictureIssues({ kind: 'number', value: '3' }, 'prompt')).not.toEqual([])
    expect(pictureIssues({ kind: 'word', value: 'x'.repeat(61) }, 'tile')).not.toEqual([])
  })
  it('still reads the live items', () => {
    expect(parsePictureTile({ kind: 'object_group', image: 'apple', count: 3 })).toEqual({ kind: 'object_group', image: 'apple', count: 3 })
    expect(parsePicturePrompt({ kind: 'object_group', image: 'cat', count: 1 })).toEqual({ kind: 'object_group', image: 'cat', count: 1 })
  })
})

describe('what the app says for a picture item', () => {
  it('names single pictures, and keeps symbols, counts and drawings silent', async () => {
    const { spokenPictureItem } = await import('./pictureModel')
    const pic = (t: string) => ({ text: t, tile: { kind: 'object_group' as const, image: t, count: 1 } })
    expect(spokenPictureItem('Which one barks?', [pic('dog'), pic('cat')])).toBe('Which one barks? Your choices are: dog, cat.')
    expect(spokenPictureItem('Tap the word the.', [{ text: 'the', tile: { kind: 'word', value: 'the' } }, { text: 'and', tile: { kind: 'word', value: 'and' } }])).toBe('Tap the word the.')
    expect(spokenPictureItem('Tap the group of 3.', [{ text: '3', tile: { kind: 'object_group', image: 'apple', count: 3 } }, { text: '4', tile: { kind: 'object_group', image: 'apple', count: 4 } }])).toBe('Tap the group of 3.')
    expect(spokenPictureItem('Tap 25.', [{ text: 'two tens and five ones', tile: { kind: 'base_ten', tens: 2, ones: 5 } }])).toBe('Tap 25.')
  })
})
