import Slider       from './slider.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [
        root.params.neighbourRepulsion.k,
        root.params.targetAttraction.k,
        root.params.friendAttraction.d0,
        root.params.friendAttraction.fatness,
        root.params.friendAttraction.revulsion,
        root.params.friendAttraction.friendlyness,
        root.params.nEntities,
        root.params.inertia,
    ]
    ,

    ( nrk, tak, d0, fatness, revulsion, friendlyness, nEntities, inertia, props ) => {

        switch( props.prop ){

            case 'neighbourRepulsion.k':
                return {
                    name    : 'k',
                    value   : nrk,
                    min     : 0,
                    max     : 200,
                }
            case 'targetAttraction.k':
                return {
                    name    : 'k',
                    value   : tak,
                    min     : 0,
                    max     : 2.5,
                }
            case 'friendAttraction.d0':
                return {
                    name    : 'd0',
                    value   : d0,
                    min     : 0,
                    max     : 50,
                }
            case 'friendAttraction.fatness':
                return {
                    name    : 'fatness',
                    value   : fatness,
                    min     : 0,
                    max     : 50,
                }
            case 'friendAttraction.revulsion':
                return {
                    name    : 'revulsion',
                    value   : revulsion,
                    min     : 0,
                    max     : 200,
                }
            case 'friendAttraction.friendlyness':
                return {
                    name    : 'friendlyness',
                    value   : friendlyness,
                    min     : 0,
                    max     : 1,
                }
            case 'nEntities':
                return {
                    name    : 'nEntities',
                    value   : nEntities,
                    min     : 1,
                    max     : 450,
                }
            case 'inertia':
                return {
                    name    : 'inertia',
                    value   : inertia,
                    min     : 0,
                    max     : 0.999,
                }
        }
    }
    ,

    {
        change: ( dispatch, _, props, value ) =>
            dispatch( {type: 'params:'+props.prop.replace('.',':')+':set', payload:{value} } )

    }
    ,

    Slider
)
