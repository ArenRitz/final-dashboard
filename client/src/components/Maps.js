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
 
 
  useEffect(() => {
    calculateRoute()


 }, [userData])


  async function calculateRoute() {
    // if no route user input, use the users's default route. If no default route, set to empty
    console.log("********", userData)
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
    <div className='card bg-base-200 border-2 border-base-content flex flex-col justify-between w-fit px-3 py-3 rounded-[40px]'>
      <section>
        
        <div className='flex justify-between'>
          <svg width="30px" height="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="currentcolor" d="M18.5 25.5v-9.25L24 12.6l5.5 3.65v9.25h-3v-6h-5v6ZM24 40.05q6.65-6.05 9.825-10.975Q37 24.15 37 20.4q0-5.9-3.775-9.65T24 7q-5.45 0-9.225 3.75Q11 14.5 11 20.4q0 3.75 3.25 8.675Q17.5 34 24 40.05ZM24 44q-8.05-6.85-12.025-12.725Q8 25.4 8 20.4q0-7.5 4.825-11.95Q17.65 4 24 4q6.35 0 11.175 4.45Q40 12.9 40 20.4q0 5-3.975 10.875T24 44Z"/></svg>
          <Autocomplete className="grow">
            <input className="placeholder:italic input input-bordered focus:outline-none focus:border-primary focus:ring-2 w-full mb-1 h-8" placeholder="Origin" type="text" name="origin" ref={originRef} />
          </Autocomplete>
        </div>

        <div className='flex justify-between'>
          <svg width="30px" height="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path fill="currentcolor" d="m26.35 42-5.7-14.65L6 21.65V19.5L42 6 28.5 42Zm.9-5.7 9.6-25.15-25.1 9.6 11.2 4.3Zm-4.3-11.25Z"/></svg>
          <Autocomplete className="grow">
            <input className="placeholder:italic input input-bordered w-full focus:outline-none focus:border-primary focus:ring-2 mb-1 h-8" placeholder="Destination" type="text" name="destination" ref={destinationRef} />
          </Autocomplete>
        </div>
        <div className='flex justify-between'>
          <button className="btn btn-outline btn-accent btn-sm hover:outline-none font-normal normal-case mb-1" onClick={calculateRoute}>Show Route</button>
          <button className="btn btn-outline btn-accent btn-sm hover:outline-none font-normal normal-case mb-1" onClick={clearRoute}>Clear</button>
          <button 
            alt="Pan to Current Location"
            className="btn btn-outline btn-accent btn-sm hover:outline-none font-normal normal-case mb-1"
            name="center-back"
            onClick={() => map.panTo(currentLocation)}
          >
            <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path fill="currentcolor" d="M21,11H19.93A8,8,0,0,0,13,4.07V3a1,1,0,0,0-2,0V4.07A8,8,0,0,0,4.07,11H3a1,1,0,0,0,0,2H4.07A8,8,0,0,0,11,19.93V21a1,1,0,0,0,2,0V19.93A8,8,0,0,0,19.93,13H21a1,1,0,0,0,0-2Zm-9,7a6,6,0,1,1,6-6A6,6,0,0,1,12,18Zm0-9a3,3,0,1,0,3,3A3,3,0,0,0,12,9Zm0,4a1,1,0,1,1,1-1A1,1,0,0,1,12,13Z"/></svg> 
          </button>
          <button className="btn btn-outline btn-accent btn-sm hover:outline-none font-normal normal-case mb-1" onClick={saveHomeAndWork}>Save Default Route</button>
        </div>
      </section>

      <section className="relative">
        {distance ? 
          <div className="overflow-x-auto">
            <table className="table table-compact w-1/3 m-2 opacity-80 z-10 absolute left-0 top-0">
              <tbody>
                <tr>
                  <th className="py-1">Distance</th>
                  <td className="py-1">{distance}</td>
                </tr>
                <tr>
                  <th className="py-1">With Traffic</th>
                  <td className="py-1">{durationTraffic}</td>
                </tr>
                <tr>
                  <th className="py-1">Typical Traffic</th>
                  <td className="py-1">{durationNoTraffic}</td>
                </tr>
              </tbody>
            </table>
          </div>
        : null}

        <GoogleMap
          zoom={15}
          center={currentLocation}
          mapContainerStyle={{ width: '400px', height: '288px' }}
          mapContainerClassName={"rounded-[2rem]"}
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
      </section>

    </div>
    </>
  );

}