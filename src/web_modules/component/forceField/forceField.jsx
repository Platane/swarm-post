import React, {Component} from 'react'
import {drawEntities}   from 'draw/forceField'
import {drawForceField} from 'draw/forceField'
import {create}         from './simulation'


class ForceField extends Component {

    constructor(){
        super()

        this._loop = this._loop.bind(this)
    }

    componentDidMount() {
        this._sim = create( )
        this._loop()
    }

    componentWillUnmount() {
        cancelAnimationFrame( this.af )
    }

    _loop(){

        this._sim && this._sim.step( this.props.amplitude )

        this.refs.entity && this.refs.entity.getContext('2d').clearRect( 0,0,9999,9999 )

        this._sim && this.refs.entity && drawEntities(
            this.refs.entity.getContext('2d'),
            this._sim.entities(),
            {xMax:400, yMax:200,xMin:0, yMin:0},
            400
        )

        cancelAnimationFrame( this.af )
        this.af = requestAnimationFrame( this._loop )
    }

    componentWillUnmount() {
        cancelAnimationFrame( this.af )
        cancelAnimationFrame( this.ffaf )
    }

    render(){

        let { amplitude, width, height } = this.props

        width = width   || 400
        height = height || 200

        cancelAnimationFrame( this.ffaf )
        this.ffaf = requestAnimationFrame( () => {

            this.refs.forceField.getContext('2d').clearRect( 0,0,width,height )

            drawForceField( this.refs.forceField.getContext('2d'), amplitude, [{ x: 100, y: 100 }], 10, {xMax:width, yMax:height,xMin:0, yMin:0} )

        })

        return (
            <div className="forceField" >

                <canvas ref="forceField" width={width} height={height} />

                <canvas ref="entity" width={width} height={height} />

            </div>
        )
    }
}

export default ForceField
