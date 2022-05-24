import { Person } from "../state"
import { bin2dec, dec2bin } from "../utils/binary"

function mutate(generation: Person[]): Person[] {
    return generation.map(person => {
        const mutatedBinary = dec2bin(person.x).split('')
            .map(_ => Math.random() <= 0.01 ? _ === '1' ? '0' : '1' : _).join('')
        return { x: bin2dec(mutatedBinary) }
    })
}

export {
    mutate,
}