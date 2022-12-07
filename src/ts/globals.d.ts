type ConfettiSettings = {
    target: string,
    max?: number,
    size?: number,
    animate?: boolean,
    respawn?: boolean,
    clock?: number,
    props?: string|Object[],
    colors?: [number, number, number][],
    start_from_edge?: boolean,
    width?: number,
    height?: number,
    rotate?: boolean
}