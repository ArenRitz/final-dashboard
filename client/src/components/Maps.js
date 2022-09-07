// install @react-google-maps/api
// Uses google cloud services: maps, places, directions
// disable adblockers
import React, { useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api"

const center = { lat: 43.647725, lng: -79.384851 }


export default function Maps() {
  const [map, setMap] = useState( /** @type google.maps.Map */(null)) //add autocompletions provided by google maps
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState(null)
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
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return
    }
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
    console.log("directionsService duration:", duration)
    
    // eslint-disable-next-line no-undef
    const distanceMatrixService = new google.maps.DistanceMatrixService()
    const resultsWithTraffic = await distanceMatrixService.getDistanceMatrix({
      origins: [originRef.current.value],
      destinations: [destinationRef.current.value],
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
      drivingOptions: {departureTime: new Date(Date.now())}
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
    return <div>Maps Loading...</div>
  }
  return (
    <div className='flex flex-col justify-between w-fit figma-bookmark-container px-5 py-5'>
      <section>
        <Autocomplete>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Origin" type="text" name="origin" ref={originRef} />
        </Autocomplete>
        <Autocomplete>
          <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Destination" type="text" name="destination" ref={destinationRef} />
        </Autocomplete>
        <div className='flex'>
          <button className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 rounded hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1" onClick={calculateRoute}>Show Route</button>
          <button className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 rounded hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1" onClick={clearRoute}>Clear</button>
          <button
            className="text-slate-400 block bg-white rounded-md py-2 px-2 mr-2 rounded hover:outline-none hover:border-sky-500 hover:ring-sky-500 hover:ring-1"
            name="center-back"
            onClick={() => map.panTo(center)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </button>
        </div>
        <div className="text-slate-200 mr-4 font-bold">Distance: {distance}</div>
        <div className="text-slate-200 mr-4 font-bold">No traffic: {durationNoTraffic}</div>
        <div className="text-slate-200 mr-4 font-bold">With traffic: {durationTraffic}</div>
        
      </section>

      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: '400px', height: '400px' }}
        options={{
          streetViewControl: false,
          mapTypeControl: false
        }}
        onLoad={(map) => setMap(map)}

      >
        <Marker position={center} />
        {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
      </GoogleMap>
    </div>
  );

}