
import * as fn from 'fragment/function'

export const xRange = () =>
    Array.apply(null, new Array( 50 ))
        .map( (_, i) => i * 2  )


export const neighbourRepulsion = ( xRange, fn ) =>
    xRange.map( x => ({ x:x, y:fn( x ) }) )
neighbourRepulsion.dependencies = [ xRange, fn.neighbourRepulsion ]

export const targetAttraction = ( xRange, fn ) =>
    xRange.map( x => ({ x:x, y:fn( x ) }) )
targetAttraction.dependencies = [ xRange, fn.targetAttraction ]

export const friendAttraction = ( xRange, fn ) =>
    xRange.map( x => ({ x:x, y:fn( x ) }) )
friendAttraction.dependencies = [ xRange, fn.friendAttraction ]
