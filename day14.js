/*
--- Day 14: One-Time Pad ---

In order to communicate securely with Santa while you're on this mission, you've been using a one-time pad that you generate using a pre-agreed algorithm. Unfortunately, you've run out of keys in your one-time pad, and so you need to generate some more.

To generate keys, you first get a stream of random data by taking the MD5 of a pre-arranged salt (your puzzle input) and an increasing integer index (starting with 0) as a string of lowercase hexadecimal digits.

However, not all of these MD5 hashes are keys, and you need 64 new keys for your one-time pad. A hash is a key only if:

It contains three of the same character in a row, like 777. Only consider the first such triplet in a hash.
One of the next 1000 hashes in the stream contains that same character five times in a row, like 77777.
Considering future hashes for five-of-a-kind sequences does not cause those hashes to be skipped; instead, regardless of whether the current hash is a key, always resume testing for keys starting with the very next hash.

For example, if the pre-arranged salt is abc:

The first index which produces a triple is 18, because the MD5 hash of abc18 contains ...cc38887a5.... However, index 18 does not count as a key for your one-time pad, because none of the next thousand hashes (index 19 through index 1018) contain 88888.
The next index which produces a triple is 39; the hash of abc39 contains eee. It is also the first key: one of the next thousand hashes (the one at index 816) contains eeeee.
None of the next six triples are keys, but the one after that, at index 92, is: it contains 999 and index 200 contains 99999.
Eventually, index 22728 meets all of the criteria to generate the 64th key.
So, using our example salt of abc, index 22728 produces the 64th key.

Given the actual salt in your puzzle input, what index produces your 64th one-time pad key?

Your puzzle input is jlmsuwbz
*/
const crypto = require('crypto')

//const SALT = 'abc'
const SALT = 'jlmsuwbz'

let cache = []

let PART2 = false

function generateHash(string) {
  const iterations = PART2 ? 2017 : 1
  for (let i = 0; i < iterations; i++) {
    string = crypto.createHash('md5').update(string).digest('hex')
  }
  return string
}

function getHash(idx) {
  if (!cache[idx]) {
    cache[idx] = generateHash(`${SALT}${idx}`)
  }
  return cache[idx]
}

function contains3(string) {
  const chars = string.split('')
  for (let i = 0; i < chars.length - 2; i++) {
    if (chars[i] == chars[i + 1] && chars[i] == chars[i + 2]) return chars[i]
  }
  return false
}

function contains5(string, char) {
  const search = `${char}${char}${char}${char}${char}`
  return string.indexOf(search) !== -1
}

function isKey(idx) {
  const char = contains3(getHash(idx))
  if (char !== false) {
    for (let i = idx + 1; i < idx + 1000; i++) {
      if (contains5(getHash(i), char)) return true
    }
  }
  return false
}

function part1() {
  PART2 = false
  cache = []
  let idx = 0
  let keyCount = 0
  while (keyCount < 64) {
    if (isKey(++idx)) {
      keyCount++
      //console.log({ idx })
    }
  }
  return idx
}

function part2() {
  PART2 = true
  cache = []
  let idx = 0
  let keyCount = 0
  while (keyCount < 64) {
    if (isKey(++idx)) {
      keyCount++
      //console.log({ idx })
    }
  }
  return idx
}

console.log('Part 1:', part1())

console.log('Part 2:', part2())

