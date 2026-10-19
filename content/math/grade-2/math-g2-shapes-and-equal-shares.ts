import type { ContentChoice, ContentSkill, PicturePrompt, PictureTile } from '../../types'

const num = (v: number, correct = false): ContentChoice => ({ text: String(v), is_correct: correct, tile: { kind: 'number', value: String(v) } })
const pic = (image: string, correct = false, text = image): ContentChoice => ({ text, is_correct: correct, tile: { kind: 'object_group', image, count: 1 } })
const show = (image: string, count = 1): PicturePrompt => ({ kind: 'object_group', image, count })
type Shape = 'circle' | 'square' | 'rectangle'
const frac = (shape: Shape, parts: number, shaded = 0, equal = true): PictureTile =>
  ({ kind: 'fraction', shape, parts, shaded, ...(equal ? {} : { equal: false }) }) as PictureTile
const cut = (text: string, shape: Shape, parts: number, shaded = 0, correct = false, equal = true): ContentChoice =>
  ({ text, is_correct: correct, tile: frac(shape, parts, shaded, equal) })
const grid = (rows: number, cols: number): PicturePrompt => ({ kind: 'grid', rows, cols })
const tiles = (text: string, rows: number, cols: number, correct = false): ContentChoice =>
  ({ text, is_correct: correct, tile: { kind: 'grid', rows, cols } })

