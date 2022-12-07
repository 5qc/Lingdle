if (document.getElementById("confettijs") !== null) {
    const confettiSettings: ConfettiSettings = {
        target: "confettijs",
        colors: [
            [254, 163, 170],
            [248, 184, 139],
            [250, 248, 132],
            [186, 237, 145],
            [178, 206, 254],
            [242, 162, 232]
        ],
        rotate: true
    }
    // @ts-ignore
    const confetti = new ConfettiGenerator(confettiSettings)
    confetti.render()
}