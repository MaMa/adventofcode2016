

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