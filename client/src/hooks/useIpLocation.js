import axios from "axios"
import { useState, useEffect } from "react";

const useIpLocation = () => {

  const [state, setState] = useState({ lat: 0, lon: 0 })

  useEffect(() => {

    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`

    axios.get(url)
      .then((res) => {
        console.log("respsnse:",res.data)
        setState(() => ({
          lat: res.data.location.lat,
          lon: res.data.location.lng
        }))
      })

  }, [])
  return state
}

export default useIpLocation