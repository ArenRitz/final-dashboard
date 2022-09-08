import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from './Button';
import WidgetSpotifyItem from './WidgetSpotifyItem';

const playlistInfo = [
  ["Today's Top Hits", "37i9dQZF1DXcBWIGoYBM5M"],
  ["Global Top 50", "1KNl4AYfgZtOVm9KHkhPTF"],
  ["Rap Caviar", "37i9dQZF1DX0XUsuxWHRQd"],
  ["Viva Latino", "37i9dQZF1DX10zKzsJ2jva"],
  ["Baila Reggaeton", "37i9dQZF1DWY7IeIP1cdjF"],
  ["Songs to Sing in the Car", "37i9dQZF1DWXRqgorJj26U"],
  ["All Out 2000s", "37i9dQZF1DX4o1oenSJRJd"],
  ["Rock Classics", "37i9dQZF1DWY4xHQp97fN6"],
  ["All Out 80s", "37i9dQZF1DX4UtSsGT1Sbe"],
  ["Beast Mode", "37i9dQZF1DX76Wlfdnj7AP"],
  ["All Out 90s", "37i9dQZF1DXbTxeAdrVG2l"],
  ["Chill Hits", "37i9dQZF1DX4WYpdgoIcn6"],
  ["Peaceful Piano", "37i9dQZF1DX4sWSpwq3LiO"],
  ["Hot Country", "37i9dQZF1DX1lVhptIYRda"],
  ["Get Turnt", "37i9dQZF1DWY4xHQp97fN6"],
  ["Mood Booster", "37i9dQZF1DX3rxVfibe1L0"],
  ["Songs to Sing in the Shower", "37i9dQZF1DWSqmBTGDYngZ"],
  ["mint", "37i9dQZF1DXdSjVZQzv2tl"],
  ["Esquenta Sertanejo", "37i9dQZF1DXdPec7aLTmlC"],
  ["Happy Hits", "37i9dQZF1DXcBWIGoYBM5M"]
];

const WidgetSpotifyList = (props) => {

  const [music, setMusic] = useState({
    currentPlaylistName: '',
    tracks: [],
  });

  const [playlist, setPlaylist] = useState({
    playlist: "Today's Top Hits",
    id: "37i9dQZF1DXcBWIGoYBM5M",
  });

  // console.log("------------------CHECKING PLAYLIST STATE-----------------");

  const pickPlaylist = (e) => {
    // console.log("------------------RUNNING pickPlaylist-----------------");
    const selectedPlaylistName = e.target.value;
    const selectedPlaylistId = playlistInfo.find((item) => item[0] === selectedPlaylistName)[1];
    // console.log(selectedPlaylistName);
    // console.log(selectedPlaylistId);
    setPlaylist({
      playlist: selectedPlaylistName,
      id: selectedPlaylistId,
    });
  };

  const getSpotifyToken = async () => {
    let tokenObject = localStorage.getItem("spotifyToken");
    // console.log("-------- Token Object In Storage -------", tokenObject)
    tokenObject = JSON.parse(tokenObject);
    // console.log(tokenObject);
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
      const apiMusicUrl = `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`;
      const params = { limit: 10, offset: 0 };
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${spotifyToken.token}`
      }

      axios.get(apiMusicUrl, { params, headers })
        .then((response) => {
          const currentPlaylistName = playlist.playlist;
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

  }, [playlist]);

  return (
    <>
      <Button type="hide" click={props.click} name="Spotify" />
      <div className='spotify-main'>
        <div className='spotify-header'>
          <h1>SPOTIFY</h1>
          <h2>Playlist Name: {music.currentPlaylistName} - Top 10 Tracks</h2>
        </div>
        <>
          <div className="bg-neutral text-neutral-content"></div>
          <p className="text-primary">Select Playlist</p>
          <select className="select select-bordered w-full max-w-xs" onChange={pickPlaylist}>
            <option disabled selected>
              Playlist
            </option>
            {playlistInfo.map((name) => (
              <option key={name[0]} value={name[0]}>{name[0]}</option>
            ))}
          </select>
        </>
        <div className='spotify-content'>
          {music.tracks.map((item) => {
            return <WidgetSpotifyItem key={item.track.name} item={item} />
          })
          }
        </div>
      </div>
    </>
  );
}

export default WidgetSpotifyList