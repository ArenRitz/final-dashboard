import React, {useState, useEffect} from "react";
import TwitchWidgetItem from "./TwitchWidgetItem";
import Button from "./Button";


const TwitchWidgetList = (props) => {

  // const [streamers, setStreamers] = useState([])

  // useEffect(() => {
  //     setStreamers(props.streamers)


  // },[props.streamers])

   
  
  // let streamersList = streamers.map((streamer) => {
  //   return <TwitchWidgetItem key={streamer} streamer={streamer} />;
  // });

  return (
    <>
      <Button type="hide" click={props.click} name="Twitch"/>
      <div className="w-fit bg-purple-900 px-3 py-2 rounded-2xl">
        {/* {streamersList} */}
      </div>
    </>
  );
};

export default TwitchWidgetList;
