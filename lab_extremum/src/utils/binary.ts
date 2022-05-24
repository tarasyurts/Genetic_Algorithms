import { CHARACTER_LENGTH } from "../constants"

function dec2bin(value: number) {
    return value.toString(2).padStart(CHARACTER_LENGTH, '0')
}

function bin2dec(value: string) {
    return parseInt(value, 2)
}

export {
    dec2bin,
    bin2dec,
}