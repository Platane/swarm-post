import Curve        from './curve.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [ root.points.friendAttraction, root.points.neighbourRepulsion, root.points.targetAttraction ]
    ,

    ( friendAttraction, neighbourRepulsion, targetAttraction, props ) =>
        ({
            points :
                   ( props.dataset == 'friendAttraction' &&  friendAttraction )
                || ( props.dataset == 'neighbourRepulsion' &&  neighbourRepulsion )
                || ( props.dataset == 'targetAttraction' &&  targetAttraction )
                || []
        })
    ,

    {}
    ,

    Curve
)
