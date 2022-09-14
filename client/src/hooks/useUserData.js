import axios from "axios"
import { useState, useEffect } from "react";

const useUserData = (user_id) => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    if (user_id) {
    axios.get(`http://localhost:8080/users/${user_id}`)
      .then((res) => {
        setUserData(() => (
          res.data[0]
        ))
      })
      .catch((err) => {
        console.log(err);
      });
    } else {
      return;
    }
  }, [user_id])

  return {
    userData,
    setUserData
  }
}

export default useUserData