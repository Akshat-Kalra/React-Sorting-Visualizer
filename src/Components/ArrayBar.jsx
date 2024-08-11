import React from 'react'
import './ArrayBar.css'
// background-color: #61dafb;

function ArrayBar(props) {
  return (
    <div
    className='array-bar'
    style={{
        height: `${props.height}px`,
        backgroundColor: props.color === 0 
        ? 'white' 
        : props.color === 1 
        ? 'green' 
        : 'red',
      }}>
        {props.height}
    </div>
  )
}

export default ArrayBar
