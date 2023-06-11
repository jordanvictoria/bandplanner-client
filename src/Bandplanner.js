import { useState} from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


export const Bandplanner = () => {
const [token, setTokenState] = useState(localStorage.getItem('band_token'))

const setToken = (newToken) => {
  localStorage.setItem('band_token', newToken)
  setTokenState(newToken)
}



  return <>
    <NavBar token={token} setToken={setToken} />
    <ApplicationViews token={token} setToken={setToken} />
  </>
}

