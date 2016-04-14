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
    ]
    ,

    ( nrk, tak, d0, fatness, revulsion, friendlyness, nEntities, props ) => {

        switch( props.prop ){

            case 'neighbourRepulsion.k':
                return {
                    name    : 'k',
                    value   : nrk,
                    min     : 0,
                    max     : 10,
                }
            case 'targetAttraction.k':
                return {
                    name    : 'k',
                    value   : tak,
                    min     : 0,
                    max     : 0.5,
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
                    max     : 10,
                }
            case 'friendAttraction.friendlyness':
                return {
                    name    : 'friendlyness',
                    value   : friendlyness,
                    min     : 0,
                    max     : 0.1,
                }
            case 'nEntities':
                return {
                    name    : 'nEntities',
                    value   : nEntities,
                    min     : 1,
                    max     : 1000,
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
