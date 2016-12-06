/*
--- Day 6: Signals and Noise ---

Something is jamming your communications with Santa. Fortunately, your signal is only partially jammed, and protocol in situations like this is to switch to a simple repetition code to get the message through.

In this model, the same message is sent repeatedly. You've recorded the repeating message signal (your puzzle input), but the data seems quite corrupted - almost too badly to recover. Almost.

All you need to do is figure out which character is most frequent for each position. For example, suppose you had recorded the following messages:

eedadn
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
enarar
The most common character in the first column is e; in the second, a; in the third, s, and so on. Combining these characters returns the error-corrected message, easter.

Given the recording in your puzzle input, what is the error-corrected version of the message being sent?

*/

/*
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
*/

const input = require('fs').readFileSync('./input06.txt', { encoding: 'UTF8' })

const rows = input.split("\n")

const letters = rows.reduce((coll, row) => {
  const chars = row.split('')
  for (let i=0; i < row.length; i++) {
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
  }, {best:null, bestCount:0, curr:null, count:0}).best
}

const answer1 = letters.reduce((res, pos, idx) => {
  res[idx] = commonest(pos)
  return res
}, []).join('')


console.log('Part 1:', answer1)