import React from 'react'
import ReactTimeAgo from 'react-time-ago'
// install using "npm install react-time-ago javascript-time-ago --save"

const TransitItem = (props) => {
  return (
    <>

      <div className="w-[fit]">
        <p className="text-left">
          {props.item.text.slice(0, props.item.text.indexOf(' http'))}
        </p>
        <div className="text-right text-secondary text-xs">
          <ReactTimeAgo date={Date.parse(props.item.created_at)} locale="en-US"/>  <a className="underline" href="https://twitter.com/ttcnotices">@TTCnotices</a>
        </div>
      </div>
    </>
  )
}

export default TransitItem