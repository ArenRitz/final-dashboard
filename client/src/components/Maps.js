// install @react-google-maps/api
// Uses google cloud services: maps, places, directions, distance matrix
// disable adblockers
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api"
import Button from "./Button";
import axios from "axios";


export default function Maps(props) {
  const {userData, currentLocation, click, showBool} = props 

  const [map, setMap] = useState( /** @type google.maps.Map */(null)) //add autocompletions provided by google maps
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [duration, setDuration] = useState(null)
  const [durationTraffic, setDurationTraffic] = useState(null)
  const [durationNoTraffic, setDurationNoTraffic] = useState(null)
  const [libraries] = useState(['places']); //prevents console warnings

  const originRef = useRef() 
  const destinationRef = useRef()

  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  })
 
  async function calculateRoute() {
    // if no route user input, use the users's default route. If no default route, set to empty

    if (originRef.current.value === '' || destinationRef.current.value === '') {
      originRef.current.value = (userData.home_location) ? userData.home_location : ""
      destinationRef.current.value = (userData.work_location) ? userData.work_location : ""
    }
    // console.log("home prop :", userData.home_location)
    // console.log("originRef Look at .current.value:", originRef)
    // console.log("userData in Maps", userData)

    // get directions, route and distance from DirectionsService
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    // get duration with and without traffic from DistanceMatrixService
    // eslint-disable-next-line no-undef
    const distanceMatrixService = new google.maps.DistanceMatrixService()
    const resultsWithTraffic = await distanceMatrixService.getDistanceMatrix({
      origins: [originRef.current.value],
      destinations: [destinationRef.current.value],
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      
      drivingOptions: {departureTime: new Date(Date.now()), trafficModel: "bestguess"}
    })
    setDurationTraffic(resultsWithTraffic.rows[0].elements[0].duration_in_traffic.text)
    setDurationNoTraffic(resultsWithTraffic.rows[0].elements[0].duration.text)
  }


  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setDurationTraffic('')
    setDurationNoTraffic('')
    originRef.current.value = ''
    destinationRef.current.value = ''
  }

  function saveHomeAndWork() {
    const home_location = originRef.current.value
    const work_location = destinationRef.current.value

    if (!home_location || !work_location) {
      console.log("please set a route before saving")
      return 
    }
    const data = {home_location, work_location, id:userData.id.toString()}
    axios.put(`http://localhost:8080/api/users/${data.id}`, data)
    .then ((res) => 
      console.log("saved home and work location. response:", res)
    )
    .catch((err) => {
      console.log(err);
    })
  }

  if (!isLoaded) {
    return <div>Map Loading...</div>
  }
  return (
    <>
    <Button type="hide" click={click} name="Maps" />
    <div className='flex flex-col justify-between w-fit figma-bookmark-container px-5 py-5'>
      <section>
        <Autocomplete>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Origin" type="text" name="origin" ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Destination" type="text" name="destination" ref={destinationRef} />
        </Autocomplete>
        <div className='flex'>
          <button className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1" onClick={calculateRoute}>Show Route</button>
          <button className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1" onClick={clearRoute}>Clear</button>
          <button 
            alt="Pan to Current Location"
            className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1"
            name="center-back"
            onClick={() => map.panTo(currentLocation)}
          >
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="currentcolor" d="M21,11H19.93A8,8,0,0,0,13,4.07V3a1,1,0,0,0-2,0V4.07A8,8,0,0,0,4.07,11H3a1,1,0,0,0,0,2H4.07A8,8,0,0,0,11,19.93V21a1,1,0,0,0,2,0V19.93A8,8,0,0,0,19.93,13H21a1,1,0,0,0,0-2Zm-9,7a6,6,0,1,1,6-6A6,6,0,0,1,12,18Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,9Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,13Z"/></svg> 
          </button>
          <button className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1" onClick={saveHomeAndWork}>Save Route</button>
        </div>
        <div className="text-slate-200 mr-4 font-bold">Distance: {distance}</div>
        <div className="text-slate-200 mr-4 font-bold">With Traffic: {durationTraffic}</div>
        <div className="text-slate-200 mr-4 font-bold">Typical Traffic: {durationNoTraffic}</div>
        
      </section>

      <GoogleMap
        zoom={15}
        center={currentLocation}
        mapContainerStyle={{ width: '400px', height: '400px' }}
        options={{
          streetViewControl: false,
          mapTypeControl: false
        }}
        onLoad={(map) => {
          setMap(map)
          calculateRoute()
        }}
      >
        <Marker position={currentLocation} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
    </>
  );

}