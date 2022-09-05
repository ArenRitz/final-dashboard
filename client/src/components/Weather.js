// Sources
// react-open-weather package: https://github.com/farahat80/react-open-weather
// Weather bit API: https://www.weatherbit.io/api 

import React from "react";
import ReactWeather, { useWeatherBit } from 'react-open-weather';
import useIpLocation from "../hooks/useIpLocation";

export default function Weather(props) {

  //store location(lat, lon) in state


  const state = useIpLocation()


  const { data, isLoading, errorMessage } = useWeatherBit({
    key: process.env.REACT_APP_WEATHERBIT_KEY,
    lat: state.lat,
    lon: state.lon,
    lang: 'en',
    unit: 'M',
  });
  
  //intermittant issue: data.location returns null. for now, use "Current Weather" if data.location = falsy
  const cityName = data? data.location : "Local Weather"
  console.log("WeatherBit data: ",data)

  return (
    <div>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={cityName}
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast={false}
      />
    </div>
  );

};