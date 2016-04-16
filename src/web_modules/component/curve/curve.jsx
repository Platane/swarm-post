import React from 'react'
import {computeBoundingBox} from './boundingBox'

const toSvgPath = path =>
    `M ${path[0].x} ${path[0].y}`
    + path.slice(1).map( p => `L ${p.x} ${p.y}`).join(' ')

const proj = ( boundingBox, width, height ) =>
    p => ({
        x : ( p.x - boundingBox.xMin )/( boundingBox.xMax - boundingBox.xMin ) * width,
        y : ( 1 - ( p.y - boundingBox.yMin )/( boundingBox.yMax - boundingBox.yMin ) ) * height,
    })

const available = [
    0,
    0.1,
    0.25,
    0.5,
    1,
    5,
    2.5,
    10,
    25,
    50,
    100,
]
const closestAxis = ({ yMin, yMax }) =>
    ({
        yMax: available.reduce( (max, x) => x >= yMax ? ( x < max ? x : max ) : max , Infinity ),
        yMin: available.reduce( (min, x) => -x <= yMin ? ( -x > min ? -x : min ) : min , -Infinity ),
    })


const Curve = ({ points, width, height }) => {

    width = width   || 600
    height = height || 200

    const bb = computeBoundingBox( points )

    const bba = { ...bb, ...closestAxis( bb ), xMin:0}

    if( bba.yMin == bba.yMax )
        bba.yMax += 0.001

    const margin = 25
    const bbx = {
        yMin: bba.yMin - margin * ( bba.yMax - bba.yMin ) / height,
        yMax: bba.yMax + margin * ( bba.yMax - bba.yMin ) / height,
        xMin: bba.xMin - margin * ( bba.xMax - bba.xMin ) / width,
        xMax: bba.xMax + margin * ( bba.xMax - bba.xMin ) / width,
    }

    const _proj = proj( bbx, width, height )

    const xAxis = [{x:bba.xMin-2, y:0},{x:bba.xMax+2, y:0}]
        .map( _proj )

    const yAxis = [{x:0, y:bba.yMin - ( bba.yMax - bba.yMin ) *0.07 },{x:0,y:bba.yMax + ( bba.yMax - bba.yMin ) *0.07 }]
        .map( _proj )

    const stepMax = [{x:0, y:bba.yMax},{x:0,y:bba.yMax}]
        .map( _proj )

    const stepMin = [{x:0, y:bba.yMin},{x:0,y:bba.yMin}]
        .map( _proj )

    stepMin[0].x = stepMax[0].x = stepMax[0].x -2
    stepMin[1].x = stepMax[1].x = stepMax[1].x +2

    return (

        <svg className="curve" viewBox={`0 0 ${width} ${height}`} width={width} height={height}>

            <path className="curve-axis" d={ toSvgPath( xAxis ) } />

            <path className="curve-axis" d={ toSvgPath( yAxis ) } />

            { bba.yMin < 0 && <path className="curve-axis" d={ toSvgPath( stepMin ) } /> }

            { bba.yMax > 0 && <path className="curve-axis" d={ toSvgPath( stepMax ) } /> }

            { bba.yMin < 0 && <text className="curve-axis-label" x={ yAxis[0].x+5 } y={ stepMin[0].y + 5 } >{ bba.yMin }</text> }

            { bba.yMax > 0 && <text className="curve-axis-label" x={ yAxis[0].x+5 } y={ stepMax[1].y + 5 } >{ bba.yMax }</text> }

            { points.length &&
                <path className="curve-path" d={ toSvgPath( points.map( _proj ) ) } />
            }

        </svg>
    )
}

export default Curve
