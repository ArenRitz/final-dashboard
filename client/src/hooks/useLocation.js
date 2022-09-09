import { useState, useEffect } from "react";

const useLocation = () => {
  const [currLocation, setCurrLoc] = useState({ lat: 43.6532, lng: -79.3832 }) //toronto city hall

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(res => {
      setCurrLoc(() => ({
        lat: res.coords.latitude,
        lng: res.coords.longitude
      }))
    })
  }, [])

  return {currLocation, setCurrLoc}
}

export default useLocation