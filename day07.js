/*
--- Day 7: Internet Protocol Version 7 ---

While snooping around the local network of EBHQ, you compile a list of IP addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to figure out which IPs support TLS (transport-layer snooping).

An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA. An ABBA is any four-character sequence which consists of a pair of two different characters followed by the reverse of that pair, such as xyyx or abba. However, the IP also must not have an ABBA within any hypernet sequences, which are contained by square brackets.

For example:

abba[mnop]qrst supports TLS (abba outside square brackets).
abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even though xyyx is outside square brackets).
aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior characters must be different).
ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even though it's within a larger string).
How many IPs in your puzzle input support TLS?

*/

/*
const input = `abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`
*/

const input = require('fs').readFileSync('./input07.txt', { encoding: 'UTF8' })

const rows = input.split("\n")

function extractHyper(row) { return row.match(/\[([a-z]+)\]/g).map(x => x.replace(/\[|\]/g, '')) }
function extractSuper(row) { return row.match(/([a-z]+)\[|\]([a-z]+)/g).map(x => x.replace(/\[|\]/g, '')) }

function hasAbba(string) {
  for (let i = 0; i < string.length - 3; i++) {
    const p = string.substring(i, i + 4)
    if (p[0] === p[3] && p[1] === p[2] && p[0] !== p[1]) return true
  }
  return false
}

function isTls(row) {
  if (extractHyper(row).filter(hasAbba).length) return false
  return !!extractSuper(row).filter(hasAbba).length
}

const answer1 = rows.filter(isTls).length

console.log('Part 1:', answer1)





