import React, { useEffect, useState } from 'react';
import Button from './Button';

const Horoscope = (props) => {

  const [horoscope, setHoroscope] = useState({
    response: {}
  });

  const currentHoroscope = props.horoscope;
  // console.log("BEFORE USEFFECT", currentHoroscope);

  useEffect(() => {
    // console.log("INSIDE USEFFECT", currentHoroscope);

    const URL = `https://aztro.sameerkumar.website/?sign=${currentHoroscope}&day=today`;
    fetch(URL, {
      method: 'POST'
    }).then(response => response.json())
      .then(json => {
        setHoroscope({
          response: json,
        });
      });

  }, [currentHoroscope]);

  // console.log(horoscope)

  return (
    <>
      <Button type="hide" click={props.click} name="Aztro" />
      <div className='horoscope'>
        <div className='horoscope-thumbnail'>
          <img src={`assets/zodiacs/${currentHoroscope}.jpeg`} alt='zodiac' width="200" height="200" />
        </div>
        <div className='horoscope-info'>
          {/* Current Date: {horoscope.response.current_date} <br /> */}
          {/* Your Horoscope: {currentHoroscope} <br /> */}
          Highly Compatible With: {horoscope.response.compatibility} <br />
          Lucky Number: {horoscope.response.lucky_number} <br />
          Lucky Time: {horoscope.response.lucky_time} <br />
          Color: {horoscope.response.color} <br />
          Date Range: {horoscope.response.date_range} <br />
          Mood: {horoscope.response.mood} <br />
          Description: {horoscope.response.description} <br />
        </div>
      </div>
    </>
  );
}

export default Horoscope;