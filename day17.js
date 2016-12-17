/*
--- Day 17: Two Steps Forward ---

You're trying to access a secure vault protected by a 4x4 grid of small rooms connected by doors. You start in the top-left room (marked S), and you can access the vault (marked V) once you reach the bottom-right room:

#########
#S| | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | | #
#-#-#-#-#
# | | |
####### V
Fixed walls are marked with #, and doors are marked with - or |.

The doors in your current room are either open or closed (and locked) based on the hexadecimal MD5 hash of a passcode (your puzzle input) followed by a sequence of uppercase characters representing the path you have taken so far (U for up, D for down, L for left, and R for right).

Only the first four characters of the hash are used; they represent, respectively, the doors up, down, left, and right from your current position. Any b, c, d, e, or f means that the corresponding door is open; any other character (any number or a) means that the corresponding door is closed and locked.

To access the vault, all you need to do is reach the bottom-right room; reaching this room opens the vault and all doors in the maze.

For example, suppose the passcode is hijkl. Initially, you have taken no steps, and so your path is empty: you simply find the MD5 hash of hijkl alone. The first four characters of this hash are ced9, which indicate that up is open (c), down is open (e), left is open (d), and right is closed and locked (9). Because you start in the top-left corner, there are no "up" or "left" doors to be open, so your only choice is down.

Next, having gone only one step (down, or D), you find the hash of hijklD. This produces f2bc, which indicates that you can go back up, left (but that's a wall), or right. Going right means hashing hijklDR to get 5745 - all doors closed and locked. However, going up instead is worthwhile: even though it returns you to the room you started in, your path would then be DU, opening a different set of doors.

After going DU (and then hashing hijklDU to get 528e), only the right door is open; after going DUR, all doors lock. (Fortunately, your actual passcode is not hijkl).

Passcodes actually used by Easter Bunny Vault Security do allow access to the vault if you know the right path. For example:

If your passcode were ihgpwlah, the shortest path would be DDRRRD.
With kglvqrro, the shortest path would be DDUDRLRRUDRD.
With ulqzkmiv, the shortest would be DRURDRUDDLLDLUURRDULRLDUUDDDRR.
Given your vault's passcode, what is the shortest path (the actual path, not just the length) to reach the vault?

Your puzzle input is pgflpeqp.
*/

const crypto = require('crypto')

const PASSCODE = 'pgflpeqp'

// U D L R
function getOpens(path) {
  return crypto.createHash('md5').update(`${PASSCODE}${path}`).digest('hex')
    .slice(0, 4).split('').map(c => !!c.match(/[bcdef]/))
}

function isValidCoords(coords) {
  return coords[0] >= 0 && coords[0] <= 3
    && coords[1] >= 0 && coords[1] <= 3
}

function getExits(coords, path) {
  const dirs = getOpens(path)
  let out = []
  if (dirs[0]) out.push({ coords: [coords[0], coords[1] - 1], path: path + 'U' })
  if (dirs[1]) out.push({ coords: [coords[0], coords[1] + 1], path: path + 'D' })
  if (dirs[2]) out.push({ coords: [coords[0] - 1, coords[1]], path: path + 'L' })
  if (dirs[3]) out.push({ coords: [coords[0] + 1, coords[1]], path: path + 'R' })
  return out.filter(row => isValidCoords(row.coords))
}

let shortest = false
function travel(coords, path) {
  if (shortest && path.length > shortest.length) return false
  if (coords[0] == 3 && coords[1] == 3) {
    if (!shortest || path.length < shortest.length) {
      shortest = path
    }
  }
  getExits(coords, path).map(row => travel(row.coords, row.path))
}

travel([0, 0], '')

console.log('Part 1:', shortest)