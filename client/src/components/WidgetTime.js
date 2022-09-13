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
    <div className="text-5xl bg-base-200 clock ml-16 pt-[12px] border-2 border-base-content rounded-3xl whitespace-nowrap w-fit pr-6">
      {props.mode === "edit" && (
        <div className="flex timezone-dropdown justify-center">
          <select
            className="text-center select select-bordered w-full max-w-xs justify-center"
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
      <Clock
        format={'h:mm:ss A'}
        ticking={true}
        timezone={timezone}
      />
      <div className="timezone-text pl-4">
        Timezone: {timezone}
      </div>
    </div>
  )
}

export default NewClock;
