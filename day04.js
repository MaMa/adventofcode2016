/*
--- Day 4: Security Through Obscurity ---

Finally, you come across an information kiosk with a list of rooms. Of course, the list is encrypted and full of decoy data, but the instructions to decode the list are barely hidden nearby. Better remove the decoy data first.

Each room consists of an encrypted name (lowercase letters separated by dashes) followed by a dash, a sector ID, and a checksum in square brackets.

A room is real (not a decoy) if the checksum is the five most common letters in the encrypted name, in order, with ties broken by alphabetization. For example:

aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
not-a-real-room-404[oarel] is a real room.
totally-real-room-200[decoy] is not.
Of the real rooms from the list above, the sum of their sector IDs is 1514.

What is the sum of the sector IDs of the real rooms?

*/

const fs = require('fs')

const input = fs.readFileSync('./input04.txt', { encoding: 'UTF8' });

/*
const input = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`
*/

const rows = input.split("\n").map(x => x.trim())

function parseRoom(room) {
  const match = room.match(/([a-z-]+)(\d+)\[([a-z]+)\]/)
  return {
    name: match[1],
    sector: Number(match[2]),
    check: match[3]
  }
}
const rooms = rows.map(parseRoom)

function createChecksum(name) {
  return name.split('')
    .filter(x => x.match(/[a-z]/))
    .reduce((acc, letter) => {
      const idx = acc.findIndex(a => a.letter == letter)
      if (idx !== -1) {
        acc[idx].count++
      }
      else {
        acc.push({ letter, count: 1})
      }
      return acc
    }, []).sort((a, b) => {
      if (a.count < b.count) return 1
      if (a.count > b.count) return -1
      if (a.letter > b.letter) return 1
      return -1
    }).map(x => x.letter).join('').substring(0,5)
}

const valids = rooms.filter(room => {return room.check == createChecksum(room.name)})

const answer1 = valids.reduce((sum, room) => {return sum + room.sector}, 0)

console.log('Part1:', answer1)
