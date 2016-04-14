
export const proj = (viewport, size) => {

    const sx = ( viewport.xMax - viewport.xMin )
    const sy = ( viewport.yMax - viewport.yMin )

    const r = Math.max( sx, sy ) / size

    return (x,y) =>
        ({
            x: ( x - viewport.xMin )/r,
            y: ( y - viewport.yMin )/r,
        })
}
