import { state } from "../state"

function dec2bin(value: number) {
    return value.toString(2).padStart(state.items.length, '0')
}

function bin2dec(value: string) {
    return parseInt(value, 2)
}

export {
    dec2bin,
    bin2dec,
}