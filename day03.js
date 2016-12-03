/*
--- Day 3: Squares With Three Sides ---

Now that you can think clearly, you move deeper into the labyrinth of hallways and office furniture that makes up this part of Easter Bunny HQ. This must be a graphic design department; the walls are covered in specifications for triangles.

Or are they?

The design document gives the side lengths of each triangle it describes, but... 5 10 25? Some of these aren't triangles. You can't help but mark the impossible ones.

In a valid triangle, the sum of any two sides must be larger than the remaining side. For example, the "triangle" given above is impossible, because 5 + 10 is not larger than 25.

In your puzzle input, how many of the listed triangles are possible?

Your puzzle answer was 1032.

The first half of this puzzle is complete! It provides one gold star: *

--- Part Two ---

Now that you've helpfully marked up their design documents, it occurs to you that triangles are specified in groups of three vertically. Each set of three numbers in a column specifies a triangle. Rows are unrelated.

For example, given the following specification, numbers with the same hundreds digit would be part of the same triangle:

101 301 501
102 302 502
103 303 503
201 401 601
202 402 602
203 403 603
In your puzzle input, and instead reading by columns, how many of the listed triangles are possible?
 */
const fs = require('fs')

const input = fs.readFileSync('./input03.txt', { encoding: 'UTF8' });

const in1 = input.split("\n").map(s => s.trim().split(/\s+/)).map(x => x.map(n => Number(n)))

function isPossible(nums) {
  const max = Math.max(...nums)
  const sum = nums.reduce((a, b) => { return a + b }, 0)
  return (sum - max) > max
}

const ans1 = in1.filter(isPossible)

console.log('Part1:', ans1.length);

const in2 = in1.reduce((cur, acc) => {
  let nums = cur.nums
  let tri = cur.tri

  tri.push(acc)
  if (tri.length == 3) {
    nums.push([tri[0][0], tri[1][0], tri[2][0]])
    nums.push([tri[0][1], tri[1][1], tri[2][1]])
    nums.push([tri[0][2], tri[1][2], tri[2][2]])
    tri = []
  }
  return {nums, tri}
}, {
  nums : [],
  tri : []
})

const answer2 = in2.nums.filter(isPossible).length
console.log('Part2:', answer2)
