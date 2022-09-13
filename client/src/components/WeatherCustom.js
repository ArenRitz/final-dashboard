// Open Weather API: https://openweathermap.org/current

import axios from "axios"
import { useState, useEffect } from "react";
import React from "react";
import Button from "./Button";

export default function WeatherCustom(props) {

  const [coords, setCoords] = useState({ lat: 43.26, lon: -80.21 })
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temp: null,
    city_name: null,
    weather: { description: null, icon: null },
  })

  useEffect(() => {
    const weatherParams = {
      key: process.env.REACT_APP_OPENWEATHER_KEY,
      days: 5,
      lang: 'en',
      unit: 'M',
      lon: coords.lon,
      lat: coords.lat,
    };

    // AbortController prevents multiple useEffect calls with UseStrict
    const controller = new AbortController()

    navigator.geolocation.getCurrentPosition(res => {
      const latitude = res.coords.latitude
      const longitude = res.coords.longitude
      weatherParams.lat = latitude
      weatherParams.lon = longitude
      setCoords(() => ({
        lat: latitude,
        lon: longitude
      }))

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${weatherParams.lat}&lon=${weatherParams.lon}&appid=${weatherParams.key}&units=metric`
      setIsLoading(true);
      return axios.get(url, { signal: controller.signal }) //use signal to prevent multiple useEffect calls with UseStrict
        .then((res) => {
          console.log("openweather response:", res.data)
          const responseData = {
            temp: Math.round(res.data.main.temp),
            city_name: res.data.name,
            weather: { description: res.data.weather[0].description, icon: res.data.weather[0].icon }
          }

          setWeatherData(() => responseData)
          setIsLoading(false);
        })
        .catch((err) => {
          // const msg = err.message === "canceled" ? "Preventing useStrict behavior":""
          // console.log(msg, err)
        })
    })
    return (() => controller.abort()) //to prevent multiple useEffect calls with UseStrict

  }, [coords.lon, coords.lat])

  return (
    <>
      <div className="">
        {isLoading && <div className="flex w-fit bg-base-200 rounded-3xl px-2 py-2 my-1 shadow border-solid border-2 border-base-content">
          <div>
            <h1 className="">&nbsp;</h1>
            <div className="border-t border-accent" />
            <h1 className="" >Weather</h1>
            <div className="border-t border-accent" />
            <h1 className="">&nbsp;</h1>
          </div>
          <div className=" w-[5rem] flex justify-center items-center">
            <div role="status">
              <svg aria-hidden="true" class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-accent" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path>
              </svg>
            </div>
          </div>
        </div>}
        {!isLoading &&
          <div className="flex w-fit bg-base-200 rounded-3xl px-2 py-2  shadow border-solid border-2 border-base-content">
            <div>
              <h1 className=""> {weatherData.city_name} </h1>
              <div className="border-t border-accent" />
              <h1 className=" " > {weatherData.temp} °C</h1>
              <div className="border-t border-accent" />
              <h1 className=""> {weatherData.weather.description}</h1>
            </div>
            <div className=" w-[4rem] flex justify-center items-center">
              <img alt="icon" className=" w-[4rem]" src={`http://openweathermap.org/img/w/${weatherData.weather.icon}.png`} />
            </div>
          </div>
        }
      </div>
    </>
  );
};