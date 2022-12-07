function timeUntilTmrw() {
    const now: Date = new Date()
    const t: number = now.getDate()
    const today: Date = new Date(now)
    let tomorrow: Date|string|number = new Date(now)
    tomorrow.setDate(t + 1)

    tomorrow = new Date(`${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`).getTime()

    let tUntil: number = tomorrow - now.getTime()
    const ms = tUntil % 1000;
    tUntil = (tUntil - ms) / 1000;
    const secs = tUntil % 60;
    tUntil = (tUntil - secs) / 60;
    const mins = tUntil % 60;
    const hrs = (tUntil - mins) / 60;

    let strSecs = secs <= 9 ? "0" + secs.toLocaleString() : secs.toLocaleString()
    let strMins = mins <= 9 ? "0" + mins.toLocaleString() : mins.toLocaleString()
    let strHrs = hrs <= 9 ? "0" + hrs.toLocaleString() : hrs.toLocaleString()

    return `${strHrs}:${strMins}:${strSecs}`
}