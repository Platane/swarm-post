import React, {Component, PropTypes} from 'react'

const getPointerX = event =>
    event.targetTouches ? event.targetTouches[ 0 ].clientX : event.clientX

const getPointerY = event =>
    event.targetTouches ? event.targetTouches[ 0 ].clientY : event.clientY

class Slidable extends Component {

    static propTypes = {

        downFn  : PropTypes.func,
        upFn    : PropTypes.func,
        moveFn  : PropTypes.func,
    };

    constructor( ...args ) {

        super( ...args )


        this._down = event => {

            this.props.downFn && this.props.downFn()

            event.preventDefault()
            event.stopPropagation()

            window.removeEventListener( 'mousemove',    this._move )
            window.removeEventListener( 'touchmove',    this._move )
            window.removeEventListener( 'mouseup',      this._up )
            window.removeEventListener( 'touchend',     this._up)
            window.removeEventListener( 'touchcancel',  this._up)
            window.addEventListener( 'mousemove',    this._move )
            window.addEventListener( 'touchmove',    this._move )
            window.addEventListener( 'mouseup',      this._up )
            window.addEventListener( 'touchend',     this._up)
            window.addEventListener( 'touchcancel',  this._up)

            this._move( event )
        }
        this._move = event => {


            const {bottom, top, right, left} = this.refs.container.getBoundingClientRect()

            const x = getPointerX( event )
            const y = getPointerY( event )

            const kx = ( x - left )/( right - left )
            const ky = ( y - top )/( bottom - top )

            this.props.moveFn && this.props.moveFn( {bottom, top, right, left, kx, ky, x, y} )
        }
        this._up = event => {

            this.props.upFn && this.props.upFn()

            window.removeEventListener( 'mousemove',    this._move )
            window.removeEventListener( 'touchmove',    this._move )
            window.removeEventListener( 'mouseup',      this._up )
            window.removeEventListener( 'touchend',     this._up)
            window.removeEventListener( 'touchcancel',  this._up)
        }
    }

    componentWillUnmount() {
        window.removeEventListener( 'mousemove',    this._move )
        window.removeEventListener( 'touchmove',    this._move )
        window.removeEventListener( 'mouseup',      this._up )
        window.removeEventListener( 'touchend',     this._up)
        window.removeEventListener( 'touchcancel',  this._up)
    }

    render(){

        return (
            <div style={{width:'100%', height:'100%'}} onMouseDown = { this._down } onTouchStart= { this._down } ref='container'>
                { this.props.children }
            </div>
        )
    }
}


export default Slidable
