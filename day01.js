

let input = 'R4, R5, L5, L5, L3, R2, R1, R1, L5, R5, R2, L1, L3, L4, R3, L1, L1, R2, R3, R3, R1, L3, L5, R3, R1, L1, R1, R2, L1, L4, L5, R4, R2, L192, R5, L2, R53, R1, L5, R73, R5, L5, R186, L3, L2, R1, R3, L3, L3, R1, L4, L2, R3, L5, R4, R3, R1, L1, R5, R2, R1, R1, R1, R3, R2, L1, R5, R1, L5, R2, L2, L4, R3, L1, R4, L5, R4, R3, L5, L3, R4, R2, L5, L5, R2, R3, R5, R4, R2, R1, L1, L5, L2, L3, L4, L5, L4, L5, L1, R3, R4, R5, R3, L5, L4, L3, L1, L4, R2, R5, R5, R4, L2, L4, R3, R1, L2, R5, L5, R1, R1, L1, L5, L5, L2, L1, R5, R2, L4, L1, R4, R3, L3, R1, R5, L1, L4, R2, L3, R5, R3, R1, L3';

//input = 'R5, L5, R5, R3';

const moves = input.split(',')
    .map(x => x.trim())
    .map(x => [x.substr(0,1), x.substr(1)])

const startPos = {
    x : 0,
    y : 0,
    d : [0, 1]
}

function turn(d, dir) {
    switch(d.join()) {
        case '0,1': return dir == 'R' ? [1,0] : [-1,0]
        case '0,-1': return dir == 'R' ? [-1,0] : [1,0]
        case '1,0': return dir == 'R' ? [0,-1] : [0,1]
        case '-1,0': return dir == 'R' ? [0,1] : [0,-1]
        default: throw new Error("Invalid turn")
    }
}

function mover(cur, move) {
    const newDir = turn(cur.d, move[0])
    const newPos = {
        x : cur.x + (newDir[0] * move[1]),
        y : cur.y + (newDir[1] * move[1]),
        d : newDir
    }
    return newPos
}

function dist(pos) {
    return Math.abs(pos.x) + Math.abs(pos.y)
}

const endPos = moves.reduce(mover, startPos)

console.log('Part1 answer:', dist(endPos))
