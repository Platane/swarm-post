import React, {PropTypes, Component} from 'react'
const root = require('fragment')

export const connect = ( getDependencies, getState, methods, C ) => {

    class Connect extends Component {

        static contextTypes = {
            dispatch       : PropTypes.func.isRequired,
            register       : PropTypes.func.isRequired,
            unregister     : PropTypes.func.isRequired,
            getValue       : PropTypes.func.isRequired,
        };

        constructor( ){
            super()

            this.state = {}

            this._update = ( ...args ) =>
                this.setState( getState( ...args, this.props ) )
        }

        shouldComponentUpdate(nextProps, nextState) {

            for ( let key in nextProps )
                if ( this.props[ key ] != nextProps[ key ] )
                    return true

            for ( let key in nextState )
                if ( this.state[ key ] != nextState[ key ] )
                    return true

            return false
        }

        componentDidMount() {

            this._mounted=true

            const dep = getDependencies( root )

            this.context.register( ...dep, this._update )

            this._methods = {}
            for ( let key in methods )
                this._methods[ key ] = ( ...args ) => methods[ key ]( this.context.dispatch, this.context.getValue, this.props, ...args )


            this._update( ...dep.map( fragment => this.context.getValue( fragment ) ) )
        }

        componentWillUnmount() {
            this._mounted=false
            this.context.unregister( this._update )
        }

        render(){
            if ( !this._mounted )
                return null
            return <C {...this.state} {...this._methods} />
        }
    }

    return Connect
}
