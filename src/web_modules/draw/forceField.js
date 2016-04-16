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
        const vx = ax/d
        const vy = ay/d
        const h = Math.min( d*500, 1 )
        const bx = x+vx*h*4
        const by = y+vy*h*4

        ctx.strokeStyle = '#888'
        ctx.lineWidth=0.6

        ctx.beginPath()
        ctx.moveTo( bx * r, by * r )
        ctx.lineTo( x * r, y * r )
        ctx.stroke()

        if ( h>0.6 ){

            const u = 1.4
            const v = 1.6

            ctx.beginPath()
            ctx.moveTo( ( bx +vy*u -vx*v ) * r , ( by -vx*u -vy*v ) * r )
            ctx.lineTo( bx *r , by *r )
            ctx.lineTo( ( bx -vy*u -vx*v ) * r , ( by +vx*u -vy*v ) * r )
            ctx.stroke()
        }



    }
}

export const drawEntities = ( ctx, entities, viewport, size ) =>{

    const _proj = proj( viewport, size )

    for( let i=entities.length; i--; )
    {

        const p = _proj( entities[i].x, entities[i].y )

        ctx.lineWidth= 1
        ctx.globalAlpha= Math.min( 1, entities[i].k / 5,  ( 400 - entities[i].k ) / 20 ) * 0.3
        ctx.strokeStyle= '#d82323',
        ctx.beginPath()
        ctx.arc( p.x, p.y, 2, 0, Math.PI*2 )
        ctx.stroke()
        ctx.globalAlpha = 1

    }
}
