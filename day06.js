/*
--- Day 6: Signals and Noise ---

Something is jamming your communications with Santa. Fortunately, your signal is only partially jammed, and protocol in situations like this is to switch to a simple repetition code to get the message through.

In this model, the same message is sent repeatedly. You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. Almost.

All you need to do is figure out which character is most frequent for each position. For example, suppose you had recorded the following messages:

const input = `eedadn
drvtee
eandsr
raavrd
atevrs
tsrnev
sdttsa
rasrtv
nssdts
ntnada
svetve
tesnvt
vntsnd
vrdear
dvrsen
enarar`

/*
The most common character in the first column is e; in the second, a; in the third, s, and so on. Combining these characters returns the error-corrected message, easter.

Given the recording in your puzzle input, what is the error-corrected version of the message being sent?

--- Part Two ---

Of course, that would be the message - if you hadn't agreed to use a modified repetition code instead.

In this modified code, the sender instead transmits what looks like random data, but for each character, the character they actually want to send is slightly less likely than the others. Even after signal-jamming noise, you can look at the letter distributions in each column and choose the least common letter to reconstruct the original message.

In the above example, the least common character in the first column is a; in the second, d, and so on. Repeating this process for the remaining characters produces the original message, advent.

Given the recording in your puzzle input and this new decoding methodology, what is the original message that Santa is trying to send?

*/

const input = require('fs').readFileSync('./input06.txt', { encoding: 'UTF8' })

const rows = input.split("\n")

const letters = rows.reduce((coll, row) => {
  const chars = row.split('')
  for (let i = 0; i < row.length; i++) {
    if (!coll[i]) coll[i] = []
    coll[i].push(chars[i])
  }
  return coll
}, [])

function commonest(letters) {
  return letters.sort().reduce((res, letter) => {
    if (letter == res.curr) {
      res.count++
      if (res.count > res.bestCount) {
        res.best = letter
        res.bestCount = res.count
      }
    }
    else {
      res.curr = letter
      res.count = 1
    }
    return res
  }, { best: null, bestCount: 0, curr: null, count: 0 }).best
}

const answer1 = letters.reduce((res, pos, idx) => {
  res[idx] = commonest(pos)
  return res
}, []).join('')

console.log('Part 1:', answer1)

function rarest(values) {
  const rare = values.sort().reduce((res, value, idx) => {
    if (value === res.current) {
      res.currentCount++
    }
    else {
      if (!res.rareCount || res.currentCount < res.rareCount) {
        res.rarest = res.current
        res.rareCount = res.currentCount
      }
      res.current = value
      res.currentCount = 1
    }
    return res
  }, { rarest: null, rareCount: null, current: null, currentCount: null })
  return rare.rareCount < rare.currentCount ? rare.rarest : rare.current
}

const answer2 = letters.reduce((res, pos, idx) => {
  res[idx] = rarest(pos)
  return res
}, []).join('');

console.log('Part 2:', answer2)