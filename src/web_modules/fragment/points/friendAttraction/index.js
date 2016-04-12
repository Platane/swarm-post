import {xRange} from 'fragment/points/xRange'
import {k}      from 'fragment/params/friendAttraction'

export const points = ( xRange, k ) =>
xRange.map( x =>
    ({
        x : x,
        y : x
    })
)

points.dependencies = [ xRange, k ]
