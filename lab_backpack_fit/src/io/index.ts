import lineReader from 'line-reader'
import path from 'path'
import { FILE_NAME } from '../constants'
import { setState } from '../state'

function readState() {
    return new Promise<void>((resolve, _) => {
        const pathname = path.join(path.resolve('./'), 'res', FILE_NAME)
        let i = 0
        lineReader.eachLine(pathname, (line, last) => {
            const values = line.split(' ')
            if (i === 0)
                setState(_ => ({ backpackFitness: +values[1], items: [] }))
            else
                setState(prev => (
                    { ...prev, items: [...prev.items, { price: +values[0], volume: +values[1] }] }
                ))
            i++
            if (last) {
                resolve()
                return false
            }
        })
    })
}

export {
    readState,
}