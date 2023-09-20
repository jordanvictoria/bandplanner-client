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
        <div className="site-background">
            <div className="header">
                <div className="button-wrap">
                    <Link to={`/profile/${parseInt(bandUserObj.id)}/edit`}>
                        <button className="add-event-button custom-button"
                        >Edit Profile</button>
                    </Link>
                </div>
            </div>
            <div className="profile-content">
                <div className="profileContainer">
                    <div className="containerOne">
                        <div className="artistName">
                            <b>Artist: </b>
                            {bandUserObj.project_title ? (
                                <>{bandUserObj.project_title}</>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="profileInfo">
                            <div className="profileLinks">
                                <button className="link-button">
                                    {bandUserObj.streaming ? (
                                        <a href={bandUserObj.streaming} target="_blank" rel="noopener noreferrer"> Streaming</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <button className="link-button">
                                    {bandUserObj.website ? (
                                        <a href={bandUserObj.website} target="_blank" rel="noopener noreferrer"> Website</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <button className="link-button">
                                    {bandUserObj.instagram ? (
                                        <a href={bandUserObj.instagram} target="_blank" rel="noopener noreferrer"> Instagram</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <button className="link-button">
                                    {bandUserObj.twitter ? (
                                        <a href={bandUserObj.twitter} target="_blank" rel="noopener noreferrer"> Twitter</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <button className="link-button">
                                    {bandUserObj.facebook ? (
                                        <a href={bandUserObj.facebook} target="_blank" rel="noopener noreferrer"> Facebook</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                                <button className="link-button">
                                    {bandUserObj.tiktok ? (
                                        <a href={bandUserObj.tiktok} target="_blank" rel="noopener noreferrer"> Tiktok</a>
                                    ) : (
                                        ""
                                    )}
                                </button>
                            </div>

                            <div className="profilePhoto">
                                {bandUserObj.photo ? (

                                    <img src={bandUserObj.photo} alt="profile photo" />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="artistBio">
                        <b>Bio: </b>
                        {bandUserObj.bio ? (
                            <>{bandUserObj.bio}</>
                        ) : (
                            ""
                        )}
                    </div>

                </div>
            </div>
        </div>
    </>
}




