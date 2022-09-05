// Sources
// Weather bit API: https://www.weatherbit.io/api 
// ipify "Country + City" API: https://geo.ipify.org/docs
import axios from "axios"
import { useState, useEffect } from "react";
import React from "react";

export default function Weather() {

  const [coords, setCoords] = useState({ lat: 43.26, lon: -80.21 })
  const [weatherData, setWeatherData] = useState({
    temp: null,
    city_name: null,
    weather: {description: null}
  })

  useEffect(() => {

    const ipifyUrl = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`

    const weatherParams = {
      key: process.env.REACT_APP_WEATHERBIT_KEY,
      days: 5,
      lang: 'en',
      unit: 'M',
      lon: coords.lon,
      lat: coords.lat,
    };

    axios.get(ipifyUrl)
      .then((res) => {
        console.log("ipify response:",res.data)
        const latitude = res.data.location.lat
        const longitude = res.data.location.lng
        weatherParams.lat = latitude
        weatherParams.lon = longitude
        setCoords(() => ({
          lat: latitude,
          lon: longitude
        }))

        const url = `https://api.weatherbit.io/v2.0/current?lat=${weatherParams.lat}&lon=${weatherParams.lon}&key=${weatherParams.key}`

        return axios.get(url)
      })
      .then((res) => {
        console.log("weatherbit respsnse:",res.data)
        setWeatherData(() => (res.data.data[0]))
      })
  }, [coords.lon, coords.lat])


  return (
    <div className="w-fit bg-blue-300 rounded-3xl px-2 py-2 my-1 shadow">

      <h1 className="text-lg font-medium leading-6 text-neutral-700"> {weatherData.city_name} </h1>
      <div className="border-t border-gray-300"/>
      <h1 className="text-lg font-medium leading-6 text-neutral-700" > {Math.round(weatherData.temp)} °C</h1>
      <div className="border-t border-gray-300"/>
      <h1 className="text-lg font-medium leading-6 text-neutral-700"> {weatherData.weather.description}</h1>
    </div>
  );

};