import React, {Component, PropTypes} from 'react'
import draw         from './draw'
import {create}     from './simulation'


class World extends Component {

    static contextTypes = {
        register       : PropTypes.func.isRequired,
        unregister     : PropTypes.func.isRequired,
        getValue       : PropTypes.func.isRequired,
    };

    constructor(){
        super()

        this._loop = this._loop.bind(this)
    }

    componentDidMount() {
        this._sim = create( this.context.register, this.context.unregister, this.context.getValue )
        this._loop()
    }

    componentWillUnmount() {
        cancelAnimationFrame( this.af )
    }

    _loop(){

        this._sim && this._sim.step()

        this._sim && this.refs.canvas && draw(
            this.refs.canvas.getContext('2d'),
            this._sim.entities(),
            this._sim.targets(),
            this._sim.dm(),
            {xMax:600, yMax:600,xMin:0, yMin:0},
            600
        )

        cancelAnimationFrame( this.af )
        this.af = requestAnimationFrame( this._loop )
    }

    render(){

        let { width, height } = this.props

        width = width   || 600
        height = height || 600

        this._loop()

        return (
            <div className="world" >

                <canvas ref="canvas" width={width} height={height} />

            </div>
        )
    }
}

export default World
