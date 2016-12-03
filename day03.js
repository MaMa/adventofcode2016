/*


 */
const fs = require('fs')

const input = fs.readFileSync('./input03.txt', { encoding: 'UTF8' });

const inputs = input.split("\n").map(s => s.trim().split(/\s+/)).map(x => x.map(n => Number(n)))

const ans1 = inputs.filter(nums => {
  const max = Math.max(...nums)
  const sum = nums.reduce((a, b) => { return a + b }, 0)
  return (sum - max) > max
})

console.log('Part1:', ans1.length);