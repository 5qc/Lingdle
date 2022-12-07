function error(msg: string) {
    const realLogo = <HTMLDivElement>document.querySelector(".header > .logo")
    const realNew = <HTMLDivElement>document.querySelector(".header > .new")
    
    const error = <HTMLDivElement>document.querySelector(".header > .error")
    const errorMsg = <HTMLDivElement>document.querySelector(".header > .error > .new")

    msg = msg.replace(/\<(.*?)\>/g, `<span class="logo-text">$1</span>`)
    errorMsg.innerHTML = msg

    realLogo.style.display = "none"
    realNew.style.display = "none"
    error.style.display = "block"

    setTimeout(() => {
        realLogo.style.display = "block"
        realNew.style.display = "block"
        error.style.display = "none"
    }, 2500)
}