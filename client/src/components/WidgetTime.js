import React from 'react';
import Clock from 'react-live-clock';

const NewClock = (props) => {
  const timezone = props.timezone
  console.log(timezone);
  return (
    <div className="text-5xl bg-base-200 clock ml-16 pt-[12px] border-2 border-base-content rounded-3xl whitespace-nowrap w-fit pr-6">
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
