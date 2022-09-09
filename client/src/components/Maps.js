// install @react-google-maps/api
// Uses google cloud services: maps, places, directions, distance matrix
// disable adblockers
import React, { useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api"
import Button from "./Button";

// const userRoute = {origin:"Waterloo, ON", destination:"Toronto, ON"}

export default function Maps(props) {
  const [map, setMap] = useState( /** @type google.maps.Map */(null)) //add autocompletions provided by google maps
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [duration, setDuration] = useState(null)
  const [durationTraffic, setDurationTraffic] = useState(null)
  const [durationNoTraffic, setDurationNoTraffic] = useState(null)
  const [libraries] = useState(['places']); //prevents console warnings

  const originRef = useRef() //useRef persists data after rerender
  const destinationRef = useRef()

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  })

  async function calculateRoute() {
    // if no route inputted, use the users's default route
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      originRef.current.value = props.home
      destinationRef.current.value = props.work
    }
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

  if (!isLoaded) {
    return <div>Map Loading...</div>
  }
  return (
    <>
    <Button type="hide" click={props.click} name="Maps" />
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
            alt="Current Location"
            className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1"
            name="center-back"
            onClick={() => map.panTo(props.currentLocation)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"/></svg>
          </button>
        </div>
        <div className="text-slate-200 mr-4 font-bold">Distance: {distance}</div>
        <div className="text-slate-200 mr-4 font-bold">With Traffic: {durationTraffic}</div>
        <div className="text-slate-200 mr-4 font-bold">No Traffic: {durationNoTraffic}</div>
        
      </section>

      <GoogleMap
        zoom={15}
        center={props.currentLocation}
        mapContainerStyle={{ width: '400px', height: '400px' }}
        options={{
          streetViewControl: false,
          mapTypeControl: false
        }}
        onLoad={(map) => {
          setMap(map)
          calculateRoute()
        }
        }

      >
        <Marker position={props.currentLocation} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
    </>
  );

}