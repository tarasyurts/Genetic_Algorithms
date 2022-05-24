function rand(min: number, max: number, places?: number): number {
    if (Number.isInteger(min) && Number.isInteger(max))
        return Math.floor(Math.random() * (max - min + 1)) + min

    return +((Math.random() * (max - min + 1)) + min).toFixed(places);
}

export {
    rand,
}