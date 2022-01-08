import React from 'react'

export default function GridSquare(props) {
    const classes = `${props.classe} color-${props.color}`
    return <div className={classes} />
}