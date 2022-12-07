function currentDay() {
    const d: Date = new Date()

    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}