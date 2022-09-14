import axios from "axios";
import React, { useEffect, useState } from "react";

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
  ["Pisces", "pisces"],
];

const Horoscope = (props) => {
  const [horoscope, setHoroscope] = useState({
    response: {},
  });

  const currentUserID = props.userID;
  const [currentHoroscope, setCurrentHoroscope] = useState(props.horoscope);
  // console.log("BEFORE USEFFECT", currentHoroscope);

  const pickHoroscope = (e) => {
    // console.log("------------------RUNNING pickHoroscope-----------------");
    const selectedHoroscope = e.target.value;
    const dbHoroscope = horoscopeList.find(
      (item) => item[0] === selectedHoroscope
    )[1];
    // console.log(selectedHoroscope);
    // console.log(dbHoroscope);

    //Make an axios post request to http://localhost:8080/horoscopes/update and send currentUserID and dbHoroscope as the body of the request
    axios
      .post("http://localhost:8080/horoscopes/update", {
        id: currentUserID,
        horoscope: dbHoroscope,
      })
      .then((response) => {
        // console.log(dbHoroscope);
        setCurrentHoroscope(dbHoroscope);
        setHoroscope(horoscope);
        fetchHoroscopeData(dbHoroscope);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchHoroscopeData = (horoscope) => {
    const URL = `https://aztro.sameerkumar.website/?sign=${horoscope}&day=today`;
    fetch(URL, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((json) => {
        setHoroscope({
          response: json,
        });
      });
  }

  useEffect(() => {
    // console.log("INSIDE USEFFECT", currentHoroscope);
    if (props.horoscope) {
      setCurrentHoroscope(props.horoscope);
    }

    fetchHoroscopeData(props.horoscope);

  }, [props.horoscope]);

  // console.log(horoscope)

  return (
    <>
      <div className="w-[400px] bg-base-200 shadow-lg shadow-base-content/10 rounded-3xl p-2 group h-[168px] relative">
        <div className="relative">
          <div className="flex flex-row">
            <div className="w-[140px] h-[140px]  ">
              <img
                src={`assets/zodiacs/${currentHoroscope}.jpeg`}
                alt="zodiac"
                width={140}
                height={140}
                className="rounded-3xl w-[140px] h-[140px] "
              />
            </div>
            <div className="horoscope-info text-sm text-start ml-4">
              Highly Compatible With: {horoscope.response.compatibility} <br />
              Lucky Number: {horoscope.response.lucky_number} <br />
              Lucky Time: {horoscope.response.lucky_time} <br />
              Color: {horoscope.response.color} <br />
              Mood: {horoscope.response.mood} <br />
              {props.mode === "edit" && (
                <div className="horoscope-dropdown">
                  <select
                    className="select select-bordered select-xs w-[200px]"
                    onChange={pickHoroscope}
                  >
                    <option disabled selected>
                      Select Horoscope
                    </option>
                    {horoscopeList.map((horoscope) => (
                      <option key={horoscope[0]} value={horoscope[0]}>
                        {horoscope[0]}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="dropdown dropdown-top dropdown-hover absolute -bottom-[1.4rem] left-[9rem] ">
            <label
              tabIndex={0}
              className="btn btn-accent btn-xs rounded-full shadow  opacity-0 transition-all delay-75 group-hover:opacity-100"
            >
              Show More
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content -left-20 menu p-2 shadow bg-base-100 rounded-box  border-2 border-base-content w-80 text-sm"
            >
              {horoscope.response.description} <br />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Horoscope;