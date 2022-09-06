import React from "react";
import axios from "axios";
import { useEffect, useState} from "react";

const TwitchWidgetItem = (props) => {

  const [state, setState] = useState({
    status: "",
    thumbnail: "",
  });



  useEffect(() => {
    const streamUrl = `https://api.twitch.tv/helix/streams?user_login=${props.streamer}`; 
    const userUrl = `https://api.twitch.tv/helix/users?login=${props.streamer}`;
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
      console.log('fetched initial streamer data')
      const streamData = results[0].data.data[0];
      const userData = results[1].data.data[0];
      if (streamData) {
        setState(prev => ({
          ...prev,
          status: 'Online',
          thumbnail: userData.profile_image_url
        }))
      } else {
        setState(prev => ({
          ...prev,
          status: "Offline",
          thumbnail: userData.profile_image_url,
        }));
      }
    })
    .catch((err) => {
      console.log(err);
    })

    const refreshData = setInterval(() => {
      getStreamData()
      .then((results) => {
        console.log('refreshed streamer data')
        const streamData = results.data.data[0];
        if (streamData) {
          setState(prev => ({
            ...prev,
            status: 'Online',
          }))
        } else {
          setState(prev => ({
            ...prev,
            status: "Offline"
          
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      })
    }, 60000)
    
    return () => {
      clearInterval(refreshData);
    }
   

    // eslint-disable-next-line
  }, []);




     
  return (
    <div className=" bg-purple-600 rounded-3xl px-2 py-2 my-1 shadow-inner shadow-purple-900">
      <a className="flex flex-row" href={`https://www.twitch.tv/${props.streamer}`}>
      <img className="w-10 h-10 rounded-full"  src={state.thumbnail} alt="thumbnail" />
      <div className="flex flex-col mx-2  my-auto">
        <h1>{props.streamer}</h1>
        {state.status === "Online" && (
          <h1 className="text-green-500 text-xs">{state.status}</h1>
        )}
        {state.status === "Offline" && (
          <h1 className=" text-gray-400 text-xs">{state.status}</h1>
        )}
      </div>
      {state.status === "Offline" && (
      <div className=" bg-slate-500 w-4 h-4 my-auto rounded-full ml-5 ring-2 ring-slate-200/30 ring-offset-2 ring-offset-slate-200/60"></div>
      )}
      {state.status === "Online" && (
      <div className=" bg-red-500 w-4 h-4 my-auto rounded-full ml-5 ring-2 ring-red-200/30 ring-offset-2 ring-offset-red-200/60"></div>
      )}
      </a>
      
      
    </div>
  );
};

export default TwitchWidgetItem;
