import React from "react";
import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default function Weather(props) {
  console.log("weather widget: running api call")
  console.log(props.location)

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '83cf3272622f89b897e84107c4f6eafa',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
    <div>
      <ul>
        <li>Latitude: {props.location.lat}</li>
        <li>Longitude: {props.location.lon}</li>
      </ul>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Munich"
        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
        showForecast
      />
    </div>
  );
};