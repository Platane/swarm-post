
export const stepDistanceMatrix = ( dm, entities ) => {

    for(let i=dm.length; i--;)
    for(let j=dm.length; j--;){

        const vx = entities[ j ].x - entities[ i ].x
        const vy = entities[ j ].y - entities[ i ].y

        const d = Math.sqrt( vx*vx + vy*vy )

        dm[ i ][ j ].vx = vx/d
        dm[ i ][ j ].vy = vy/d
        dm[ i ][ j ].d = d

    }
}

export const initDistanceMatrix = entities => {

    const dm = Array.apply( null, new Array( entities.length ) )
        .map( (_, i) => Array.apply( null, new Array( entities.length  ) )
            .map( () => ({ d:0, vx:0, vy:0 }) )
        )

    stepDistanceMatrix( dm, entities )

    return dm
}


export const step = ( entities, targets, dm, fns ) => {

    for( let i=entities.length; i--; ) {

        let ax = 0
        let ay = 0

        for( let j=entities.length; j--; )

            if ( i != j ){

                let {vx, vy, d } = dm[ i ][ j ]

                const amplitude = entities[i].color == entities[j].color
                    ? fns.friendAttraction( d )
                    : fns.neighbourRepulsion( d )

                ax += vx * amplitude
                ay += vy * amplitude
            }

        let d
        {
            const vx = targets[ entities[i].target ].x - entities[i].x
            const vy = targets[ entities[i].target ].y - entities[i].y

            d = Math.sqrt( vx*vx + vy*vy )

            const amplitude = fns.targetAttraction( d )

            ax += vx/d * amplitude
            ay += vy/d * amplitude
        }

        const vx = ax
        const vy = ay

        entities[i].vx = entities[i].vx * 0.95 + vx
        entities[i].vy = entities[i].vy * 0.95 + vy

        entities[i].x += entities[i].vx
        entities[i].y += entities[i].vy


        if ( d < 15 )
            entities[i].target = entities[i].target == entities[i].color
                ? 3+ (0|(Math.random()*(targets.length-3)))
                : entities[i].color
    }

}
