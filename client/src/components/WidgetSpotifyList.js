import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from './Button';
import WidgetSpotifyItem from './WidgetSpotifyItem';

const playlist_id = [
  '37i9dQZF1DXcBWIGoYBM5M',
  '1KNl4AYfgZtOVm9KHkhPTF',
  '37i9dQZF1DX0XUsuxWHRQd',
  '37i9dQZF1DX10zKzsJ2jva',
  '37i9dQZF1DWY7IeIP1cdjF',
  '37i9dQZF1DWWMOmoXKqHTD',
  '37i9dQZF1DX4o1oenSJRJd',
  '37i9dQZF1DWXRqgorJj26U',
  '37i9dQZF1DX4UtSsGT1Sbe',
  '37i9dQZF1DX76Wlfdnj7AP',
  '37i9dQZF1DXbTxeAdrVG2l',
  '37i9dQZF1DX4WYpdgoIcn6',
  '37i9dQZF1DX4sWSpwq3LiO',
  '37i9dQZF1DX1lVhptIYRda',
  '37i9dQZF1DWY4xHQp97fN6',
  '37i9dQZF1DX3rxVfibe1L0',
  '37i9dQZF1DWSqmBTGDYngZ',
  '37i9dQZF1DX4dyzvuaRJ0n',
  '37i9dQZF1DXdSjVZQzv2tl',
  '37i9dQZF1DXdPec7aLTmlC'
];

const playlist_names = [
  "Today's Top hits",
  'Global Top 50',
  'Rap Caviar',
  'Viva Latino',
  'Baila Reggaeton',
  'Songs to Sing in the Car',
  'All Out 2000s',
  'Rock Classics',
  'All Out 80s',
  'Beast Mode',
  'All Out 90s',
  'Chill Hits',
  'Peaceful Piano',
  'Hot Country',
  'Get Turnt',
  'Mood Booster',
  'Songs to Sing in the Shower',
  'mint',
  'Esquenta Sertanejo',
  'Happy Hits'
];

const WidgetSpotifyList = (props) => {

  const [music, setMusic] = useState({
    currentPlaylistName: '',
    tracks: [],
  });

  const getSpotifyToken = async () => {
    let tokenObject = localStorage.getItem("spotifyToken");
    console.log("-------- Token Object In Storage -------", tokenObject)
    tokenObject = JSON.parse(tokenObject);
    console.log(tokenObject);
    if (tokenObject || tokenObject === null) {
      const currentTime = Date.now();
      // to test in the case of 45 minutes, use 2700000 milliseconds below for new token interval
      if (tokenObject === null || ((currentTime - tokenObject.tokenTime) > 2700000)) {
        // console.log('+++++ SECOND IF BLOCK IS RUNNING IN getSpotifyToken +++++');
        try {
          const { data } = await axios.get("http://localhost:8080/spotify/refresh");
          localStorage.setItem("spotifyToken", JSON.stringify(data));
          tokenObject = localStorage.getItem("spotifyToken");
          // console.log("NEW TOKEN BEFORE JSON PARSE");
          // console.log(tokenObject);
          // console.log("NEW TOKEN AFTER JSON PARSE");
          tokenObject = JSON.parse(tokenObject);
          // console.log(tokenObject);
          return tokenObject;
        } catch (error) {
          console.log("------------------------");
          console.log(error);
        }
      }
      // console.log("TOKEN WAS NOT CHANGED", tokenObject)
      return tokenObject;
    }
  }

  useEffect(() => {

    // async function that invokes the getSpotifyToken function and sets local variable via await
    const apiRunSpotifyCall = async () => {
      let spotifyToken;
      spotifyToken = await getSpotifyToken();
      // console.log(spotifyToken);

      // console.log("TOKEN FROM AWAIT FUNCTION REQUEST BELOW");
      // console.log(spotifyToken);
      console.log("BEFORE API CALL")
      const apiMusicUrl = `https://api.spotify.com/v1/playlists/${playlist_id[2]}/tracks`;
      const params = { limit: 10, offset: 0 };
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyToken.token}`
      }

      axios.get(apiMusicUrl, { params, headers })
        .then((response) => {
          const currentPlaylistName = playlist_names[2];
          // console.log('Playlist Name: ', currentPlaylistName);
          const musicDataRaw = response.data;
          console.log('Raw Data: ', musicDataRaw);
          if (musicDataRaw) {
            setMusic({
              ...music,
              currentPlaylistName: currentPlaylistName,
              tracks: response.data.items,
            });
          } else {
            setMusic({
              ...music,
              currentPlaylistName: 'Playlist Not Found',
              tracks: [],
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    apiRunSpotifyCall();

  }, []);

  return (
    <>
      <Button type="hide" click={props.click} name="Spotify" />
      <div className='spotify-main'>
        <div className='spotify-header'>
          <h1>SPOTIFY</h1>
          <h2>Playlist Name: {music.currentPlaylistName} - Top 10 Tracks</h2>
        </div>
        <div className='spotify-content'>
          {music.tracks.map((item) => {
            return <WidgetSpotifyItem key={item.track.name} item={item} />
          })
          }
        </div>
      </div>
    </>

  )
}

export default WidgetSpotifyList