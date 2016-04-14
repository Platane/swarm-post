import ForceField   from './forceField.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [ root.function.friendAttraction, root.function.neighbourRepulsion, root.function.targetAttraction ]
    ,

    ( friendAttraction, neighbourRepulsion, targetAttraction, props ) =>
        ({
            amplitude :
                   ( props.dataset == 'friendAttraction' &&  friendAttraction )
                || ( props.dataset == 'neighbourRepulsion' &&  neighbourRepulsion )
                || ( props.dataset == 'targetAttraction' &&  targetAttraction )
                || [],
        })
    ,

    {}
    ,

    ForceField
)
