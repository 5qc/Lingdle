const lsName: string = "lingdleData-_--doWSaN6BR4"

// update the timer at top
function updateTime() {
    document.getElementById("new-time").innerHTML = timeUntilTmrw()

    setTimeout(updateTime, 10)
}
updateTime()

// @ts-ignore || some local storage
if (!localStorage.getItem(lsName)) localStorage.setItem(lsName, JSON.stringify(baseLingdleData))
if (stats("get", "save")[6] !== currentDay()) stats("set", "save", [[], [], [], [], [], false, currentDay()])
stats("display")

// some code for the datalist
const languages = <HTMLDataListElement>document.getElementById("languages")
const input = <HTMLInputElement>document.getElementById("input")
const table = <HTMLTableElement>document.querySelector(".table")
const msg = <HTMLDivElement>document.querySelector(".msg")

input.onkeyup = () => {
    for (let option of languages.options) {
        if (!option.innerText.toLowerCase().includes(input.value.toLowerCase())) option.style.display = "none"
        else option.style.display = "block"
    }
}

// code for displaying the text and whatnot lol
const notice = <HTMLDivElement>document.querySelector(".notice")
let shareMsg: string = ""

fetch("langdata.csv").then(response => response.text()).then((langData: any) => {
    langData = convertCSV(langData, "object")

    // some more functionality for the datalist
    const languagesList = Object.keys(langData).sort((a, b) => {
        if (a > b) return 1
        else return -1
    })

    for (let i = 0; i < languagesList.length; i++) {
        const lang = languagesList[i]
        const langVal = lang.toLowerCase().replace(/ /g, "-")
        languages.innerHTML += `<option data-value="${langVal}">${lang}</option>`
    }

    for (let option of languages.options) {
        option.onclick = () => {
            input.value = option.innerText
        }
    }

    fetch("lingdle.csv").then(response => response.text()).then((lingdleData: any) => {
        const data: Object = convertCSV(lingdleData, "object")
        const phrase = <HTMLSpanElement>document.querySelector(".phrase span")
        const phraseParent = <HTMLDivElement>document.querySelector(".phrase")
    
        const now = new Date()
        const date = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`
        
        if (data.hasOwnProperty(date)) {
            const today = data[date]
            phrase.innerText = today[0]
            notice.innerText = today[2]

            const todayData = langData[today[2].trim()]
            todayData[1] = todayData[1].trim()
    
            phrase.onclick = () => {
                phraseParent.classList.add("expand")
                setTimeout(() => {
                    phraseParent.classList.remove("expand")
                }, 500)

                if (phrase.innerText === today[0]) phrase.innerText = today[1]
                else phrase.innerText = today[0]
            }

            // make the guess button work (who would've thought???)
            const guess = <HTMLButtonElement>document.getElementById("guess")
            guess.onclick = () => {
                const val = titleCase(input.value.toLowerCase())
                
                if (langData.hasOwnProperty(val)) {
                    let availableRow: number = 0
                    for (let i = 1; i < 6; i++) {
                        const row = <HTMLTableRowElement>document.getElementById(`guess${i}`)
                        const first = row.querySelector("td")
                        
                        if (first.innerHTML !== "&nbsp;") continue

                        availableRow = i
                        break
                    }
                    
                    if (availableRow !== 0) {
                        const inputData = langData[val]
                        const row = <HTMLTableRowElement>document.getElementById(`guess${availableRow}`)
                        const rowName = row.children[0]
                        const rowFamily = row.children[1]
                        const rowSystem = row.children[2]
                        rowName.innerHTML = val

                        let theStats = stats("get")
                        theStats.save[availableRow - 1] = [
                            val,
                            inputData[0].split("|").some(r => todayData[0].split("|").includes(r)) ? true : false,
                            inputData[0].split("|").some(r => todayData[0].split("|").includes(r)) ? true : false
                        ]
                        localStorage.setItem(lsName, JSON.stringify(theStats))

                        row.classList.add("expand-2_reverse")
                        setTimeout(() => {
                            row.classList.remove("expand-2_reverse")
                        }, 1000)

                        if (inputData[0].split("|").some(r => todayData[0].split("|").includes(r))) rowFamily.classList.add("correct")
                        else rowFamily.classList.add("incorrect")

                        if (inputData[0].split("|").some(r => todayData[0].split("|").includes(r))) rowSystem.classList.add("correct")
                        else rowSystem.classList.add("incorrect")

                        if (today[2].trim() === val.trim()) {
                            input.remove()
                            languages.remove()
                            guess.remove()
                            msg.style.display = "block"

                            theStats.save[5] = true
                            theStats.winCount = theStats.winCount += 1
                            theStats.currentStreak = theStats.currentStreak += 1
                            if (theStats.currentStreak > theStats.longestStreak) theStats.longestStreak = theStats.currentStreak
                            theStats[`guess${availableRow}`] = theStats[`guess${availableRow}`] += 1
                            localStorage.setItem(lsName, JSON.stringify(theStats))
                            stats("set", "shareMsg", `${stats("get", "shareMsg")}🟩🟩🟩%0a`)
                            document.getElementById("share").onclick = () => {
                                window.open(`https://twitter.com/intent/tweet?text=${currentDay()}%0a${stats("get", "shareMsg")}&hashtags=lingdle`, "_blank").focus()
                            }
                            document.getElementById("confettijs").style.display = "block"

                            stats("display")

                            msg.innerText = `You guessed correctly on your ${rankify(availableRow, "word")} try!`
                        } else {
                            if (availableRow === 5) {
                                input.remove()
                                languages.remove()
                                guess.remove()

                                theStats.lossCount = theStats.lossCount += 1
                                theStats.currentStreak = 0
                                localStorage.setItem(lsName, JSON.stringify(theStats))
                                stats("display")

                                if (rowFamily.classList.contains("correct") && rowSystem.classList.contains("correct")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟩🟩%0a`)
                                } else if (rowFamily.classList.contains("correct") && rowSystem.classList.contains("incorrect")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟩🟥%0a`)
                                } else if (rowFamily.classList.contains("incorrect") && rowSystem.classList.contains("correct")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟥🟩%0a`)
                                } else {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟥🟥%0a`)
                                }
                                document.getElementById("share").onclick = () => {
                                    window.open(`https://twitter.com/intent/tweet?text=${currentDay()}%0a${stats("get", "shareMsg")}&hashtags=lingdle`, "_blank").focus()
                                }

                                notice.style.display = "block"
                                notice.innerText = today[2]
                            } else {
                                if (rowFamily.classList.contains("correct") && rowSystem.classList.contains("correct")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟩🟩%0a`)
                                } else if (rowFamily.classList.contains("correct") && rowSystem.classList.contains("incorrect")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟩🟥%0a`)
                                } else if (rowFamily.classList.contains("incorrect") && rowSystem.classList.contains("correct")) {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟥🟩%0a`)
                                } else {
                                    stats("set", "shareMsg", `${stats("get", "shareMsg")}⬛🟥🟥%0a`)
                                }
                                document.getElementById("share").onclick = () => {
                                    window.open(`https://twitter.com/intent/tweet?text=${currentDay()}%0a${stats("get", "shareMsg")}&hashtags=lingdle`, "_blank").focus()
                                }
                            }
                        }
                    }
                } else {
                    error(`Language <${input.value}> does not exist!`)
                }
            }
        } else {
            const guess = <HTMLButtonElement>document.getElementById("guess")
            const n = <HTMLDivElement>document.querySelector(".header > .new")

            phrase.innerText = "Until next time..."
            table.remove()
            input.remove()
            languages.remove()
            guess.remove()
            n.style.display = "none"
        }
    })
})

// section changing
const logo = <HTMLDivElement>document.querySelector(".logo")
const logoText = <HTMLDivElement>document.querySelector(".logo > .text")

let activeSection = "home"

const section = {
    home: <HTMLElement>document.getElementById("home"),
    stats: <HTMLElement>document.getElementById("stats")
}

logo.onclick = () => {
    if (activeSection === "home") {
        activeSection = "stats"
        section.home.style.display = "none"
        section.stats.style.display = "block"

        if (window.innerWidth < 600) logoText.style.transform = "translateY(-45px)"
        else logoText.style.transform = "translateY(-60px)"
    } else if (activeSection === "stats") {
        activeSection = "home"
        section.home.style.display = "block"
        section.stats.style.display = "none"

        logoText.style.transform = "translateY(0px)"
    }
}

document.getElementById("share").onclick = () => {
    window.open(`https://twitter.com/intent/tweet?text=${currentDay()}%0a${stats("get", "shareMsg")}&hashtags=lingdle`, "_blank").focus()
}