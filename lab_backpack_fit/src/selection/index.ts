import { Unit } from "../state"

function roulette(generation: Unit[]): Unit[] {
    return generation
        .map(gen => generation[spin(generation.map(_ => _.fnorm!))])
}

function spin(probabs: number[]): number {
    const randNum = Math.random()
    let sum = 0

    for (let i = 0; i < probabs.length; i++) {
        sum += probabs[i]
        if (sum >= randNum)
            return i
    }
    return 0
}

export {
    roulette,
}