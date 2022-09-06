// Open Weather API: https://openweathermap.org/current

import axios from "axios"
import { useState, useEffect } from "react";
import React from "react";

export default function WeatherCustom() {

  const [coords, setCoords] = useState({ lat: 43.26, lon: -80.21 })
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temp: null,
    city_name: null,
    weather: {description: null, icon: null},
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
        return axios.get(url, {signal: controller.signal}) //use signal to prevent multiple useEffect calls with UseStrict
      .then((res) => {
        console.log("openweather response:",res.data)
        const responseData = {
          temp: Math.round(res.data.main.temp),
          city_name: res.data.name,
          weather: {description: res.data.weather[0].description, icon: res.data.weather[0].icon}
        }

        setWeatherData(() => responseData)
        setIsLoading(false);
      })
      .catch((err) => {
        const msg = err.message === "canceled" ? "Preventing useStrict behavior":""
        console.log(msg, err)
      })
    })
    return (() => controller.abort()) //to prevent multiple useEffect calls with UseStrict

  }, [coords.lon, coords.lat])

  return (
    <div>
      {isLoading && <div>___</div> }
      {weatherData.weather.icon && 
        <div className="flex w-fit bg-blue-300 rounded-3xl px-2 py-2 my-1 shadow">
          <div>
            <h1 className="text-lg font-medium leading-6 text-neutral-700"> {weatherData.city_name} </h1>
            <div className="border-t border-gray-300"/>
            <h1 className="text-lg font-medium leading-6 text-neutral-700" > {weatherData.temp} °C</h1>
            <div className="border-t border-gray-300"/>
            <h1 className="text-lg font-medium leading-6 text-neutral-700"> {weatherData.weather.description}</h1>
          </div>
          <div className=" w-[5rem] flex justify-center items-center">
            <img alt="icon" src={`http://openweathermap.org/img/w/${weatherData.weather.icon}.png`} />
          </div>
        </div>
      }
    </div>
    
    
  );

};