require('file?name=index.html!../index.html')
require('../style/index.css')

import ReactDOM         from 'react-dom'
import React            from 'react'
import Curve            from './component/curve/main.jsx'
import ForceField       from './component/forceField/main.jsx'
import World            from './component/world/world.jsx'
import Slider           from './component/slider/main.jsx'
import Contextify       from './component/abstract/contextify.jsx'
import {create}         from 'october'
const root = require('./fragment')

const initState = {
    params:{
        friendAttraction    : {
            d0              : 20,
            fatness         : 5,
            friendlyness    : 0.8,
            revulsion       : 80,
        },
        neighbourRepulsion  : { k: 130 },
        targetAttraction    : { k: 1 },

        nEntities           : 200,
        inertia             : 0.96,
    }
}


const store = create( root, initState )

;[].slice.call( document.querySelectorAll('[data-component]') )
    .map( element => {

        const props = {}

        for ( let i=element.attributes.length; i--; )
            if ( element.attributes[i].name.match(/data-/) )
                props[ element.attributes[i].name.slice(5) ] = element.attributes[i].value

        return { element, props }
    })
    .forEach( ({ element, props }) => {

        let Component

        switch( props.component ){
            case 'curve' :
                Component = Curve
                break

            case 'forceField' :
                Component = ForceField
                break

            case 'world' :
                Component = World
                break

            case 'slider' :
                Component = Slider
                break
        }

        if( Component ) {

            const container = document.createElement( 'div' )
            container.setAttribute('class', `component component-${props.component}` )

            const img = element.querySelector('img')
            if ( img )
                element.replaceChild( container, img )

            else
                element.parentNode.replaceChild( container, element )

            ReactDOM.render( <Contextify { ...store}><Component { ...props } /></Contextify>, container )

        }
    })
