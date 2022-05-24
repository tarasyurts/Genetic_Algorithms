import { Unit } from "../state"
import { bin2dec, dec2bin } from "../utils/binary"

function mutate(generation: Unit[]): Unit[] {
    return generation.map(unit => {
        const mutatedBinary = dec2bin(unit.x).split('')
            .map(_ => Math.random() <= 0.01 ? _ === '1' ? '0' : '1' : _).join('')
        return { x: bin2dec(mutatedBinary) }
    })
}

export {
    mutate,
}