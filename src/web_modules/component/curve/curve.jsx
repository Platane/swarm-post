import React from 'react'
import {computeBoundingBox, enlargeBoundingBox} from './boundingBox'

const toSvgPath = path =>
    `M ${path[0].x} ${path[0].y}`
    + path.slice(1).map( p => `L ${p.x} ${p.y}`).join(' ')

const proj = ( boundingBox, width, height ) =>
    p => ({
        x : ( p.x - boundingBox.xMin )/( boundingBox.xMax - boundingBox.xMin ) * width,
        y : ( 1 - ( p.y - boundingBox.yMin )/( boundingBox.yMax - boundingBox.yMin ) ) * height,
    })

const Curve = ({ points, width, height }) => {

    width = width   || 400
    height = height || 400

    const boundingBox = enlargeBoundingBox( computeBoundingBox( points ), 10 )


    return (
        <div className="curve" >

            <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>

                <path d={ toSvgPath( points.map( proj( boundingBox, width, height ) ) ) } />

            </svg>

        </div>
    )
}

export default Curve
