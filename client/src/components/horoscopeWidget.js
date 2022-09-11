import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from './Button';

const horoscopeList = [
  ["Aries", "aries"],
  ["Taurus", "taurus"],
  ["Gemini", "gemini"],
  ["Cancer", "cancer"],
  ["Leo", "leo"],
  ["Virgo", "virgo"],
  ["Libra", "libra"],
  ["Scorpio", "scorpio"],
  ["Sagittarius", "sagittarius"],
  ["Capricorn", "capricorn"],
  ["Aquarius", "aquarius"],
  ["Pisces", "pisces"]
];

const Horoscope = (props) => {

  const [horoscope, setHoroscope] = useState({
    response: {}
  });

  const currentUserID = props.userID;
  const currentHoroscope = props.horoscope;
  // console.log("BEFORE USEFFECT", currentHoroscope);

  const pickHoroscope = (e) => {
    // console.log("------------------RUNNING pickHoroscope-----------------");
    const selectedHoroscope = e.target.value;
    const dbHoroscope = horoscopeList.find((item) => item[0] === selectedHoroscope)[1];
    // console.log(selectedHoroscope);
    // console.log(dbHoroscope);

    //Make an axios post request to http://localhost:8080/horoscopes/update and send currentUserID and dbHoroscope as the body of the request
    axios.post('http://localhost:8080/horoscopes/update', {
      id: currentUserID,
      horoscope: dbHoroscope
    })
      .then((response) => {
        console.log(response);
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <div className='horoscope'>
        {props.mode === "edit" && (
        <div className="horoscope-dropdown">
          <select className="select select-bordered w-full max-w-xs" onChange={pickHoroscope}>
            <option disabled selected>
              Select Horoscope
            </option>
            {horoscopeList.map((horoscope) => (
              <option key={horoscope[0]} value={horoscope[0]}>{horoscope[0]}</option>
            ))}
          </select>
        </div>
        )}
        <div className="horoscope-bottom">
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
      </div>
    </>
  );
}

export default Horoscope;