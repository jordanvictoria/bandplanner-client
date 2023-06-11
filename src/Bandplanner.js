import { useState} from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const Bandplanner = () => {
const [token, setTokenState] = useState(localStorage.getItem('band_token'))
const [userId, setUserId] = useState(localStorage.getItem('userId'))

const setToken = (newToken, user_id) => {
  localStorage.setItem('band_token', newToken)
  localStorage.setItem('userId', user_id)
  setTokenState(newToken)
  setUserId(user_id)
}



  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} userId={userId} />
  </>
}

