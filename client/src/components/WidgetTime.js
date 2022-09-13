import React, { useState } from 'react';
import Clock from 'react-live-clock';

const timezoneList = ["Canada/Eastern", "Canada/Pacific", "US/Central", "UTC", "GMT"];

const NewClock = (props) => {
  const [timezone, setTimezone] = useState(timezoneList[0]);
  // const timezone = props.timezone
  // console.log(timezone);

  const pickTimezone = (e) => {
    // console.log("------------------RUNNING pickTimezone-----------------");
    const selectedTimezone = e.target.value;
    // console.log(selectedTimezone);
    setTimezone(selectedTimezone);
  };

  return (
    <div className="text-5xl bg-base-200 clock ml-16 pt-[12px] border-2 border-base-content rounded-3xl whitespace-nowrap w-fit pr-6 h-26">

      <Clock
        format={'h:mm:ss A'}
        ticking={true}
        timezone={timezone}
      />
      {props.mode === "view" && (
      <div className="timezone-text pl-4 h-6" >
        Timezone: {timezone}
      </div>
       )}
      {props.mode === "edit" && (
        <div className="flex timezone-dropdown justify-center h-6">
          <select
            className="text-center select select-bordered w-[200px] select-xs justify-center"
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
