import {xRange} from 'fragment/points/xRange'
import {k}      from 'fragment/params/neighbourRepulsion'

export const points = ( xRange, k ) =>
    xRange.map( x =>
        ({
            x : x,
            y : - k * Math.min( 1 / ( x * x ) , 100 )
        })
    )

points.dependencies = [ xRange, k ]
