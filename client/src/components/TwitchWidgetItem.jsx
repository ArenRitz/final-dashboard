import React from "react";
import axios from "axios";
import { useEffect, useState} from "react";

const Twitch = (props) => {

  const [status, setStatus] = useState('Offline');
  const [user, setUser] = useState({
    name: props.streamer,
    thumbnail: "",
    url: `https://www.twitch.tv/${props.streamer}`,
  });


  useEffect(() => {
    const streamUrl = `https://api.twitch.tv/helix/streams?user_login=${user.name}`; 
    const userUrl = `https://api.twitch.tv/helix/users?login=${user.name}`;
    const headers = {
      'Authorization': `Bearer ${process.env.REACT_APP_TWITCH_AUTH}`,
      'Client-Id': process.env.REACT_APP_TWITCH_CLIENT_ID
    };

    const getStreamData = () => {
      return axios.get(streamUrl, {headers})
    }
    const getUserData = () => {
      return axios.get(userUrl, {headers})
    }

    Promise.all([
      getStreamData(),
      getUserData()
    ])
    .then((results) => {
      console.log('Fetched streamer information')
      const streamData = results[0].data.data[0];
      const userData = results[1].data.data[0];
      if (streamData) {
        setStatus('Online');
        setUser({
          ...user,
          thumbnail: userData.profile_image_url
        })
      } else {
        setStatus('Offline');
        setUser({
          ...user,
          thumbnail: userData.profile_image_url
        })
      }
    })
    .catch((err) => {
      console.log(err);
    })

    const refreshData = setInterval(() => {
      getStreamData()
      .then((results) => {
        console.log('refreshed streamer status')
        const streamData = results.data.data[0];
        if (streamData) {
          setStatus('Online');
        } else {
          setStatus('Offline');
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }, 20000)
    
    return () => {
      clearInterval(refreshData);
    }
   

    // eslint-disable-next-line
  }, []);




     
  return (
    <div className=" bg-purple-600 rounded-3xl px-2 py-2 my-1 shadow-inner shadow-purple-900">
      <a className="flex flex-row" href={user.url}>
      <img className="w-10 h-10 rounded-full"  src={user.thumbnail} alt="thumbnail" />
      <div className="flex flex-col mx-2  my-auto">
        <h1>{user.name}</h1>
        {status === "Online" && (
          <h1 className="text-green-500 text-xs">{status}</h1>
        )}
        {status === "Offline" && (
          <h1 className=" text-gray-400 text-xs">{status}</h1>
        )}
      </div>
      {status === "Offline" && (
      <div className=" bg-slate-500 w-4 h-4 my-auto rounded-full ml-5 ring-2 ring-slate-200/30 ring-offset-2 ring-offset-slate-200/60"></div>
      )}
      {status === "Online" && (
      <div className=" bg-red-500 w-4 h-4 my-auto rounded-full ml-5 ring-2 ring-red-200/30 ring-offset-2 ring-offset-red-200/60"></div>
      )}
      </a>
      
      
    </div>
  );
};

export default Twitch;
