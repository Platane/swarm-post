import {proj} from './proj'

const colors = [
    '#9c1818',
    '#d0be21',
    '#756947',
]

export const drawEntities = ( ctx, entities, viewport, size ) =>{

    const _proj = proj( viewport, size )

    for( let i=entities.length; i--; )
    {

        const p = _proj( entities[i].x, entities[i].y )

        ctx.lineWidth= 1
        ctx.strokeStyle= colors[ entities[i].color ]
        ctx.beginPath()
        ctx.arc( p.x, p.y, 2, 0, Math.PI*2 )
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo( p.x, p.y )
        ctx.lineTo( p.x - entities[i].vx * 5 , p.y - entities[i].vy * 5  )
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
export const drawLinks = ( ctx, entities, dm, viewport, size ) =>{

    const _proj = proj( viewport, size )

    ctx.save()

    let delta
    const m = 20
    const f = 20
    for( let i=entities.length; i--; )
    for( let j=i; j--; )
        if ( (i+j) % 3 == 1 && entities[i].color == entities[j].color && (delta = Math.abs( dm[i][j].d - m ) ) < f ){

            const a = _proj( entities[i].x, entities[i].y )
            const b = _proj( entities[j].x, entities[j].y )

            ctx.lineWidth= 1
            ctx.globalAlpha= Math.min( 1, (f - delta) * 1.0 / f ) * 0.4
            ctx.strokeStyle= colors[ entities[i].color ]
            ctx.beginPath()
            ctx.moveTo( a.x, a.y )
            ctx.lineTo( b.x, b.y )
            ctx.stroke()
        }

    ctx.restore()
}

export const draw = ( ctx, entities, targets, dm, viewport, size ) =>{

    ctx.clearRect( 0,0,99999,99999 )

    drawEntities( ctx, entities, viewport, size )

    drawTargets( ctx, targets, viewport, size )

    drawLinks( ctx, entities, dm, viewport, size )

}
