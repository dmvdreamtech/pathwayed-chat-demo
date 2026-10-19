import type { ContentChoice, ContentSkill, PicturePrompt } from '../../types'

const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const show = (image: string, count = 1): PicturePrompt => ({ kind: 'object_group', image, count })

const skill: ContentSkill = {
  slug: 'math-gk-shapes-more',
  subject: 'math',
  grade: 0,
  group: 'Geometry',
  name: 'Shapes',
  standards: ['K.G.A'],
  renderMode: 'audio_picture',
  extends: 'shapes',
  topUpItems: 14,
  items: [
    // Naming solid shapes (the live skill names only flat ones)
    {
      slot: 1, difficulty: 'easy',
      stem: 'Can you find the cone? Tap the shape.',
      prompt: null,
      choices: [pic('cone', true), pic('cube'), pic('sphere')],
      solution: 'The cone is the shape like a party hat. A cone has a round bottom and comes up to one point.',
    },
    {
      slot: 2, difficulty: 'easy',
      stem: 'Can you find the cylinder? Tap the shape.',
      prompt: null,
      choices: [pic('cylinder', true), pic('cone'), pic('cube')],
      solution: 'The cylinder is the shape like a can. A cylinder has a round top, a round bottom, and a curved side.',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: 'Can you find the sphere? Tap the shape.',
      prompt: null,
      choices: [pic('sphere', true), pic('cylinder'), pic('cube')],
      solution: 'The sphere is the shape that can roll every way. A sphere is round all over, like a ball.',
    },
    // Shapes in the world
    {
      slot: 4, difficulty: 'easy',
      stem: 'Look at this tent. Which flat shape does the tent look like? Tap the shape.',
      prompt: show('tent'),
      choices: [pic('triangle', true), pic('circle'), pic('square')],
      solution: 'The tent has a point on top and two slanted sides, just like a triangle.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: 'Look at this penny. Which flat shape does the penny look like? Tap the shape.',
      prompt: show('penny'),
      choices: [pic('circle', true), pic('triangle'), pic('rectangle')],
      solution: 'A penny is round all the way around with no corners, like a circle.',
    },
    {
      slot: 6, difficulty: 'medium',
      stem: 'Look at this slice of pizza. Which flat shape does the slice look like? Tap the shape.',
      prompt: show('pizza'),
      choices: [pic('triangle', true), pic('hexagon'), pic('square')],
      solution: 'A slice of pizza has three sides and comes to a point, like a triangle.',
    },
    {
      slot: 7, difficulty: 'medium',
      stem: 'Look at this jar. Which solid shape does the jar look like? Tap the shape.',
      prompt: show('jar'),
      choices: [pic('cylinder', true), pic('cone'), pic('cube')],
      solution: 'A jar has a round top, a round bottom, and a curved side, like a cylinder.',
    },
    // Position words in spoken stories
    {
      slot: 8, difficulty: 'medium',
      stem: 'Listen. Kai builds a tower. A cube is on the bottom. A cone sits on top of the cube. Which shape is above the cube? Tap the shape.',
      prompt: null,
      choices: [pic('cone', true), pic('sphere'), pic('cylinder')],
      solution: 'The cone sits on top of the cube, so the cone is above the cube.',
    },
    {
      slot: 9, difficulty: 'medium',
      stem: 'Listen. Noor draws a picture. A circle is above a triangle. A square is next to the triangle. Which shape is next to the triangle? Tap the shape.',
      prompt: null,
      choices: [pic('square', true), pic('circle'), pic('hexagon')],
      solution: 'The square is next to the triangle. The circle is above the triangle.',
    },
    {
      slot: 10, difficulty: 'medium',
      stem: 'Listen. Juno lines up toy shapes on the rug. A sphere is in front of a cylinder. A cube is beside the cylinder. Which shape is in front of the cylinder? Tap the shape.',
      prompt: null,
      choices: [pic('sphere', true), pic('cube'), pic('cone')],
      solution: 'The sphere is in front of the cylinder. The cube is beside it.',
    },
    {
      slot: 11, difficulty: 'hard',
      stem: 'Listen. On a shelf, a ball sits next to a box. A can of soup is behind the box. What shape is the thing behind the box? Tap the shape.',
      prompt: null,
      choices: [pic('cylinder', true), pic('sphere'), pic('cube')],
      solution: 'The can of soup is behind the box. A can has round ends and a curved side, so it is a cylinder.',
    },
    // Same shape, any size or turn
    {
      slot: 12, difficulty: 'hard',
      stem: 'Listen. Ana draws a tiny shape with 3 sides and 3 corners. Then Ana draws a giant shape just like it, but upside down. What shape is the giant one? Tap the shape.',
      prompt: null,
      choices: [pic('triangle', true), pic('square'), pic('circle')],
      solution: 'Big or small, turned up or down, a shape with 3 sides and 3 corners is still a triangle.',
    },
    {
      slot: 13, difficulty: 'hard',
      stem: 'Look at this door. It stands up tall. Which flat shape does the door look like? Tap the shape.',
      prompt: show('door'),
      choices: [pic('rectangle', true), pic('triangle'), pic('hexagon')],
      solution: 'A door is a rectangle. Standing up tall or lying down long, a rectangle is still a rectangle.',
    },
    // Flat or solid
    {
      slot: 14, difficulty: 'hard',
      stem: 'Listen. Ravi has two round shapes. One is drawn flat on paper. One is solid, and Ravi can hold it in one hand and roll it. Tap the solid one.',
      prompt: null,
      choices: [pic('sphere', true), pic('circle')],
      solution: 'A circle is flat, like a drawing. A sphere is solid and round all over, so Ravi can hold it and roll it.',
    },
  ],
}

export default skill
