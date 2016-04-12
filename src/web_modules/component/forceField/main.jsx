import ForceField   from './forceField.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [ root.function.friendAttraction, root.function.neighbourRepulsion, root.function.targetAttraction ]
    ,

    ( friendAttraction, neighbourRepulsion, targetAttraction, props ) =>
        ({
            amplitude :
                   ( props.dataSet == 'friendAttraction' &&  friendAttraction )
                || ( props.dataSet == 'neighbourRepulsion' &&  neighbourRepulsion )
                || ( props.dataSet == 'targetAttraction' &&  targetAttraction )
                || []
        })
    ,

    {}
    ,

    ForceField
)
