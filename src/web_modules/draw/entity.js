import {proj} from './proj'

const colors = [
    '#aaa',
    '#faa',
    '#3ea',
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

export const draw = ( ctx, entities, targets, dm, viewport, size ) =>{

    ctx.clearRect( 0,0,99999,99999 )

    drawEntities( ctx, entities, viewport, size )

    drawTargets( ctx, targets, viewport, size )

}
