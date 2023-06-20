import { Route, Routes } from "react-router-dom"
import { Home } from "../components/events/Home"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { LiveEvents } from "../components/live/LiveEvents"
import { Setlists } from "../components/live/Setlists"
import { Releases } from "../components/releases/Releases"
import { MediaList } from "../components/press/MediaList"
import { PressClipping } from "../components/press/PressClipping"
import { ViewProfile } from "../components/profile/ViewProfile"
import { ProfileEdit } from "../components/profile/ProfileEdit"


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
      <Route path="/pressclipping" element={<PressClipping  />} />
      <Route path="/medialist" element={<MediaList  />} />
      <Route path="/profile" element={<ViewProfile  />} />
      <Route path="/profile/:profileId/edit" element={<ProfileEdit  />} />
      </Route>
    </Routes>
  </>
}






