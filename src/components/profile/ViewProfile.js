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
                <div>Link to Streaming: 
                <a href={bandUserObj.streaming} target="_blank" rel="noopener noreferrer"> {bandUserObj.streaming}</a>
                </div>
                <div>Website: 
                <a href={bandUserObj.website} target="_blank" rel="noopener noreferrer"> {bandUserObj.website}</a>
                    </div>
                <div>Instagram: 
                <a href={bandUserObj.instagram} target="_blank" rel="noopener noreferrer"> {bandUserObj.instagram}</a>
                </div>
                <div>Twitter: 
                <a href={bandUserObj.twitter} target="_blank" rel="noopener noreferrer"> {bandUserObj.twitter}</a>
                </div>
                <div>Facebook: 
                <a href={bandUserObj.facebook} target="_blank" rel="noopener noreferrer"> {bandUserObj.facebook}</a>
                </div>
                <div>Tiktok: 
                <a href={bandUserObj.tiktok} target="_blank" rel="noopener noreferrer"> {bandUserObj.tiktok}</a>
                </div>
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





