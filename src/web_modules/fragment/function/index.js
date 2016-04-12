
import * as friendAttractionParams      from 'fragment/params/friendAttraction'
import * as targetAttractionParams      from 'fragment/params/targetAttraction'
import * as neighbourRepulsionParams    from 'fragment/params/neighbourRepulsion'
import * as fn  from 'compute/physique'

export const friendAttraction = ( ...params ) =>
    fn.friendAttraction( ...params )

friendAttraction.dependencies = [
    friendAttractionParams.d0,
    friendAttractionParams.fatness,
    friendAttractionParams.friendlyness,
    friendAttractionParams.revulsion,
]

export const targetAttraction = ( ...params ) =>
    fn.targetAttraction( ...params )

targetAttraction.dependencies = [
    targetAttractionParams.k,
]


export const neighbourRepulsion = ( ...params ) =>
    fn.neighbourRepulsion( ...params )

neighbourRepulsion.dependencies = [
    neighbourRepulsionParams.k,
]
