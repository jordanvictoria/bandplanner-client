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
        <div className="site-background hero is-fullheight">
            <Link to={`/profile/${parseInt(bandUserObj.id)}/edit`}>
                <button className="editProfile"
                >Edit Profile</button>
            </Link>

            <div className="profileContainer">
                <div className="profileContent">
                    <div className="profileInfo">
                        <div className="artistName">
                            <b>Artist:</b>
                            {bandUserObj.project_title ? (
                                <>{bandUserObj.project_title}</>
                            ) : (
                                ""
                            )}
                            {bandUserObj.project_title}</div>
                        <div className="artistBio">
                            <b>Bio:</b>
                            {bandUserObj.bio ? (
                                <>{bandUserObj.bio}</>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="profilePhoto">
                        {bandUserObj.photo ? (

                            <img src={bandUserObj.photo} alt="profile photo" />
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <div className="profileLinks">
                    <div>
                        {bandUserObj.streaming ? (
                            <a href={bandUserObj.streaming} target="_blank" rel="noopener noreferrer"> Streaming</a>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {bandUserObj.website ? (
                            <a href={bandUserObj.website} target="_blank" rel="noopener noreferrer"> Website</a>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {bandUserObj.instagram ? (
                            <a href={bandUserObj.instagram} target="_blank" rel="noopener noreferrer"> Instagram</a>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {bandUserObj.twitter ? (
                            <a href={bandUserObj.twitter} target="_blank" rel="noopener noreferrer"> Twitter</a>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {bandUserObj.facebook ? (
                            <a href={bandUserObj.facebook} target="_blank" rel="noopener noreferrer"> Facebook</a>
                        ) : (
                            ""
                        )}
                    </div>
                    <div>
                        {bandUserObj.tiktok ? (
                            <a href={bandUserObj.tiktok} target="_blank" rel="noopener noreferrer"> Tiktok</a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>

            </div>
        </div>
    </>
}





