import React from 'react'

export default function GridSquare(props) {
    let classes = ''
    if (!props?.shadow)
        classes = `${props.classe} color-${props.color}`
    else
        classes = `grid-square-shadow color-${props.color}-shadow`
    return <div className={classes} />
}