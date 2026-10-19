/**
 * Every picture a K-2 item may show. Each name is one hand-drawn inline SVG,
 * in KidIcon.tsx (the first set) or src/components/kidIcons/ (the rest). A test
 * (kidImages.test.ts) checks that every name here has a drawing and every drawing
 * has a name, so content can only use pictures the app can draw.
 */
export const KID_IMAGES = [
  // The first set (live items).
  'apple', 'star', 'ball', 'flower', 'duck', 'fish',
  'cat', 'gift', 'hat', 'key', 'leaf', 'moon', 'pig', 'ring', 'sun', 'tree', 'van',
  'house', 'cap', 'bus', 'door', 'jet', 'net', 'web', 'yoyo', 'sock', 'mug', 'pot', 'kite', 'tent',
  'circle', 'square', 'triangle', 'rectangle', 'oval', 'diamond', 'hexagon', 'heart',
  'penny', 'nickel', 'dime', 'quarter',
  // Animals.
  'dog', 'cow', 'horse', 'sheep', 'goat', 'hen', 'frog', 'bird', 'bear', 'lion', 'mouse', 'rabbit',
  'turtle', 'snake', 'owl', 'ant', 'bug', 'crab', 'fox', 'monkey', 'elephant', 'butterfly', 'whale', 'worm',
  // Food and kitchen.
  'banana', 'carrot', 'egg', 'cake', 'cookie', 'pie', 'milk', 'bread', 'cheese', 'corn', 'grapes', 'orange',
  'pear', 'lemon', 'cupcake', 'pizza', 'sandwich', 'jam', 'nut', 'acorn', 'bowl', 'spoon', 'cup', 'jar',
  // Home.
  'bed', 'chair', 'table', 'book', 'box', 'bag', 'bell', 'lamp', 'alarm_clock', 'shoe', 'comb', 'brush',
  // Clothes and things that go.
  'shirt', 'dress', 'coat', 'mitten', 'umbrella', 'glasses', 'car', 'bike', 'train', 'plane', 'boat', 'truck',
  // Play and tools.
  'drum', 'pen', 'pencil', 'crayon', 'bat', 'top', 'wagon', 'rocket', 'flag', 'map', 'ladder', 'bucket',
  // Nature and weather.
  'rock', 'shell', 'nest', 'cloud', 'rain', 'snow', 'snowman', 'rainbow', 'mountain', 'pond', 'seed', 'grass',
  // Short-vowel words for phonics.
  'fan', 'lid', 'log', 'mop', 'pan', 'pin', 'rug', 'leg', 'wig', 'tub', 'bib', 'fin',
  // A child doing something (no gender shown).
  'kid_run', 'kid_jump', 'kid_sit', 'kid_sleep', 'kid_eat', 'kid_read', 'kid_wave', 'kid_swim',
  'kid_sing', 'kid_paint', 'kid_dig', 'kid_kick',
  // Feelings, solid shapes and places.
  'face_happy', 'face_sad', 'face_mad', 'face_scared', 'face_surprised', 'face_tired',
  'cube', 'cone', 'cylinder', 'sphere', 'school', 'barn',
] as const

export type KidImage = (typeof KID_IMAGES)[number]
