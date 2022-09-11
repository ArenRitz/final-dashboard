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
  ["Rock Classics", "37i9dQZF1DWXRqgorJj26U"],
  ["All Out 80s", "37i9dQZF1DX4UtSsGT1Sbe"],
  ["Beast Mode", "37i9dQZF1DX76Wlfdnj7AP"],
  ["All Out 90s", "37i9dQZF1DXbTxeAdrVG2l"],
  ["Chill Hits", "37i9dQZF1DX4WYpdgoIcn6"],
  ["Peaceful Piano", "37i9dQZF1DX4sWSpwq3LiO"],
  ["Hot Country", "37i9dQZF1DX1lVhptIYRda"],
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
      // console.log("BEFORE API CALL")
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
          // console.log('Raw Data: ', musicDataRaw);
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
    <div className="w-[400px]">
      <div className='border-solid border-2 border-neutral-content rounded-3xl relative'>
      <h2 className='border-b-2 border-solid border-neutral-content inline'>{music.currentPlaylistName} - TOP 10</h2>
      <svg className='w-7 rounded-full inline fill-accent absolute right-2 top-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z"/></svg>
      {props.mode === "edit" && (
      <>
        <select className="select select-bordered w-full max-w-xs" onChange={pickPlaylist}>
          <option disabled selected>
            Select Playlist
          </option>
          {playlistInfo.map((name) => (
            <option key={name[0]} value={name[0]}>{name[0]}</option>
          ))}
        </select>
      </>
      )}
      <div className="carousel">
          {music.tracks.map((item, index) => {
            return (
              <div id={"item" + index} className="carousel-item w-full">
                <div className="w-full">
                  <WidgetSpotifyItem key={item.track.name} item={item} id={"item" + index} />
                </div>
              </div>
            )
          })
          }
      </div>
      </div>
      <div className="flex justify-center w-full py-1 gap-2">
        <a href="#item0" className="btn btn-xs">1</a>
        <a href="#item1" className="btn btn-xs">2</a>
        <a href="#item2" className="btn btn-xs">3</a>
        <a href="#item3" className="btn btn-xs">4</a>
        <a href="#item4" className="btn btn-xs">5</a>
        <a href="#item5" className="btn btn-xs">6</a>
        <a href="#item6" className="btn btn-xs">7</a>
        <a href="#item7" className="btn btn-xs">8</a>
        <a href="#item8" className="btn btn-xs">9</a>
        <a href="#item9" className="btn btn-xs">10</a>
      </div>
    </div>
  );
}

export default WidgetSpotifyList