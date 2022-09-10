import React from 'react'

const WidgetSpotifyItem = (props) => {
  return (
    <div>
      <div className='spotify-track-layout'>
        <div className='spotify-image'>
          <img src={props.item.track.album.images[0].url} alt='album cover' />
        </div>
        <div className='truncate spotify-text-content'>
          <a href={props.item.track.external_urls.spotify}>
            Track Name: {props.item.track.name}
          </a>
          <p>
            Release Date: {props.item.track.album.release_date}
          </p>
          <p>
            Artist: {props.item.track.artists[0].name}
          </p>
        </div>
      </div>
    </div>
  )
}

export default WidgetSpotifyItem