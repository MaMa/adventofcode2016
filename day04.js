
const input = `aaaaa-bbb-z-y-x-123[abxyz]
a-b-c-d-e-f-g-h-987[abcde]
not-a-real-room-404[oarel]
totally-real-room-200[decoy]`

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
    .reduce((acc, n, idx) => {
      const aidx = acc.findIndex(a => a.letter == n)
      if (aidx != -1) {
        acc[aidx].count++
      }
      else {
        acc.push({ letter: n, count: 1, idx })
      }
      return acc
    }, []).sort((a, b) => {
      if (a.count < b.count) return 1
      if (a.count > b.count) return -1
      if (a.idx > b.idx) return 1
      if (a.idx < b.irx) return -1
      if (a.letter > b.letter) return 1
      return -1
    }).map(x => x.letter).join('').substring(0,5)
}

const valids = rooms.filter(room => room.check == createChecksum(room.name))

const answer1 = valids.reduce((sum, room) => {return sum + room.sector}, 0)
console.log(answer1)
