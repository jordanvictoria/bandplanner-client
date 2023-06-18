import { Route, Routes } from "react-router-dom"
import { Home } from "../components/events/Home"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { LiveEvents } from "../components/live/LiveEvents"
import { Setlists } from "../components/live/Setlists"
import { Releases } from "../components/releases/Releases"


export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken}  />} />
      <Route path="/register" element={<Register setToken={setToken}  />} />
      <Route element={<Authorized token={token}  />}>
      <Route path="/" element={<Home  />} />
      <Route path="/live" element={<LiveEvents  />} />
      <Route path="/setlist" element={<Setlists  />} />
      <Route path="/releases" element={<Releases  />} />
      </Route>
    </Routes>
  </>
}






