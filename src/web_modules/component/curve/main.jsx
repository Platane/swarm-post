import Curve        from './curve.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [ root.points.friendAttraction, root.points.neighbourRepulsion, root.points.targetAttraction ]
    ,

    ( friendAttraction, neighbourRepulsion, targetAttraction, props ) =>
        ({
            points :
                   ( props.dataSet == 'friendAttraction' &&  friendAttraction )
                || ( props.dataSet == 'neighbourRepulsion' &&  neighbourRepulsion )
                || ( props.dataSet == 'targetAttraction' &&  targetAttraction )
                || []
        })
    ,

    {}
    ,

    Curve
)
