// Sources
// react-open-weather package: https://github.com/farahat80/react-open-weather
// Weather bit API: https://www.weatherbit.io/api 

import React from "react";
import ReactWeather, { useWeatherBit } from 'react-open-weather';

export default function Weather(props) {
  console.log("weather widget: running api call")
  const { data, isLoading, errorMessage } = useWeatherBit({
    key: process.env.REACT_APP_WEATHERBIT_KEY,
    lat: props.location.lat,
    lon: props.location.lon,
    lang: 'en',
    unit: 'M', // values are (M,S,I)
  });
  const cityName = data.location

  return (
    <div>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={cityName} //data.location SOMETIMES works, sometimes TypeErrors
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast={false}
      />
    </div>
  );

};