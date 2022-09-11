import React from "react";
import TwitchWidgetItem from "./TwitchWidgetItem";
import Button from "./Button";


const TwitchWidgetList = (props) => {

  let streamers = ["TPAIN", "okharry", "shroud"];
  let streamersList = streamers.map((streamer) => {
    return <TwitchWidgetItem key={streamer} streamer={streamer} />;
  });

  return (
    <>
      <div className="w-fit bg-purple-900 px-3 py-2 rounded-2xl">
        {streamersList}
      </div>
    </>
  );
};

export default TwitchWidgetList;
