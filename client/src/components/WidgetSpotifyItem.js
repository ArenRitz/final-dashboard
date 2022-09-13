import React from 'react'

const WidgetSpotifyItem = (props) => {
  return (
    <>
      <div className='spotify-track-layout w-[400px] flex flex-row content-center items-center py-1 rounded-3xl'>
        <div className='spotify-image mx-2'>
          <img src={props.item.track.album.images[0].url} alt='album cover' width={100} height={100} className=' rounded-3xl'  />
        </div>
        <div className='truncate text-start'>
          <a href={props.item.track.external_urls.spotify} className="text-accent hover:text-accent-focus">
            {props.item.track.name.lenght > 15 ? props.item.track.name.substring(0, 15) + '...' : props.item.track.name}
          </a>
          <p>
            Artist: {props.item.track.artists[0].name}
          </p>
          <p>
            Release Date: {props.item.track.album.release_date}
          </p>
        </div>
      </div>
    </>
  )
}

export default WidgetSpotifyItem