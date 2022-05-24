import { EXTREMUM_MODE, GENERATION_LENGTH, ITERATIONS, MAXIMUM_VALUE, MINIMUM_VALUE } from "./constants"
import { rand } from "./utils/rand"
import { roulette } from "./selection"
import { mutate } from "./mutation"
import { range } from "./utils/arrays"
import { Person } from "./state"
import { crossing } from "./crossing"

const initialGeneration = generateGeneration(GENERATION_LENGTH)
    , normalizedGeneration = normalizeGeneration(initialGeneration)

const resultGeneration =
    range(ITERATIONS)
    .reduce((gen, _) => {
        const normalized = normalizeGeneration(gen)
            , filtered = roulette(normalized)

        console.log('itreation ' + _)
        printPopulation(normalized)
        console.log('--')
        printPopulation(normalizeGeneration(filtered))

        const crossed = crossing(filtered)
            , mutated = mutate(crossed)

        console.log('extremumValue', getExtremumValue(normalizeGeneration(mutated)))

        console.log('---------')
        return mutated
    }, normalizedGeneration)


function generateGeneration(amount: number) {
    return range(amount)
        .map(_ => rand(MINIMUM_VALUE, MAXIMUM_VALUE))
        .map<Person>(_ => ({ x: _, fx: func(_) }))
}

function normalizeGeneration(gen: Person[]) {
    const funcRes = gen.map(_ => 1 / func(_.x))
        , resultsSum = funcRes.reduce((val, acc) => acc += val, 0)

    return gen.map((_, ind) => (
        {..._, fx: func(_.x), fnorm: funcRes[ind] / resultsSum }
    ))
}

function getExtremumValue(gen: Person[]) {
    const generationResults = normalizeGeneration(gen).map(_ => _.fx)
        , getValue = EXTREMUM_MODE === 0 ? Math.max : Math.min

    return getValue(...generationResults)
}

function printPopulation(population: Person[]) {
    population.forEach(_ => console.log(_))
}

function func(param: number) {
    return -(Math.pow(param, 2) - (4 * param) + 3) / MAXIMUM_VALUE
}