function convertCSV(data: string, type: string = "array") {
    const split: any[] = data.split("\n")
    if (type === "array") {
        for (let i = 0; i < split.length; i++) {
            const line = split[i]
            const splitLine = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g)
            split[i] = splitLine
        }

        return split
    } else if (type === "object") {
        const obj = {}
        for (let i = 0; i < split.length; i++) {
            const line = split[i].split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/g)
            const key = line[0]
            line.shift()
            let value: string|string[]
            if (line.length === 1) value = line[0]
            else value = line

            obj[key] = value
        }
        
        return obj
    }
}