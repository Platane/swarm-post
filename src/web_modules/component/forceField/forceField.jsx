import React, {Component} from 'react'
import draw from './draw'


class ForceField extends Component {

    componentWillUnmount() {
        cancelAnimationFrame( this.af )
    }

    render(){

        let { amplitude, width, height } = this.props

        width = width   || 400
        height = height || 200

        cancelAnimationFrame( this.af )
        this.af = requestAnimationFrame( () => draw( this.refs.canvas.getContext('2d'), amplitude, width, height ) )

        return (
            <div className="forceField" >

                <canvas ref="canvas" width={width} height={height} />

            </div>
        )
    }
}

export default ForceField
