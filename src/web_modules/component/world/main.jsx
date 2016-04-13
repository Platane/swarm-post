import World   from './world.jsx'
import {connect}    from 'component/abstract/connect.jsx'

export default connect(

    root => [ root.function.friendAttraction, root.function.neighbourRepulsion, root.function.targetAttraction ]
    ,

    ( friendAttraction, neighbourRepulsion, targetAttraction ) =>
        ({
            fns:{
                friendAttraction,
                neighbourRepulsion,
                targetAttraction,
            }
        })
    ,

    {}
    ,

    World
)
