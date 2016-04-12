import {xRange} from 'fragment/points/xRange'
import {k}      from 'fragment/params/targetAttraction'

export const points = ( xRange, k ) =>
xRange.map( x =>
    ({
        x : x,
        y : k
    })
)

points.dependencies = [ xRange, k ]
