
export const stepDistanceMatrix = ( dm, entities ) => {

    const max_significant_distant = 500
    const max_v = 4 * 2

    for(let i=dm.length; i--;)
    for(let j=i; j--;){

        const e = dm[ i ][ j ]

        if ( e.far-- ) {

            const vx = entities[ j ].x - entities[ i ].x
            const vy = entities[ j ].y - entities[ i ].y

            const d = Math.sqrt( vx*vx + vy*vy )

            const l = d - max_significant_distant

            const e_ = dm[ j ][ i ]


            const _vx = vx/d
            const _vy = vy/d


            e.vx = _vx
            e.vy = _vy

            e_.vx = -_vx
            e_.vy = -_vy

            e.d = e_.d = d
            e.far = e_.far = Math.max( 0, 0|( l / max_v ) )
        }
    }
}

export const initDistanceMatrix = entities => {

    const dm = Array.apply( null, new Array( entities.length ) )
        .map( (_, i) => Array.apply( null, new Array( entities.length  ) )
            .map( () => ({ far:1, d:500, vx:0, vy:0 }) )
        )

    stepDistanceMatrix( dm, entities )

    return dm
}


export const step = ( entities, targets, dm, fns ) => {

    for( let i=entities.length; i--; ) {

        let ax = 0
        let ay = 0

        for( let j=entities.length; j--; ) {


            let {vx, vy, d, far } = dm[ i ][ j ]

            if ( !far ) {

                const amplitude = entities[i].color == entities[j].color
                    ? fns.friendAttraction( d )
                    : fns.neighbourRepulsion( d )

                ax += vx * amplitude
                ay += vy * amplitude
            }
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

        entities[i].vx = entities[i].vx * 0.965 + vx
        entities[i].vy = entities[i].vy * 0.965 + vy

        entities[i].x += entities[i].vx
        entities[i].y += entities[i].vy


        if ( d < 15 )
            entities[i].target = entities[i].target == entities[i].color
                ? 3+ (0|(Math.random()*(targets.length-3)))
                : entities[i].color
    }

}