const skill: ContentSkill = {
  slug: 'math-g2-shapes-and-equal-shares',
  subject: 'math',
  grade: 2,
  group: 'Geometry',
  name: 'Shapes and Equal Shares',
  standards: ['2.G.A'],
  renderMode: 'audio_picture',
  items: [
    // Shapes by their angles, sides and faces.
    {
      slot: 1, difficulty: 'easy',
      stem: 'An angle is a corner where two sides meet. Count the angles on this shape. Tap the number.',
      prompt: show('triangle'),
      choices: [num(3, true), num(6), num(1)],
      solution: "Let's count the angles: one, two, three. A triangle has 3 angles and 3 sides. Tri means three!",
    },
    {
      slot: 2, difficulty: 'easy',
      stem: 'A quadrilateral is any flat shape with four sides and four angles. Tap the shape that is a quadrilateral.',
      prompt: null,
      choices: [pic('diamond', true), pic('triangle'), pic('hexagon')],
      solution: 'The diamond has four sides and four angles, so it is a quadrilateral. A triangle has three sides, and a hexagon has six.',
    },
    {
      slot: 3, difficulty: 'easy',
      stem: 'Count the angles on this shape. Tap the number.',
      prompt: show('diamond'),
      choices: [num(4, true), num(1), num(8)],
      solution: "Let's count the angles: one, two, three, four. This diamond has 4 angles and 4 sides, so it is a quadrilateral.",
    },
    {
      slot: 4, difficulty: 'medium',
      stem: 'Squares and rectangles are quadrilaterals, because they have four sides. Tap the shape that is NOT a quadrilateral.',
      prompt: null,
      choices: [pic('hexagon', true), pic('square'), pic('diamond')],
      solution: 'The hexagon has six sides, so it is not a quadrilateral. The square and the diamond each have four sides, so they are quadrilaterals.',
    },
    {
      slot: 5, difficulty: 'medium',
      stem: 'Listen. A pentagon is a flat shape with five straight sides. A flat shape has the same number of angles as sides. How many angles does a pentagon have? Tap the number.',
      prompt: null,
      choices: [num(5, true), num(2), num(9)],
      solution: 'Five sides means five angles, one where each pair of sides meets. A pentagon has 5 angles.',
    },
    {
      slot: 6, difficulty: 'easy',
      stem: 'A square has four angles. Which shape has more angles than a square? Tap the picture.',
      prompt: null,
      choices: [pic('hexagon', true), pic('triangle'), pic('circle')],
      solution: 'A hexagon has six angles, and six is more than four. A triangle has three angles, and a circle has none.',
    },
    {
      slot: 7, difficulty: 'hard',
      stem: 'Ava has a triangle and a hexagon. How many angles do the two shapes have in all? Tap the number.',
      prompt: { kind: 'object_rows', labels: false, rows: [{ image: 'triangle', count: 1 }, { image: 'hexagon', count: 1 }] },
      choices: [num(9, true), num(5), num(14)],
      solution: 'The triangle has 3 angles and the hexagon has 6 angles. Three plus six is nine, so there are 9 angles in all.',
    },
    {
      slot: 8, difficulty: 'medium',
      stem: 'Here are two diamonds. How many angles do they have in all? Tap the number.',
      prompt: show('diamond', 2),
      choices: [num(8, true), num(2), num(12)],
      solution: 'Each diamond has 4 angles. Four plus four is eight, so the two diamonds have 8 angles.',
    },
    {
      slot: 9, difficulty: 'medium',
      stem: 'Listen. Leo draws a pentagon. It has five angles. Mia draws a triangle. It has three angles. How many more angles does the pentagon have? Tap the number.',
      prompt: null,
      choices: [num(2, true), num(8), num(5)],
      solution: 'Five take away three is two. The pentagon has 2 more angles than the triangle.',
    },
    {
      slot: 10, difficulty: 'medium',
      stem: 'This is a cube. Its flat sides are called faces. Some faces are hidden at the back. How many faces does a cube have in all? Tap the number.',
      prompt: show('cube'),
      choices: [num(6, true), num(3), num(10)],
      solution: 'A cube has 6 faces: top, bottom, front, back and two sides. We can see only three in the picture, but three more are hidden.',
    },
    {
      slot: 11, difficulty: 'easy',
      stem: 'Which solid shape has six flat faces that are all squares the same size? Tap the picture.',
      prompt: null,
      choices: [pic('cube', true), pic('cone'), pic('sphere')],
      solution: 'A cube has six flat faces, and every face is a square the same size. A sphere is round all over, and a cone has a point.',
    },
    {
      slot: 12, difficulty: 'easy',
      stem: 'Every face of a cube is the same flat shape. Which flat shape is it? Tap the picture.',
      prompt: show('cube'),
      choices: [pic('square', true), pic('circle'), pic('triangle')],
      solution: 'Each face of a cube is a square. A cube has six square faces, all the same size.',
    },
    {
      slot: 13, difficulty: 'medium',
      stem: 'A pentagon has five sides. Tap the shape that has one more side than a pentagon.',
      prompt: null,
      choices: [pic('hexagon', true), pic('triangle'), pic('square')],
      solution: 'Five and one more is six. A hexagon has six sides, one more than a pentagon.',
    },
    {
      slot: 14, difficulty: 'medium',
      stem: 'A square has four sides. Tap the shape that has one fewer side than a square.',
      prompt: null,
      choices: [pic('triangle', true), pic('hexagon'), pic('circle')],
      solution: 'One fewer than four is three. A triangle has three sides, one fewer than a square.',
    },
    {
      slot: 15, difficulty: 'hard',
      stem: 'Here are three rectangles. Every rectangle has four angles. How many angles do they have in all? Tap the number.',
      prompt: show('rectangle', 3),
      choices: [num(12, true), num(3), num(7)],
      solution: "Let's count by fours: four, eight, twelve. Three rectangles have 12 angles in all.",
    },
    // A rectangle cut into rows and columns of same size squares.
    {
      slot: 16, difficulty: 'medium',
      stem: 'This rectangle is cut into same size squares. A row goes across, side to side. How many rows are there? Tap the number.',
      prompt: grid(2, 4),
      choices: [num(2, true), num(4), num(8)],
      solution: 'There are 2 rows going across. Each row has 4 squares, so 4 is the number in one row, not the number of rows.',
    },
    {
      slot: 17, difficulty: 'medium',
      stem: 'This rectangle is cut into same size squares. A column goes up and down, top to bottom. How many columns are there? Tap the number.',
      prompt: grid(3, 5),
      choices: [num(5, true), num(3), num(15)],
      solution: 'There are 5 columns going up and down. There are 3 rows going across, and each column has 3 squares.',
    },
    {
      slot: 18, difficulty: 'easy',
      stem: 'This rectangle is cut into same size squares. Count all the squares. Tap the number.',
      prompt: grid(2, 3),
      choices: [num(6, true), num(2), num(10)],
      solution: 'There are 2 rows with 3 squares in each row. Three, then six. There are 6 squares in all.',
    },
    {
      slot: 19, difficulty: 'medium',
      stem: 'This rectangle has three rows of same size squares. How many squares are there in all? Tap the number.',
      prompt: grid(3, 4),
      choices: [num(12, true), num(7), num(4)],
      solution: "Each row has 4 squares. Let's count by rows: four, eight, twelve. There are 12 squares.",
    },
    {
      slot: 20, difficulty: 'medium',
      stem: 'How many same size squares cover this rectangle? Tap the number.',
      prompt: grid(4, 4),
      choices: [num(16, true), num(8), num(4)],
      solution: "There are 4 rows of 4 squares. Four, eight, twelve, sixteen. There are 16 squares.",
    },
    {
      slot: 21, difficulty: 'hard',
      stem: 'This rectangle has five rows of same size squares. How many squares are there in all? Tap the number.',
      prompt: grid(5, 4),
      choices: [num(20, true), num(9), num(5)],
      solution: "Each of the 5 rows has 4 squares. Four, eight, twelve, sixteen, twenty. There are 20 squares.",
    },
    {
      slot: 22, difficulty: 'medium',
      stem: 'Listen. Tap the rectangle that has two rows, with five squares in each row.',
      prompt: null,
      choices: [tiles('two rows of five', 2, 5, true), tiles('three rows of three', 3, 3), tiles('four rows of two', 4, 2)],
      solution: 'Two rows go across, and each row has 5 squares. Five and five make 10 squares.',
    },
    {
      slot: 23, difficulty: 'hard',
      stem: 'Tap the rectangle that is cut into twelve same size squares.',
      prompt: null,
      choices: [tiles('three rows of four', 3, 4, true), tiles('two rows of five', 2, 5), tiles('three rows of three', 3, 3)],
      solution: 'Three rows of four squares make four, eight, twelve. That is 12 squares. Two rows of five make 10, and three rows of three make 9.',
    },
    {
      slot: 24, difficulty: 'hard',
      stem: 'Listen. Ravi covers a rectangle with two rows of squares, like this. Then Ravi adds one more row of four squares. How many squares are there now? Tap the number.',
      prompt: grid(2, 4),
      choices: [num(12, true), num(9), num(8)],
      solution: 'Ravi starts with 8 squares. One more row of 4 makes 8 plus 4, which is 12. Now there are 3 rows of 4 squares.',
    },
    {
      slot: 25, difficulty: 'medium',
      stem: 'This rectangle has four rows. Every row has the same number of squares. How many squares are in one row? Tap the number.',
      prompt: grid(4, 3),
      choices: [num(3, true), num(4), num(12)],
      solution: 'Look across one row: one, two, three. Each row has 3 squares. There are 4 rows, so there are 12 squares in all.',
    },
    {
      slot: 26, difficulty: 'medium',
      stem: 'Tap the rectangle with the most same size squares.',
      prompt: null,
      choices: [tiles('three rows of five', 3, 5, true), tiles('two rows of four', 2, 4), tiles('three rows of two', 3, 2)],
      solution: 'Three rows of five is 15 squares. Two rows of four is 8, and three rows of two is 6. Fifteen is the most.',
    },
    {
      slot: 27, difficulty: 'easy',
      stem: 'This square is cut into two rows and two columns of same size squares. How many small squares are there? Tap the number.',
      prompt: grid(2, 2),
      choices: [num(4, true), num(2), num(8)],
      solution: 'Two squares in the top row and two in the bottom row. Two and two make 4 small squares.',
    },
    // Equal shares: halves, thirds and fourths.
    {
      slot: 28, difficulty: 'easy',
      stem: 'Thirds are three equal parts. Tap the circle that is cut into thirds.',
      prompt: null,
      choices: [cut('three equal parts', 'circle', 3, 0, true), cut('two equal parts', 'circle', 2), cut('four equal parts', 'circle', 4)],
      solution: 'This circle is cut into three parts that are all the same size. Three equal parts are called thirds.',
    },
    {
      slot: 29, difficulty: 'easy',
      stem: 'Tap the rectangle that is cut into three equal shares.',
      prompt: null,
      choices: [cut('three equal parts', 'rectangle', 3, 0, true), cut('three parts that are not equal', 'rectangle', 3, 0, false, false), cut('two equal parts', 'rectangle', 2)],
      solution: 'Equal shares are all the same size. This rectangle has three parts, and every part is the same size, so they are thirds.',
    },
    {
      slot: 30, difficulty: 'easy',
      stem: 'How many equal parts is this rectangle cut into? Tap the number.',
      prompt: frac('rectangle', 3) as PicturePrompt,
      choices: [num(3, true), num(1), num(6)],
      solution: "Let's count the parts: one, two, three. The rectangle is cut into 3 equal parts. Each part is a third.",
    },
    {
      slot: 31, difficulty: 'medium',
      stem: 'Tap the circle with one third shaded.',
      prompt: null,
      choices: [cut('one third shaded', 'circle', 3, 1, true), cut('two thirds shaded', 'circle', 3, 2), cut('one half shaded', 'circle', 2, 1)],
      solution: 'One third means one of three equal parts. This circle has three equal parts, and one part is shaded.',
    },
    {
      slot: 32, difficulty: 'medium',
      stem: 'Tap the square with two thirds shaded.',
      prompt: null,
      choices: [cut('two thirds shaded', 'square', 3, 2, true), cut('one third shaded', 'square', 3, 1), cut('two fourths shaded', 'square', 4, 2)],
      solution: 'Two thirds means two of three equal parts. This square has three equal parts, and two of them are shaded.',
    },
    {
      slot: 33, difficulty: 'easy',
      stem: 'Three thirds make one whole. Tap the rectangle where all three thirds are shaded.',
      prompt: null,
      choices: [cut('three thirds shaded', 'rectangle', 3, 3, true), cut('one third shaded', 'rectangle', 3, 1), cut('two thirds shaded', 'rectangle', 3, 2)],
      solution: 'When all three thirds are shaded, the whole rectangle is shaded. Three thirds make one whole.',
    },
    {
      slot: 34, difficulty: 'medium',
      stem: 'This circle is cut into fourths. One fourth is shaded. How many fourths make the whole circle? Tap the number.',
      prompt: frac('circle', 4, 1) as PicturePrompt,
      choices: [num(4, true), num(1), num(8)],
      solution: "Let's count the fourths: one, two, three, four. Four fourths make one whole circle.",
    },
    {
      slot: 35, difficulty: 'hard',
      stem: 'Thirds must be equal parts. Tap the square that is NOT cut into thirds.',
      prompt: null,
      choices: [cut('three parts that are not equal', 'square', 3, 0, true, false), cut('three equal parts', 'square', 3), cut('three equal parts with one shaded', 'square', 3, 1)],
      solution: 'This square has three parts, but they are not the same size. Thirds must be three equal parts, so these are not thirds.',
    },
    {
      slot: 36, difficulty: 'hard',
      stem: 'Listen. Ana gets half of a sandwich. Ben gets a third of the same size sandwich. Tap the picture that shows the bigger share shaded.',
      prompt: null,
      choices: [cut('one half shaded', 'rectangle', 2, 1, true), cut('one third shaded', 'rectangle', 3, 1)],
      solution: 'A half is bigger than a third. When the same whole is cut into fewer equal parts, each part is bigger. Ana gets more.',
    },
    {
      slot: 37, difficulty: 'medium',
      stem: 'Listen. Three friends share a round pizza. Everyone gets the same amount. Tap the pizza cut the right way.',
      prompt: null,
      choices: [cut('three equal parts', 'circle', 3, 0, true), cut('four equal parts', 'circle', 4), cut('three parts that are not equal', 'circle', 3, 0, false, false)],
      solution: 'Three friends need three equal shares. This pizza is cut into three parts that are all the same size, so each friend gets one third.',
    },
    {
      slot: 38, difficulty: 'hard',
      stem: 'Listen. Jo cut this square into four equal strips, so each strip is one fourth. Mo cuts the same size square into fourths a different way. Tap the square that shows Mo\'s fourths.',
      prompt: frac('square', 4) as PicturePrompt,
      choices: [
        { text: 'four same size small squares', is_correct: true, tile: { kind: 'grid', rows: 2, cols: 2 } },
        cut('four parts that are not equal', 'square', 4, 0, false, false),
        { text: 'nine same size small squares', is_correct: false, tile: { kind: 'grid', rows: 3, cols: 3 } },
      ],
      solution: "Mo's square has four small squares, all the same size, so each is a fourth. Jo's fourths are strips and Mo's are squares, but each is a fourth of the same square. Equal shares need not have the same shape.",
    },
    {
      slot: 39, difficulty: 'hard',
      stem: 'Two fourths is the same amount as one half. Tap the rectangle where half of it is shaded.',
      prompt: null,
      choices: [cut('two fourths shaded', 'rectangle', 4, 2, true), cut('one fourth shaded', 'rectangle', 4, 1), cut('three fourths shaded', 'rectangle', 4, 3)],
      solution: 'Two of the four equal parts are shaded, and two are not. The shaded part and the white part are the same size, so half is shaded.',
    },
    {
      slot: 40, difficulty: 'hard',
      stem: 'Look at the shaded part of this circle. Tap the rectangle with the same share shaded.',
      prompt: frac('circle', 3, 1) as PicturePrompt,
      choices: [cut('one third shaded', 'rectangle', 3, 1, true), cut('one half shaded', 'rectangle', 2, 1), cut('one fourth shaded', 'rectangle', 4, 1)],
      solution: 'The circle has three equal parts with one shaded, so one third is shaded. The rectangle with three equal parts and one shaded shows one third too.',
    },
  ],
}

export default skill
