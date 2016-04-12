import React, {PropTypes, Component} from 'react'

class Contextify extends Component {

    static propsTypes = {
        dispatch      : PropTypes.func.isRequired,
        getValue      : PropTypes.func.isRequired,
        register      : PropTypes.func.isRequired,
        unregister    : PropTypes.func.isRequired,
    };

    static childContextTypes = {
        dispatch      : PropTypes.func.isRequired,
        getValue      : PropTypes.func.isRequired,
        register      : PropTypes.func.isRequired,
        unregister    : PropTypes.func.isRequired,
    };

    getChildContext() {
        return {
            dispatch      : this.props.dispatch,
            getValue      : this.props.getValue,
            register      : this.props.register,
            unregister    : this.props.unregister,
        }
    }
    render(){
        return this.props.children
    }
}

export default Contextify
