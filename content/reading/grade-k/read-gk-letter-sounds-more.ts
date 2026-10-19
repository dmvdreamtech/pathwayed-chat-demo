import type { ContentChoice, ContentSkill, PictureTile } from '../../types'

const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const ltr = (v: string, correct = false): ContentChoice => ({ text: v, is_correct: correct, tile: { kind: 'letter', value: v } })
const one = (image: string): PictureTile => ({ kind: 'object_group', image, count: 1 })

const skill: ContentSkill = {
  slug: 'read-gk-letter-sounds-more',
  subject: 'reading',
  grade: 0,
  group: 'Vocabulary and word study',
  name: 'Letter Sounds',
  standards: ['RF.K.3'],
  renderMode: 'audio_picture',
  extends: 'letter-sounds',
  topUpItems: 12,
  items: [
    {
      slot: 1, difficulty: 'easy',
      stem: 'Listen: fan. Which letter does fan start with? Tap the letter.',
      prompt: one('fan'),
      choices: [ltr('F', true), ltr('M'), ltr('D')],
      solution: 'Fan starts with fff. The letter F makes the fff sound. Fff, fan!',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: 'Listen: dog. Which letter does dog start with? Tap the letter.',
      prompt: one('dog'),
      choices: [ltr('D', true), ltr('S'), ltr('M')],
      solution: 'Dog starts with the letter D. Listen: dog, dig, dot. They all start with the same sound, the sound of D.',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: 'Tap the picture that starts with the letter M.',
      prompt: null,
      choices: [pic('mop', true), pic('rug'), pic('bib')],
      solution: 'The letter M makes the mmm sound. Mmm, mop! Mop starts with M.',
    },
    {
      slot: 4, difficulty: 'easy',
      stem: 'Listen: lamp. Which letter does lamp start with? Tap the letter.',
      prompt: one('lamp'),
      choices: [ltr('L', true), ltr('S'), ltr('N')],
      solution: 'Lamp starts with lll. The letter L makes the lll sound. Lll, lamp!',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: 'Tap the picture that starts with the letter R.',
      prompt: null,
      choices: [pic('rug', true), pic('fin'), pic('pan')],
      solution: 'The letter R makes the rrr sound. Rrr, rug! Rug starts with R.',
    },
    {
      slot: 6, difficulty: 'medium',
      stem: 'Listen: bed. Which letter does bed start with? Tap the letter.',
      prompt: one('bed'),
      choices: [ltr('B', true), ltr('M'), ltr('S')],
      solution: 'Bed starts with the letter B. Listen: bed, bat, bus. They all start with the same sound, the sound of B.',
    },
    {
      slot: 7, difficulty: 'medium',
      stem: 'Listen: wig. Which letter does wig start with? Tap the letter.',
      prompt: one('wig'),
      choices: [ltr('W', true), ltr('H'), ltr('S')],
      solution: 'Wig starts with the letter W. Listen: wig, web, worm. They all start with the same sound, the sound of W.',
    },
    {
      slot: 8, difficulty: 'medium',
      stem: 'Tap the picture that starts with the letter N.',
      prompt: null,
      choices: [pic('nut', true), pic('log'), pic('lid')],
      solution: 'The letter N makes the nnn sound. Nnn, nut! Nut starts with N.',
    },
    {
      slot: 9, difficulty: 'medium',
      stem: 'Listen: egg. Which letter does egg start with? Tap the letter.',
      prompt: one('egg'),
      choices: [ltr('E', true), ltr('A'), ltr('U')],
      solution: 'Egg starts with the letter E. Listen: egg, elbow, end. They all start with the same sound, the sound of E.',
    },
    {
      slot: 10, difficulty: 'hard',
      stem: 'Listen: pin. What sound do you hear in the middle of pin? Tap the letter that makes that sound.',
      prompt: one('pin'),
      choices: [ltr('I', true), ltr('A'), ltr('O')],
      solution: 'Pin has the same middle sound as pig and lid. The letter I makes that sound, so pin has an I in the middle.',
    },
    {
      slot: 11, difficulty: 'hard',
      stem: 'Listen: umbrella. Which letter does umbrella start with? Tap the letter.',
      prompt: one('umbrella'),
      choices: [ltr('U', true), ltr('I'), ltr('E')],
      solution: 'Umbrella starts with the letter U. Listen: umbrella, up, under. They all start with the same sound, the sound of U.',
    },
    {
      slot: 12, difficulty: 'hard',
      stem: 'Listen: tub. What sound do you hear in the middle of tub? Tap the letter that makes that sound.',
      prompt: one('tub'),
      choices: [ltr('U', true), ltr('A'), ltr('I')],
      solution: 'Tub has the same middle sound as bus and mug. The letter U makes that sound, so tub has a U in the middle.',
    },
  ],
}

export default skill
