/*
--- Day 8: Two-Factor Authentication ---

You come across a door implementing what you can only assume is an implementation of two-factor authentication after a long game of requirements telephone.

To get past the door, you first swipe a keycard (no problem; there was one on a nearby desk). Then, it displays a code on a little screen, and you type that code on a keypad. Then, presumably, the door unlocks.

Unfortunately, the screen has been smashed. After a few minutes, you've taken everything apart and figured out how it works. Now you just have to work out what the screen would have displayed.

The magnetic strip on the card you swiped encodes a series of instructions for the screen; these instructions are your puzzle input. The screen is 50 pixels wide and 6 pixels tall, all of which start off, and is capable of three somewhat peculiar operations:

rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A wide and B tall.
rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels. Pixels that would fall off the right end appear at the left end of the row.
rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels. Pixels that would fall off the bottom appear at the top of the column.
For example, here is a simple sequence on a smaller screen:

rect 3x2 creates a small rectangle in the top-left corner:

###....
###....
.......
rotate column x=1 by 1 rotates the second column down by one pixel:

#.#....
###....
.#.....
rotate row y=0 by 4 rotates the top row right by four pixels:

....#.#
###....
.#.....
rotate column x=1 by 1 again rotates the second column down by one pixel, causing the bottom pixel to wrap back to the top:

.#..#.#
#.#....
.#.....
As you can see, this display technology is extremely powerful, and will soon dominate the tiny-code-displaying-screen market. That's what the advertisement on the back of the display tries to convince you, anyway.

There seems to be an intermediate check of the voltage used by the display: after you swipe your card, if the screen did work, how many pixels should be lit?

--- Part Two ---

You notice that the screen is only capable of displaying capital letters; in the font it uses, each letter is 5 pixels wide and 6 tall.

After you swipe your card, what code is the screen trying to display?

*/

function makeScreen(height, width) {
  let screen = []
  for (let i = 0; i < height; i++) {
    screen[i] = [];
    for (let j = 0; j < width; j++) {
      screen[i][j] = 0;
    }
  }
  return screen
}

function printScreen(screen) {
  console.log()
  screen.map(row => console.log(row.map(x => x ? '#' : '.').join('')))
}

function pivot(input) {
  let width = input.length
  let height = input[0].length
  let screen = []
  for (let i = 0; i < height; i++) {
    screen[i] = []
    for (let j = 0; j < width; j++) {
      screen[i][j] = input[j][i]
    }
  }
  return screen
}

function rect(screen, y, x) {
  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      screen[i][j] = 1
    }
  }
  return screen
}

function rotRow(screen, y, by) {
  let row = screen[y]
  cut = row.length - (by % row.length)
  screen[y] = row.slice(cut, row.length).concat(row.slice(0, cut))
  return screen
}

function rotCol(screen, x, by) {
  return (pivot(rotRow(pivot(screen), x, by)))
}

function countScreen(screen) {
  let count = 0
  for (let i = 0; i < screen.length; i++) {
    for (let j = 0; j < screen[0].length; j++) {
      count += screen[i][j]
    }
  }
  return count
}

function modify(screen, instruction) {
  try {
    let match = instruction.match(/rect (\d+)x(\d+)/)
    if (match) return rect(screen, match[1], match[2])
    match = instruction.match(/rotate column x=(\d+) by (\d+)/)
    if (match) return rotCol(screen, match[1], match[2])
    match = instruction.match(/rotate row y=(\d+) by (\d+)/)
    if (match) return rotRow(screen, match[1], match[2])
    throw new Error(`Invalid instruction ${instruction}`)
  } catch (e) {
    printScreen(screen)
    console.log({ instruction })
    throw e
  }
}


// Test case 1
/*
let screen = makeScreen(3, 7)
screen = modify(screen, 'rect 3x2')
screen = modify(screen, 'rotate column x=1 by 1')
screen = modify(screen, 'rotate row y=0 by 4')
screen = modify(screen, 'rotate column x=1 by 1')
printScreen(screen)
console.log(countScreen(screen))
// */

const instructions = require('fs').readFileSync('./input08.txt', { encoding: 'UTF8' }).split("\n")

const screen1 = instructions.reduce(modify, makeScreen(6, 50))
printScreen(screen1)
console.log('Count:', countScreen(screen1))