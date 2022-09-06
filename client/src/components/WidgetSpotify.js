import React, { useEffect, useState } from 'react'
import axios from 'axios';

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

const WidgetSpotify = () => {

  const [music, setMusic] = useState({
    currentPlaylistName: '',
    trackOne: { name: '', date: '', artist: '', album: '', link: '' },
    trackTwo: { name: '', date: '', artist: '', album: '', link: '' },
    trackThree: { name: '', date: '', artist: '', album: '', link: '' },
    trackFour: { name: '', date: '', artist: '', album: '', link: '' },
    trackFive: { name: '', date: '', artist: '', album: '', link: '' },
    trackSix: { name: '', date: '', artist: '', album: '', link: '' },
    trackSeven: { name: '', date: '', artist: '', album: '', link: '' },
    trackEight: { name: '', date: '', artist: '', album: '', link: '' },
    trackNine: { name: '', date: '', artist: '', album: '', link: '' },
    trackTen: { name: '', date: '', artist: '', album: '', link: '' },
  });

  useEffect(() => {

    const apiMusicUrl = `https://api.spotify.com/v1/playlists/${playlist_id[1]}/tracks`;
    const params = { limit: 20, offset: 0 };
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_SPOTIFY_TOKEN}`
    }

    axios.get(apiMusicUrl, { params, headers })
      .then((response) => {
        const currentPlaylistName = playlist_names[1];
        console.log('Playlist Name: ', currentPlaylistName);
        const musicDataRaw = response.data;
        console.log('Raw Data: ', musicDataRaw);
        if (musicDataRaw) {
          const currentTrackOne = { 
            name: response.data.items[0].track.name, 
            date: response.data.items[0].track.album.release_date, 
            artist: response.data.items[0].track.artists[0].name, 
            album: response.data.items[0].track.album.images[0].url, 
            link: response.data.items[0].track.external_urls.spotify 
          };
          const currentTrackTwo = { 
            name: response.data.items[1].track.name, 
            date: response.data.items[1].track.album.release_date, 
            artist: response.data.items[1].track.artists[0].name, 
            album: response.data.items[1].track.album.images[0].url, 
            link: response.data.items[1].track.external_urls.spotify 
          };
          const currentTrackThree = { 
            name: response.data.items[2].track.name, 
            date: response.data.items[2].track.album.release_date, 
            artist: response.data.items[2].track.artists[0].name, 
            album: response.data.items[2].track.album.images[0].url, 
            link: response.data.items[2].track.external_urls.spotify 
          };
          const currentTrackFour = { 
            name: response.data.items[3].track.name, 
            date: response.data.items[3].track.album.release_date, 
            artist: response.data.items[3].track.artists[0].name, 
            album: response.data.items[3].track.album.images[0].url, 
            link: response.data.items[3].track.external_urls.spotify 
          };
          const currentTrackFive = { 
            name: response.data.items[4].track.name, 
            date: response.data.items[4].track.album.release_date, 
            artist: response.data.items[4].track.artists[0].name, 
            album: response.data.items[4].track.album.images[0].url, 
            link: response.data.items[4].track.external_urls.spotify 
          };
          const currentTrackSix = { 
            name: response.data.items[5].track.name, 
            date: response.data.items[5].track.album.release_date, 
            artist: response.data.items[5].track.artists[0].name, 
            album: response.data.items[5].track.album.images[0].url, 
            link: response.data.items[5].track.external_urls.spotify 
          };
          const currentTrackSeven = { 
            name: response.data.items[6].track.name, 
            date: response.data.items[6].track.album.release_date, 
            artist: response.data.items[6].track.artists[0].name, 
            album: response.data.items[6].track.album.images[0].url, 
            link: response.data.items[6].track.external_urls.spotify 
          };
          const currentTrackEight = { 
            name: response.data.items[7].track.name, 
            date: response.data.items[7].track.album.release_date, 
            artist: response.data.items[7].track.artists[0].name, 
            album: response.data.items[7].track.album.images[0].url, 
            link: response.data.items[7].track.external_urls.spotify 
          };
          const currentTrackNine = { 
            name: response.data.items[8].track.name, 
            date: response.data.items[8].track.album.release_date, 
            artist: response.data.items[8].track.artists[0].name, 
            album: response.data.items[8].track.album.images[0].url, 
            link: response.data.items[8].track.external_urls.spotify 
          };
          const currentTrackTen = { 
            name: response.data.items[9].track.name, 
            date: response.data.items[9].track.album.release_date, 
            artist: response.data.items[9].track.artists[0].name, 
            album: response.data.items[9].track.album.images[0].url, 
            link: response.data.items[9].track.external_urls.spotify 
          };
          setMusic({
            ...music,
            currentPlaylistName: currentPlaylistName,
            trackOne: currentTrackOne,
            trackTwo: currentTrackTwo,
            trackThree: currentTrackThree,
            trackFour: currentTrackFour,
            trackFive: currentTrackFive,
            trackSix: currentTrackSix,
            trackSeven: currentTrackSeven,
            trackEight: currentTrackEight,
            trackNine: currentTrackNine,
            trackTen: currentTrackTen,
          });
        } else {
          setMusic({
            ...music,
            currentPlaylistName: 'Playlist Not Found',
            trackOne: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackTwo: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackThree: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackFour: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackFive: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackSix: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackSeven: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackEight: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackNine: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
            trackTen: { name: 'No Data', date: 'No Data', artist: 'No Data', album: 'No Data', link: 'No Data' },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (

    <div className='spotify-main'>
      <div className='spotify-header'>
        <h1>SPOTIFY</h1>
        <h2>Playlist Name: {music.currentPlaylistName} - Top 10 Tracks</h2>
      </div>
      <div className='spotify-content'>
        <div className='track-one spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackOne.link}>
              Track Name: {music.trackOne.name}
            </a>
            <p>
              Release Date: {music.trackOne.date}
            </p>
            <p>
              Artist: {music.trackOne.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackOne.album} alt='album cover' />
          </div>
        </div>
        <div className='track-two spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackTwo.link}>
              Track Name: {music.trackTwo.name}
            </a>
            <p>
              Release Date: {music.trackTwo.date}
            </p>
            <p>
              Artist: {music.trackTwo.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackTwo.album} alt='album cover' />
          </div>
        </div>
        <div className='track-three spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackThree.link}>
              Track Name: {music.trackThree.name}
            </a>
            <p>
              Release Date: {music.trackThree.date}
            </p>
            <p>
              Artist: {music.trackThree.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackThree.album} alt='album cover' />
          </div>
        </div>
        <div className='track-four spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackFour.link}>
              Track Name: {music.trackFour.name}
            </a>
            <p>
              Release Date: {music.trackFour.date}
            </p>
            <p>
              Artist: {music.trackFour.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackFour.album} alt='album cover' />
          </div>
        </div>
        <div className='track-five spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackFive.link}>
              Track Name: {music.trackFive.name}
            </a>
            <p>
              Release Date: {music.trackFive.date}
            </p>
            <p>
              Artist: {music.trackFive.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackFive.album} alt='album cover' />
          </div>
        </div>
        <div className='track-six spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackSix.link}>
              Track Name: {music.trackSix.name}
            </a>
            <p>
              Release Date: {music.trackSix.date}
            </p>
            <p>
              Artist: {music.trackSix.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackSix.album} alt='album cover' />
          </div>
        </div>
        <div className='track-seven spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackSeven.link}>
              Track Name: {music.trackSeven.name}
            </a>
            <p>
              Release Date: {music.trackSeven.date}
            </p>
            <p>
              Artist: {music.trackSeven.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackSeven.album} alt='album cover' />
          </div>
        </div>
        <div className='track-eight spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackEight.link}>
              Track Name: {music.trackEight.name}
            </a>
            <p>
              Release Date: {music.trackEight.date}
            </p>
            <p>
              Artist: {music.trackEight.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackEight.album} alt='album cover' />
          </div>
        </div>
        <div className='track-nine spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackNine.link}>
              Track Name: {music.trackNine.name}
            </a>
            <p>
              Release Date: {music.trackNine.date}
            </p>
            <p>
              Artist: {music.trackNine.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackNine.album} alt='album cover' />
          </div>
        </div>
        <div className='track-ten spotify-track-layout'>
          <div className='spotify-text-content'>
            <a href={music.trackTen.link}>
              Track Name: {music.trackTen.name}
            </a>
            <p>
              Release Date: {music.trackTen.date}
            </p>
            <p>
              Artist: {music.trackTen.artist}
            </p>
          </div>
          <div className='spotify-image'>
            <img src={music.trackTen.album} alt='album cover' />
          </div>
        </div>
      </div>
    </div>

  )
}

export default WidgetSpotify