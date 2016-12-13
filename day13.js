/*
--- Day 13: A Maze of Twisty Little Cubicles ---

You arrive at the first floor of this new building to discover a much less welcoming environment than the shiny atrium of the last one. Instead, you are in a maze of twisty little cubicles, all alike.

Every location in this area is addressed by a pair of non-negative integers (x,y). Each such coordinate is either a wall or an open space. You can't move diagonally. The cube maze starts at 0,0 and seems to extend infinitely toward positive x and y; negative values are invalid, as they represent a location outside the building. You are in a small waiting area at 1,1.

While it seems chaotic, a nearby morale-boosting poster explains, the layout is actually quite logical. You can determine whether a given x,y coordinate will be a wall or an open space using a simple system:

Find x*x + 3*x + 2*x*y + y + y*y.
Add the office designer's favorite number (your puzzle input).
Find the binary representation of that sum; count the number of bits that are 1.
If the number of bits that are 1 is even, it's an open space.
If the number of bits that are 1 is odd, it's a wall.
For example, if the office designer's favorite number were 10, drawing walls as # and open spaces as ., the corner of the building containing 0,0 would look like this:

  0123456789
0 .#.####.##
1 ..#..#...#
2 #....##...
3 ###.#.###.
4 .##..#..#.
5 ..##....#.
6 #...##.###
Now, suppose you wanted to reach 7,4. The shortest route you could take is marked as O:

  0123456789
0 .#.####.##
1 .O#..#...#
2 #OOO.##...
3 ###O#.###.
4 .##OO#OO#.
5 ..##OOO.#.
6 #...##.###
Thus, reaching 7,4 would take a minimum of 11 steps (starting from your current location, 1,1).

What is the fewest number of steps required for you to reach 31,39?

Your puzzle input is 1364.
*/

const FAVORITE = 1364
const TARGET = [31, 39]
//const FAVORITE = 10
//const TARGET = [7, 4]

function isWall(x, y) {
  if (x < 0 || y < 0) return true
  const num = (x * x + 3 * x + 2 * x * y + y + y * y) + FAVORITE
  const bits = (num >>> 0).toString(2);
  return !!(bits.split('').reduce((res, bit) => res + Number(bit), 0) % 2)
}

function getNeighbors(x, y) {
  return [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(x => !isWall(...x))
}

let shortest = 100
let coordSet = new Set([])

function walk(coords, visited, limit) {
  if (visited.length > limit) {
    visited.forEach(coord => coordSet.add(coord))
    return false
  }
  if (coords.toString() == TARGET.toString()) {
    const len = visited.length
    if (shortest > len) shortest = len
    return visited.length
  }
  const neighbors = getNeighbors(...coords).filter(neighbor => visited.indexOf(neighbor.toString()) === -1)
  if (!neighbors.length) {
    coordSet.add(coords.toString())
    visited.forEach(coord => coordSet.add(coord))
    return false
  }
  return Promise.all(neighbors.map(neighbor => {
    walk(neighbor, visited.concat(coords.toString()), limit)
  }))
}

//Part 1
walk([1, 1], [], 100)
  .then(() => console.log('Part 1:', shortest))

//Part 2
coordSet = new Set([])
walk([1, 1], [], 50)
  .then(() => console.log('Part 2:', coordSet.size))
//.then(() => printMap(fillMap(makeMap(25, 25), coordSet)))

// Debugging functions
function makeMap(xMax, yMax) {
  let map = []
  for (let y = 0; y < yMax; y++) {
    map[y] = []
    for (let x = 0; x < xMax; x++) {
      map[y][x] = isWall(x, y) ? '#' : '.'
    }
  }
  return map
}

function fillMap(map, set) {
  set.forEach(coord => {
    const c = coord.split(',')
    map[c[1]][c[0]] = '*'
  })
  return map
}

function printMap(map) {
  for (let y = 0; y < map.length; y++) {
    console.log(map[y].join(''))
  }
}
