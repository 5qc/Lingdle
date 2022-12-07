function stats(x: string, n: string = "all", v: any = null) {
    let stats: LingdleData = JSON.parse(localStorage.getItem(lsName))

    if (x === "get") {
        if (n === "all") return stats
        else {
            if (stats.hasOwnProperty(n)) return stats[n]
            else return null
        }
    } else if (x === "display") {
        const statsHTML = <HTMLElement>document.getElementById("stats")

        statsHTML.querySelector(".win").innerHTML = stats.winCount.toLocaleString()
        statsHTML.querySelector(".loss").innerHTML = stats.lossCount.toLocaleString()

        if ((stats.winCount / stats.lossCount).toLocaleString() === "NaN") {
            if (stats.winCount + stats.lossCount === 0) statsHTML.querySelector(".win-loss > .ratio").innerHTML = "0"
            else if (stats.lossCount === 0) statsHTML.querySelector(".win-loss > .ratio").innerHTML = "0"
            else if (stats.winCount === 0) statsHTML.querySelector(".win-loss > .ratio").innerHTML = "1"
        } else statsHTML.querySelector(".win-loss > .ratio").innerHTML = (stats.winCount / stats.lossCount).toLocaleString()

        const totalGuess: number = stats.guess1 + stats.guess2 + stats.guess3 + stats.guess4 + stats.guess5
        const bar1 = <HTMLDivElement>document.querySelectorAll(".bars > .bar")[0]
        const bar2 = <HTMLDivElement>document.querySelectorAll(".bars > .bar")[1]
        const bar3 = <HTMLDivElement>document.querySelectorAll(".bars > .bar")[2]
        const bar4 = <HTMLDivElement>document.querySelectorAll(".bars > .bar")[3]
        const bar5 = <HTMLDivElement>document.querySelectorAll(".bars > .bar")[4]

        bar1.style.width = `${(stats.guess1 / totalGuess) * 100}%`
        bar1.innerText = stats.guess1.toLocaleString()
        bar2.style.width = `${(stats.guess2 / totalGuess) * 100}%`
        bar2.innerText = stats.guess2.toLocaleString()
        bar3.style.width = `${(stats.guess3 / totalGuess) * 100}%`
        bar3.innerText = stats.guess3.toLocaleString()
        bar4.style.width = `${(stats.guess4 / totalGuess) * 100}%`
        bar4.innerText = stats.guess4.toLocaleString()
        bar5.style.width = `${(stats.guess5 / totalGuess) * 100}%`
        bar5.innerText = stats.guess5.toLocaleString()

        document.getElementById("current-streak").innerText = stats.currentStreak.toLocaleString()
        document.getElementById("longest-streak").innerText = stats.longestStreak.toLocaleString()

        const collectiveLength: number = stats.save[0].length + stats.save[1].length + stats.save[2].length + stats.save[3].length + stats.save[4].length
        const finishedGame: boolean = stats.save[5]
        if (collectiveLength !== 0) {
            const guess1 = <HTMLDivElement>document.getElementById("guess1")
            const guess2 = <HTMLDivElement>document.getElementById("guess2")
            const guess3 = <HTMLDivElement>document.getElementById("guess3")
            const guess4 = <HTMLDivElement>document.getElementById("guess4")
            const guess5 = <HTMLDivElement>document.getElementById("guess5")

            let tries: string = "first"
            if (stats.save[0].length > 0) {
                guess1.children[0].innerHTML = stats.save[0][0]
                if (stats.save[0][1] === true) guess1.children[1].classList.add("correct")
                else guess1.children[1].classList.add("incorrect")
                if (stats.save[0][2] === true) guess1.children[2].classList.add("correct")
                else guess1.children[2].classList.add("incorrect")
            } if (stats.save[1].length > 0) {
                guess2.children[0].innerHTML = stats.save[1][0]
                if (stats.save[1][1] === true) guess2.children[1].classList.add("correct")
                else guess2.children[1].classList.add("incorrect")
                if (stats.save[1][2] === true) guess2.children[2].classList.add("correct")
                else guess2.children[2].classList.add("incorrect")
                tries = "second"
            } if (stats.save[2].length > 0) {
                guess3.children[0].innerHTML = stats.save[2][0]
                if (stats.save[2][1] === true) guess3.children[1].classList.add("correct")
                else guess3.children[1].classList.add("incorrect")
                if (stats.save[2][2] === true) guess3.children[2].classList.add("correct")
                else guess3.children[2].classList.add("incorrect")
                tries = "third"
            } if (stats.save[3].length > 0) {
                guess4.children[0].innerHTML = stats.save[3][0]
                if (stats.save[3][1] === true) guess4.children[1].classList.add("correct")
                else guess4.children[1].classList.add("incorrect")
                if (stats.save[3][2] === true) guess4.children[2].classList.add("correct")
                else guess4.children[2].classList.add("incorrect")
                tries = "fourth"
            } if (stats.save[4].length > 0) {
                guess5.children[0].innerHTML = stats.save[4][0]
                if (stats.save[4][1] === true) guess5.children[1].classList.add("correct")
                else guess5.children[1].classList.add("incorrect")
                if (stats.save[4][2] === true) guess5.children[2].classList.add("correct")
                else guess5.children[2].classList.add("incorrect")
                tries = "fifth"
            }

            if (finishedGame === true) {
                const msg = <HTMLDivElement>document.querySelector(".msg")
                if (document.getElementById("input")) document.getElementById("input").style.display = "none"
                if (document.getElementById("languages")) document.getElementById("languages").style.display = "none"
                if (document.getElementById("guess")) document.getElementById("guess").style.display = "none"
                document.getElementById("share").style.display = "block"
                msg.style.display = "block"
                msg.innerText = `You guessed correctly on your ${tries} try!`
                document.getElementById("confettijs").style.display = "block"
            } else {
                if (stats.save[4].length > 0) {
                    const notice = <HTMLDivElement>document.querySelector(".notice")
                    if (document.getElementById("input")) document.getElementById("input").style.display = "none"
                    if (document.getElementById("languages")) document.getElementById("languages").style.display = "none"
                    if (document.getElementById("guess")) document.getElementById("guess").style.display = "none"
                    document.getElementById("share").style.display = "block"
                    notice.style.display = "block"
                }
            }
        }
    } else if (x === "set") {
        if (!n || (!v && v !== 0)) return null

        if (n === "all") stats = v
        if (stats.hasOwnProperty(n)) stats[n] = v
        else return null

        localStorage.setItem(lsName, JSON.stringify(stats))
        return true
    }
}