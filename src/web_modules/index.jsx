require('file?name=index.html!../index.html')
require('../style/index.css')

import ReactDOM         from 'react-dom'
import React            from 'react'
import Curve            from './component/curve/main.jsx'
import Contextify       from './component/abstract/contextify.jsx'
import {create}         from 'october'
const root = require('./fragment')

const initState = {
    params:{
        friendAttraction    : {
            d0              : 20,
            fatness         : 15,
            friendlyness    : 1,
            revulsion       : 10,
        },
        neighbourRepulsion  : { k: 10 },
        targetAttraction    : { k: 10 },
    }
}


const store = create( root, initState )

;[].slice.call( document.querySelectorAll('figure[data-component]') )
    .map( figure =>
        ({
            component : figure.getAttribute('data-component'),
            dataSet   : figure.getAttribute('data-dataSet'),
            figure
        })
    )
    .forEach( ({ figure, component, dataSet }) => {

        let Component

        switch( component ){
            case 'curve' :
                Component = Curve
                break
        }

        if( Component ) {

            const container = document.createElement( 'div' )
            container.setAttribute('class', `component component-${component} component-${component}-${dataSet}` )

            figure.replaceChild( container, figure.querySelector('img') )

            ReactDOM.render( <Contextify { ...store}><Component dataSet={dataSet} /></Contextify>, container )

        }
    })
