import React from 'react'
import Button from './Button'


const Settings = (props) => {

  return (
    <>
      <div className="absolute top-1/4 left-1/4 bg-slate-100/95 w-1/2 h-1/2 rounded-3xl flex flex-col">
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Bookmarks} type="hideshow" click={props.click} name="Bookmarks"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Twitch} type="hideshow" click={props.click} name="Twitch"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Weather} type="hideshow" click={props.click} name="Weather"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Spotify} type="hideshow" click={props.click} name="Spotify"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Clock} type="hideshow" click={props.click} name="Clock"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Recipe} type="hideshow" click={props.click} name="Recipe"/>
          </div>
          <div className='my-2 flex flex-row'>

          <Button show={props.showBools.Aztro} type="hideshow" click={props.click} name="Aztro"/>
          </div>
      </div>
    </>
  )
}

export default Settings
