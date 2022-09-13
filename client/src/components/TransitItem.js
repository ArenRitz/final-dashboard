import React from 'react'

const TransitItem = (props) => {
  return (
    <>

      <div className="w-[fit]">
        <p>
          {props.item.text}
        </p>
        <p>
          {props.item.created_at}
        </p>
      </div>
    </>
  )
}

export default TransitItem