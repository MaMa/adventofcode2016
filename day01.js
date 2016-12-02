

const input = 'R4, R5, L5, L5, L3, R2, R1, R1, L5, R5, R2, L1, L3, L4, R3, L1, L1, R2, R3, R3, R1, L3, L5, R3, R1, L1, R1, R2, L1, L4, L5, R4, R2, L192, R5, L2, R53, R1, L5, R73, R5, L5, R186, L3, L2, R1, R3, L3, L3, R1, L4, L2, R3, L5, R4, R3, R1, L1, R5, R2, R1, R1, R1, R3, R2, L1, R5, R1, L5, R2, L2, L4, R3, L1, R4, L5, R4, R3, L5, L3, R4, R2, L5, L5, R2, R3, R5, R4, R2, R1, L1, L5, L2, L3, L4, L5, L4, L5, L1, R3, R4, R5, R3, L5, L4, L3, L1, L4, R2, R5, R5, R4, L2, L4, R3, R1, L2, R5, L5, R1, R1, L1, L5, L5, L2, L1, R5, R2, L4, L1, R4, R3, L3, R1, R5, L1, L4, R2, L3, R5, R3, R1, L3'

//const input = 'R5, L5, R5, R3'
//const input = 'R8, R4, R4, R8'

const moves = input.split(',')
    .map(x => x.trim())
    .map(x => [x.substr(0, 1), x.substr(1)])

const startPos = {
    x: 0,
    y: 0,
    d: [0, 1]
}

function turn(d, dir) {
    switch (d.join()) {
        case '0,1': return dir == 'R' ? [1, 0] : [-1, 0]
        case '0,-1': return dir == 'R' ? [-1, 0] : [1, 0]
        case '1,0': return dir == 'R' ? [0, -1] : [0, 1]
        case '-1,0': return dir == 'R' ? [0, 1] : [0, -1]
        default: throw new Error("Invalid turn")
    }
}

function mover(pos, move) {
    const newDir = turn(pos.d, move[0])
    const newPos = {
        x: pos.x + (newDir[0] * move[1]),
        y: pos.y + (newDir[1] * move[1]),
        d: newDir
    }
    return newPos
}

function dist(pos) {
    return Math.abs(pos.x) + Math.abs(pos.y)
}

const endPos = moves.reduce(mover, startPos)
console.log('Part1 answer:', dist(endPos))

const finderStart = {
    pos: startPos,
    hist: [],
    found: false
}

function finder(cur, move) {
    if (cur.found) return cur

    const dir = turn(cur.pos.d, move[0])
    let hist = cur.hist
    let x = cur.pos.x
    let y = cur.pos.y
    let count = move[1]
    while (count--) {
        x += dir[0]
        y += dir[1]
        const coord = [x, y].join()
        if (hist.indexOf(coord) !== -1) { //found
            return {
                pos: { x, y, d: dir },
                hist,
                found: true
            }
        }
        hist.push(coord)
    }
    return {
        pos: { x, y, d: dir },
        hist,
        found: false
    }
}

const answer2 = moves.reduce(finder, finderStart)
console.log('Part2 answer:', dist(answer2.pos))
