import { EXTREMUM_MODE, FILE_NAME, GENERATION_LENGTH, ITERATIONS } from "./constants"
import { rand } from "./utils/rand"
import { roulette } from "./selection"
import { mutate } from "./mutation"
import { range } from "./utils/arrays"
import { Unit, state } from "./state"
import { crossing } from "./crossing"
import { dec2bin } from "./utils/binary"
import { readState } from "./io"

readState()
    .then(main)

function main() {
    const generation = generateGeneration()
    printPopulation(generation)

    const resultGeneration = range(ITERATIONS)
    .reduce((gen, _) => {
        const normalized = normalizeGeneration(gen)
            , filtered = roulette(normalized)
            , crossed = crossing(filtered)
            , mutated = mutate(crossed)
        return mutated
    }, generation)

    const unit = getExtremumUnit(resultGeneration)
    console.log('Result unit', unit)
    console.log('Items in backpack', getItemsInBackpack(unit.x))
}

function generateGeneration() {
    let alreadyRand: number[] = []
    return range(GENERATION_LENGTH)
        .map(_ => {
            let randNum: number
            do {
                randNum = rand(0, Math.pow(state.items.length, 2))
            } while (alreadyRand.some(_ => _ === randNum))
            alreadyRand = [...alreadyRand, randNum]
            return randNum
        })
        .map<Unit>(_ => ({ x: _, fx: func(_) }))
}

function normalizeGeneration(gen: Unit[]) {
    const funcRes = gen.map(_ => func(_.x))
        , resultsSum = funcRes.reduce((val, acc) => acc += val, 0)

    return gen.map((_, ind) => (
        {..._, fx: func(_.x), fnorm: funcRes[ind] / resultsSum }
    ))
}

function getExtremumUnit(gen: Unit[]) {
    const generationResults = normalizeGeneration(gen).map(_ => _.fnorm)
        , getValue = EXTREMUM_MODE === 'max' ? Math.max : Math.min

    return normalizeGeneration(gen).find(_ => _.fnorm === getValue(...generationResults))!
}

function printPopulation(population: Unit[]) {
    population.forEach(_ => console.log(_))
}

function getItemsInBackpack(items: number) {
    return dec2bin(items).split('').map((_, ind) => _ === '1' ? [state.items[ind]] : []).flat()
}

function func(arg: number) {
    const res = dec2bin(arg).split('')
        .reduce<{ sumPrice: number, sumVolume: number }>((acc, val, ind) => {
            return val === '1'
                ? { sumPrice: acc.sumPrice + state.items[ind].price, sumVolume: acc.sumVolume + state.items[ind].volume }
                : acc
        }
    , { sumPrice: 0, sumVolume: 0 })
    return res.sumVolume <= state.backpackFitness ? res.sumPrice : 0
}