
interface Unit {
    x: number
    fx?: number
    fnorm?: number
}

interface State {
    backpackFitness: number
    items: BackpackItem[]
}

interface BackpackItem {
    price: number
    volume: number
}

const state: State = {
    backpackFitness: 14,
    items: [
        { price: 12, volume: 4 },
        { price: 8, volume: 6 },
        { price: 14, volume: 3 },
        { price: 5, volume: 8 },
        { price: 6, volume: 5 },
    ],
}

function setState(callback: (prev: State) => State) {
    Object.assign(state, callback(state))
}

export {
    Unit,
    state,
    setState,
}