import React from 'react'

export default function GridSquare(props) {
    let classes = ''
    if (!props?.shadow)
        classes = `${props.classe} color-${props.color}`
    else
        classes = `grid-square color-${props.color}-shadow`
    return <div className={classes} />
}