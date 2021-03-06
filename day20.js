/*
--- Day 20: Firewall Rules ---

You'd like to set up a small hidden computer here so you can use it to get back into the network later. However, the corporate firewall only allows communication with certain external IP addresses.

You've retrieved the list of blocked IPs from the firewall, but the list seems to be messy and poorly maintained, and it's not clear which IPs are allowed. Also, rather than being written in dot-decimal notation, they are written as plain 32-bit integers, which can have any value from 0 through 4294967295, inclusive.

For example, suppose only the values 0 through 9 were valid, and that you retrieved the following blacklist:

5-8
0-2
4-7
The blacklist specifies ranges of IPs (inclusive of both the start and end value) that are not allowed. Then, the only IPs that this firewall allows are 3 and 9, since those are the only numbers not in any range.

Given the list of blocked IPs you retrieved from the firewall (your puzzle input), what is the lowest-valued IP that is not blocked?
*/

const input = require('fs').readFileSync('./input20.txt', { encoding: 'UTF8' }).split("\n")

const ranges = input.map(x => x.split('-').map(n => Number(n)))

let min = 0
let max = 0
do {
  max++
  let inrange = ranges.filter(x => (x[0] <= max && x[1] >= max))
  min = max
  max = inrange.reduce((res, cur) => {
    return (cur[1] > res) ? cur[1] : res
  }, max)
} while (min !== max)

console.log('Part 1:', max)

const MAX = ranges.reduce((res, v) => { return v[1] > res ? v[1] : res } , 0)
let free = 0;
let idx = 0;
do {
  const blocked = ranges.find(r => r[0] <= idx && r[1] >= idx)
  if (blocked) {
    idx = blocked[1]+1
  } else {
    free++
    idx++
  }
} while (idx < MAX)

console.log('Part 2:', free)
