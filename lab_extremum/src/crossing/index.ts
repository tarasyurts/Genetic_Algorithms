import { CHARACTER_LENGTH, SWAP_CHANCE } from "../constants"
import { Person } from "../state"
import { range } from "../utils/arrays"
import { bin2dec } from "../utils/binary"
import { rand } from "../utils/rand"

function crossing(generation: Person[]): Person[] {
    const paired = pair(generation)
    return paired.reduce((acc, val) =>
        [...acc, ...swapGenes(val)]
    , [] as Person[])
}

function pair(generation: Person[]): [Person, Person][] {
    const genShuffled = generation.sort(() => Math.random() - 0.5)
    return range(generation.length / 2)
        .map(_ => _ * 2)
        .map(_ => [genShuffled[_], genShuffled[_ + 1]])
}

function swapGenes(pair: [Person, Person]): [Person, Person] {
    if (Math.random() >= SWAP_CHANCE)
        return pair

    const mask = generateOneCrossingMask()
    return [
        { x: swap(pair[0].x, pair[1].x) },
        { x: swap(pair[1].x, pair[0].x) },
    ]

    function swap(first: number, second: number) {
        return (mask & first) | (~mask & second)
    }
}

function generateOneCrossingMask(): number {
    const sep = rand(0, CHARACTER_LENGTH)
        , binaryString = '0'.repeat(sep).padEnd(CHARACTER_LENGTH, '1')
    return bin2dec(binaryString)
}

export {
    crossing,
}