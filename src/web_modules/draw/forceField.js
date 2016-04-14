import {proj} from './proj'

export const drawForceField = ( ctx, amplitude, sources, l, viewport, r ) =>{

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

        const d = Math.sqrt( ax*ax + ay*ay )
        const h = Math.min( d*500, 1 )
        ctx.beginPath()
        ctx.lineWidth=0.5
        ctx.strokeStyle='rgba(100,100,100,0.5)'
        ctx.moveTo( x+ax/d*h*6, y+ay/d*h*6 )
        ctx.lineTo( x, y )
        ctx.stroke()

    }
}

export const drawEntities = ( ctx, entities, viewport, size ) =>{

    const _proj = proj( viewport, size )

    for( let i=entities.length; i--; )
    {

        const p = _proj( entities[i].x, entities[i].y )

        ctx.lineWidth= 1
        ctx.globalAlpha= Math.min( 1, entities[i].k / 10,  ( 400 - entities[i].k ) / 10 ) * 0.3
        ctx.strokeStyle= '#3213f2',
        ctx.beginPath()
        ctx.arc( p.x, p.y, 2, 0, Math.PI*2 )
        ctx.stroke()
        ctx.globalAlpha = 1

    }
}
