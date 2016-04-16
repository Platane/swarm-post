export const create = ( target, width, height ) => {

    let entities = []


    const updateEntities = () => {

        // remove somes
        entities = entities
            .filter( ({ k, x, y }) =>
                k < 400 && x > -10 && y > -10 && x < width+10 && y < height+10
            )
            .map( entity =>
                ({ ...entity, k:entity.k+1 })
            )

        // add
        for(let i=120 - entities.length; i--; )
            if( Math.random() > 0.995 ) {
                const y = Math.random() * ( height * 0.9 ) + height * 0.05
                entities.push({
                    x:0,
                    y:y,
                    vx:4,
                    vy:0,
                    k: 0,
                    tx: width,
                    ty: y,
                })
            }
    }

    const step = ( fn ) => {

        updateEntities()

        for( let i=entities.length; i--; ) {

            let ax=0
            let ay=0
            {
                const vx = target.x - entities[ i ].x
                const vy = target.y - entities[ i ].y

                const d = Math.sqrt( vx*vx + vy*vy )

                const a = fn( d )

                ax += a * vx /d
                ay += a * vy /d
            }

            entities[ i ].vx = entities[ i ].vx * 0.965 + ax
            entities[ i ].vy = entities[ i ].vy * 0.965 + ay

            entities[ i ].x += entities[ i ].vx
            entities[ i ].y += entities[ i ].vy
        }

    }

    return {
        step,
        entities    : () => entities,
    }
}
