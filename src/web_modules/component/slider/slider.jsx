import React, {Component}   from 'react'
import Slidable             from 'component/abstract/slidable.jsx'

const printNumber = (x, decimal=2) => {

    if ( decimal == 0 )
        return Math.round( x )

    const u = 0|x

    const arr = (x+'').split('.')
    let d = arr.length == 1
        ? ''
        : arr[1].slice(0,decimal)

    while( d.length < decimal )
        d=d+'0'
        
    return u+'.'+d
}

class Slider extends Component {


    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.value != this.props.value
            || nextProps.name  != this.props.name
    }

    change({ kx }) {

        const k = Math.max(Math.min(1,kx),0)
        const kr = Math.round( k * 1000 ) /1000
        this.props.change( kr * ( this.props.max - this.props.min ) + this.props.min  )
    }

    render(){

        const { name, value, min, max } = this.props

        const k = ( value - min )/( max - min )

        const precision = Math.max( 0, -Math.floor( Math.log( max - min )/Math.LN10 -1.5 ) )

        return (

            <div className="slider" >

                <div className="slider-name" >{ name }</div>

                <div className="slider-value" >{ printNumber(value, precision ) }</div>


                <div className="slider-bar" >

                    <Slidable moveFn={ this.change.bind(this) }>
                        <div className="slider-bar-line" />

                        <div className="slider-bar-fullLine" style={{ width: `${k*100}%` }} />

                        <div className="slider-bar-carret" style={{ left: `calc( ${k*100}% - 4px )` }} />
                    </Slidable>

                </div>

            </div>
        )
    }
}

export default Slider
