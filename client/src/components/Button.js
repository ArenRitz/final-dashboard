import React from 'react'

const Button = (props) => {

  
  return (
      <button onClick={props.click} name={props.name}>
        Hide
      </button>
  )
}

export default Button