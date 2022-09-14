import React, { useState, useEffect } from "react";
import TwitchWidgetItem from "./TwitchWidgetItem";
import axios from "axios";
import UpdateTwitchList from "./UpdateTwitchList";
import {FiTwitch} from "react-icons/fi";

const TwitchWidgetList = (props) => {
  const [streamers, setStreamers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (props.streamers) {
      setStreamers(props.streamers);
    }
  }, [props.streamers]);

  //function to update the streamers array in the database
  const updateStreamers = (streamers) => {
    axios
      .put(`http://localhost:8080/api/twitch/${props.userID}`, { streamers })
      .then((res) => {
        setStreamers(res.data[0].twitch_usernames);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let streamersList = streamers.map((streamer) => {
    return <TwitchWidgetItem key={streamer} streamer={streamer} allStreamers={streamers} updateStreamers={updateStreamers} mode={props.mode}/>;
  });

  // function to handle adding a new streamer to the array and updating the database
  const addStreamer = (streamers) => {
    updateStreamers(streamers);
  };

  //toggle showAdd on click
  const toggleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <>
      <div className="w-fit h-fit bg-base-200 shadow-lg shadow-base-content/10 px-3  rounded-2xl flex relative">
      <div className="text-4xl text-accent flex items-center justify-center border-r-2 pl-[0.4rem] pr-[1rem] my-[5px] border-accent" >
      <FiTwitch/>
      </div>

        {streamersList}

        {props.mode === "edit" && (
          <div className="">
            <button className=" absolute btn btn-accent btn-xs -right-4 top-4 rounded-full" onClick={toggleAdd} >
              +
            </button>
            {showAdd && (
              <div className="-right-20 -top-20 absolute">
                <UpdateTwitchList
                  streamers={streamers}
                  addStreamer={addStreamer}
                  toggleAdd={toggleAdd}
                ></UpdateTwitchList>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default TwitchWidgetList;
