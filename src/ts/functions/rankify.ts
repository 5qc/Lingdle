function rankify(num: number, type: string = "number") {
    if (type === "number") {
        if (num === 1) return "1st"
        if (num === 2) return "2nd"
        if (num === 3) return "3rd"
        if (num === 4) return "4th"
        if (num === 5) return "5th"
    } else if (type === "word") {
        if (num === 1) return "first"
        if (num === 2) return "second"
        if (num === 3) return "third"
        if (num === 4) return "fourth"
        if (num === 5) return "fifth"
    }
}