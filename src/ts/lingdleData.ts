type LingdleData = {
    save: [[string, boolean, boolean]|[], [string, boolean, boolean]|[], [string, boolean, boolean]|[], [string, boolean, boolean]|[], [string, boolean, boolean]|[], boolean, string],
    winCount: number,
    lossCount: number,
    guess1: number,
    guess2: number,
    guess3: number,
    guess4: number,
    guess5: number,
    currentStreak: number,
    longestStreak: number,
    shareMsg: string
}

const baseLingdleData: LingdleData = {
    save: [[], [], [], [], [], false, "12/6/2022"],
    winCount: 0,
    lossCount: 0,
    guess1: 0,
    guess2: 0,
    guess3: 0,
    guess4: 0,
    guess5: 0,
    currentStreak: 0,
    longestStreak: 0,
    shareMsg: ""
}