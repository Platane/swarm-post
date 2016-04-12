
const distance = (ax, ay, bx, by ) => {
    const x = ax-bx
    const y = ay-by
    return Math.sqrt( x*x + y*y )
}


const drawForceField = ( ctx, amplitude, sources, l, viewport, r ) =>{

    for( let x=viewport.xMin + l/2; x< viewport.xMax; x+= l )
    for( let y=viewport.yMin + l/2; y< viewport.yMax; y+= l )
    {

        let ax = 0
        let ay = 0

        for( let k=sources.length; k --; ) {

            const vx = sources[k].x - x
            const vy = sources[k].y - y

            const d = Math.sqrt( vx*vx + vy*vy )

            const a = amplitude( d )

            ax += vx/d*a
            ay += vy/d*a
        }

        ctx.beginPath()
        ctx.lineWidth=1
        ctx.moveTo( x+ax*10, y+ay*10 )
        ctx.lineTo( x, y )
        ctx.stroke()

    }
}

const draw = ( ctx, amplitude, width, height ) =>{

    ctx.clearRect( 0,0,width,height )

    drawForceField( ctx, amplitude, [{ x: 132.12, y: 121.2 }], 10, {xMax:400, yMax:200,xMin:0, yMin:0} )

}


module.exports = draw
