/*
--- Day 10: Balance Bots ---

You come upon a factory in which many robots are zooming around handing small microchips to each other.

Upon closer examination, you notice that each bot only proceeds when it has two microchips, and once it does, it gives each one to a different bot or puts it in a marked "output" bin. Sometimes, bots take microchips from "input" bins, too.

Inspecting one of the microchips, it seems like they each contain a single number; the bots must use some logic to decide what to do with each chip. You access the local control computer and download the bots' instructions (your puzzle input).

Some of the instructions specify that a specific-valued microchip should be given to a specific bot; the rest of the instructions indicate what a given bot should do with its lower-value or higher-value chip.

For example, consider the following instructions:

value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2
Initially, bot 1 starts with a value-3 chip, and bot 2 starts with a value-2 chip and a value-5 chip.
Because bot 2 has two microchips, it gives its lower one (2) to bot 1 and its higher one (5) to bot 0.
Then, bot 1 has two microchips; it puts the value-2 chip in output 1 and gives the value-3 chip to bot 0.
Finally, bot 0 has two microchips; it puts the 3 in output 2 and the 5 in output 0.
In the end, output bin 0 contains a value-5 microchip, output bin 1 contains a value-2 microchip, and output bin 2 contains a value-3 microchip. In this configuration, bot number 2 is responsible for comparing value-5 microchips with value-2 microchips.

Based on your instructions, what is the number of the bot that is responsible for comparing value-61 microchips with value-17 microchips?

--- Part Two ---

What do you get if you multiply together the values of one chip in each of outputs 0, 1, and 2?
*/

/*
let input = `value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2`
// */

const input = require('fs').readFileSync('./input10.txt', { encoding: 'UTF8' })

const instructions = input.split("\n")

function iterate(res, instruction) {

  let match = instruction.match(/value (\d+) goes to bot (\d+)/)
  if (match) {
    let [m, value, bot] = match
    value = Number(value)
    if (!res.bot[bot]) res.bot[bot] = []
    if (!res.bot[bot].includes(value)) {
      res.bot[bot].push(value)
    }
    return res
  }

  match = instruction.match(/bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/)
  if (match) {
    let [m, from, lowCat, lowTo, highCat, highTo] = match
    if (!res.bot[from] || res.bot[from].length !== 2) return res

    let min = Math.min(...res.bot[from])
    let max = Math.max(...res.bot[from])

    if (res.target.includes(min) && res.target.includes(max)) {
      res.found = from
    }

    if (!res[lowCat][lowTo]) res[lowCat][lowTo] = [min]
    else if (!res[lowCat][lowTo].includes(min)) res[lowCat][lowTo].push(min)

    if (!res[highCat][highTo]) res[highCat][highTo] = [max]
    else if (!res[highCat][highTo].includes(max)) res[highCat][highTo].push(max)

    //res.bot[from] = []

    return res
  }

  throw new Error(instruction)
}

let state = { bot: {}, output: {}, target: [17, 61], found: false }
while (!state.found) {
  state = instructions.reduce(iterate, state)
}

console.log('Part1:', state.found)

function result2(state) {
  if (!state.output['0'] || !state.output['0'].length) return false
  if (!state.output['1'] || !state.output['1'].length) return false
  if (!state.output['2'] || !state.output['2'].length) return false
  return (state.output['0'][0] * state.output['1'][0] * state.output['2'][0])
}

while (!result2(state)) {
  state = instructions.reduce(iterate, state)
}

console.log('Part2:', result2(state))
