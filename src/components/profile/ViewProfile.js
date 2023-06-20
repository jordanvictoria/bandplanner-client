import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBandUsers } from "./ProfileManager"
import "./profile.css"

export const ViewProfile = () => {
    const localUser = localStorage.getItem("userId");
    const [bandUserObj, setBandUserObj] = useState({})

    useEffect(
        () => {
            getBandUsers().then((userArr) => {
                const matchedUser = userArr.find(user => user.user === parseInt(localUser))
                setBandUserObj(matchedUser)
            })
        }, []
    )




    return <>
        <div className="container">
            <div className="profileBandName">
                {bandUserObj.full_name}'s Profile
            </div>
            <div className="profileContainer">
                <div>
                    <img src={bandUserObj.photo} alt="profile photo" />
                </div>
                <div>Artist: {bandUserObj.project_title}</div>
                <div>Bio: {bandUserObj.bio}</div>
                <div>Link to Streaming: {bandUserObj.streaming}</div>
                <div>Website: {bandUserObj.website}</div>
                <div>Instagram: {bandUserObj.instagram}</div>
                <div>Twitter: {bandUserObj.twitter}</div>
                <div>Facebook: {bandUserObj.facebook}</div>
                <div>Tiktok: {bandUserObj.tiktok}</div>
                <div>
                    <Link to={`/profile/${parseInt(bandUserObj.id)}/edit`}>
                        <button className="editProfile"
                        >Edit Profile</button>
                    </Link>
                </div>
            </div>
        </div>
    </>
}





