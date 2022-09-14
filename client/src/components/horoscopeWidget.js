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
  };

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
      <div className="w-[400px] bg-base-200 shadow-lg shadow-base-content/10 rounded-3xl p-2 group h-[168px]">
        <div className="relative w-full h-full">
          <div className="flex flex-row w-full h-full">
            <div className=" w-[35%]">
              <img
                src={`assets/zodiacs/${currentHoroscope}.jpeg`}
                alt="zodiac"
                className="rounded-3xl w-full h-full "
              />
            </div>
            <div className="flex flex-col w-[65%] items-center">
            <div className="w-[95%] ml-2 ">
            <h3 className="text-accent text-center border-b-2 border-accent mb-2">Daily Horoscope</h3>
            </div>
            <div className="horoscope-info text-start ml-4">
           
              <p className="text-sm">
                Compatibility: {horoscope.response.compatibility}
              </p>
              <p className="text-sm">
                Lucky Number: {horoscope.response.lucky_number}{" "}
              </p>
              <p className="text-sm">
                Lucky Time: {horoscope.response.lucky_time}{" "}
              </p>
              <p className="text-sm"> Color: {horoscope.response.color}</p>
              <p className="text-sm"> Mood: {horoscope.response.mood}</p>
              {props.mode === "edit" && (
                <div className="horoscope-dropdown flex justify-center  ">
                  <select
                    className="select select-bordered select-xs w-[150px]"
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
          </div>
          {props.mode !== "edit" && (              
          <div className="dropdown dropdown-top dropdown-hover absolute -bottom-[1.4rem] left-[13rem] ">
            <label
              tabIndex={0}
              className="btn btn-accent btn-xs rounded-full shadow  opacity-0 transition-all delay-75 group-hover:opacity-100"
            >
              Show More
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content -left-36 menu p-2 shadow bg-base-100 rounded-box  border-2 border-base-content w-80 text-sm"
            >
              {horoscope.response.description} <br />
            </ul>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Horoscope;
