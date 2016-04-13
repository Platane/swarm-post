
const distance = (ax, ay, bx, by ) => {
    const x = ax-bx
    const y = ay-by
    return Math.sqrt( x*x + y*y )
}

const proj = (viewport, size) =>
    (x,y) =>
        ({
            x: ( x - viewport.xMin )/( viewport.xMax - viewport.xMin ) * size,
            y: ( y - viewport.yMin )/( viewport.yMax - viewport.yMin ) * size,
        })

const colors = [
    '#aaa',
    '#faa',
    '#3ea',
]

const drawEntities = ( ctx, entities, viewport, size ) =>{

    const _proj = proj( viewport, size )

    for( let i=entities.length; i--; )
    {

        const p = _proj( entities[i].x, entities[i].y )

        ctx.lineWidth=1
        ctx.strokeStyle= colors[ entities[i].color ]
        ctx.beginPath()
        ctx.arc( p.x, p.y, 2, 0, Math.PI*2 )
        ctx.stroke()

    }
}
const drawTargets = ( ctx, targets, viewport, size ) =>{

    const _proj = proj( viewport, size )

    for( let i=targets.length; i--; )
    {

        const p = _proj( targets[i].x, targets[i].y )

        ctx.lineWidth=1
        ctx.strokeStyle = colors[ i ] || 'rgb(220, 220 ,220)'
        ctx.beginPath()
        ctx.arc( p.x, p.y, 13, 0, Math.PI*2 )
        ctx.stroke()

    }
}

const draw = ( ctx, entities, targets, dm, viewport, size ) =>{

    ctx.clearRect( 0,0,99999,99999 )

    drawEntities( ctx, entities, viewport, size )

    drawTargets( ctx, targets, viewport, size )

}


module.exports = draw
