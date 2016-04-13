import {step as stepWorld, initDistanceMatrix, stepDistanceMatrix} from 'compute/worldStep'
import * as root from 'fragment'

export const create = ( register, unregister, getValue ) => {

    const n_color = 3
    const width=600
    const height=600

    const entities = []
    const targets =
    [
        {x:120,y:120},
        {x:70,y:170},
        {x:170,y:70},
        ...Array.apply( null, new Array( 6 ))
            .map( () =>
            ({
                x:Math.random()*width,
                y:Math.random()*height,
            })
        )
    ]
    const fns = {}
    const dm = []

    const updateFns = ( friendAttraction, targetAttraction, neighbourRepulsion ) => {
        fns.friendAttraction = friendAttraction
        fns.targetAttraction = targetAttraction
        fns.neighbourRepulsion = neighbourRepulsion
    }

    updateFns(
        getValue( root.function.friendAttraction ),
        getValue( root.function.targetAttraction ),
        getValue( root.function.neighbourRepulsion ),
    )

    register(
        root.function.friendAttraction,
        root.function.targetAttraction,
        root.function.neighbourRepulsion,
        updateFns
    )


    const updateEntitiesNumber = ( n ) => {

        entities.length = Math.min( entities.length, n )

        while( entities.length < n ) {
            const color = (0|(Math.random()*n_color))%n_color
            entities.push({
                x:Math.random()*width,
                y:Math.random()*height,
                color,
                target: color,
                vx:0,
                vy:0
            })
        }

        dm.length=0
        dm.push( ...initDistanceMatrix( entities ) )
    }
    register(
        root.params.nEntities,
        updateEntitiesNumber
    )
    updateEntitiesNumber( getValue( root.params.nEntities ) )


    const step = () => {

        stepDistanceMatrix( dm, entities )

        stepWorld( entities, targets, dm, fns )

    }

    return {
        step,
        entities    : () => entities,
        targets     : () => targets,
        dm          : () => dm,
        destroy     : () => {
            unregister( updateFns )
        }
    }
}
