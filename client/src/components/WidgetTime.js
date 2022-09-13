import React, { useState, useEffect } from 'react';
import Clock from 'react-live-clock';
import axios from 'axios';

const timezoneList = ["Canada/Eastern", "Canada/Pacific", "US/Central", "UTC", "GMT"];

const NewClock = (props) => {

  const currentUserId = props.userID;
  const currentTimezone = props.timezone;

  console.log(currentUserId);
  console.log(currentTimezone);

  const [timezone, setTimezone] = useState(currentTimezone);

  // const timezone = props.timezone
  // console.log(timezone);

  useEffect(() => {
    console.log("********TIME USE EFFECT IS RUNNING********");
    if (currentTimezone) {
      setTimezone(currentTimezone);
    }
  }, [currentTimezone]);

  const pickTimezone = (e) => {
    console.log("------------------RUNNING pickTimezone-----------------");
    const selectedTimezone = e.target.value;
    setTimezone(selectedTimezone);

    axios
      .post("http://localhost:8080/timezone/update", {
        id: currentUserId,
        timezone: selectedTimezone,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(selectedTimezone);
  };

  return (
    <div className="text-5xl bg-base-200 clock pt-[12px] border-2 border-base-content rounded-3xl whitespace-nowrap w-fit pr-6 pl-6 h-26">

      <Clock
        format={'h:mm A'}
        ticking={true}
        timezone={timezone}
      />
      {props.mode === "view" && (
      <div className="timezone-text pl-4 h-6" >
        Timezone: {timezone}
      </div>
       )}
      {props.mode === "edit" && (
        <div className="flex timezone-dropdown justify-center">
          <select
            className="text-center select select-bordered w-[50%] select-xs justify-center"
            onChange={pickTimezone}
          >
            <option disabled selected>
              Select Timezone
            </option>
            {timezoneList.map((timezone) => (
              <option key={timezone} value={timezone}>{timezone}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  )
}

export default NewClock;
