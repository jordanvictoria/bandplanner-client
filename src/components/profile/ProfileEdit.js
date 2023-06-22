import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBandUsers, editProfile } from "./ProfileManager";
import { UploadFile } from "../cloudinary/UploadFile"

export const ProfileEdit = () => {
    const localUser = localStorage.getItem("userId");
    const navigate = useNavigate()
    const { userId } = useParams()
    const [error, updateError] = useState("")
    const [url, setURL] = useState("")
    const [profileEditURL, setProfileEditURL] = useState("")
    const [profile, updateProfile] = useState({
        id: 0,
        user: 0,
        project_title: "",
        photo: "",
        bio: "",
        streaming: "",
        website: "",
        instagram: "",
        twitter: "",
        facebook: "",
        tiktok: ""
    })


    useEffect(
        () => {
            getBandUsers().then((userArr) => {
                const matchedUser = userArr.find(user => user.user === parseInt(localUser))
                updateProfile(matchedUser)
            })
        }, [userId]
    )

    useEffect(
        () => {
            if (profile) {
                setProfileEditURL(profile.photo)
            }
        }, [profile])

    useEffect(
        () => {
            if (url !== "") {
                HandlePhotoChange(url)
            }
        }, [url])


    function handleOnUpload(error, result, widget) {
        if (error) {
            updateError(error);
            widget.close({
                quiet: true
            });
            return;
        }
        setURL(result?.info?.secure_url)
    }


    const HandlePhotoChange = (url) => {
        setProfileEditURL("")
        const copy = { ...profile }
        copy.photo = url
        updateProfile(copy)
    }


    const profileEditButtonClick = async (event) => {
        event.preventDefault()


        await editProfile({
            id: profile.id,
            user: userId,
            project_title: profile.project_title,
            photo: profile.photo,
            bio: profile.bio,
            streaming: profile.streaming,
            website: profile.website,
            instagram: profile.instagram,
            twitter: profile.twitter,
            facebook: profile.facebook,
            tiktok: profile.tiktok
        })

        // const newBandUsers = await getBandUsers()
        // setBandUsers(newBandUsers)
    }


    return <>
        <div className="editProfileContainer">
            <form className="editProfileForm">
                <fieldset>
                    <div>Artist Title:
                        <input required autoFocus type="text" id="project_title" placeholder={profile.project_title} value={profile.project_title} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.project_title = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Photo:
                        {profileEditURL === "" ? ""
                            : <img src={profileEditURL} alt="artist photo" />
                            }
                        {url === "" ? ""
                            : <img src={url} alt="artist photo" />}
                        <UploadFile onUpload={handleOnUpload} />
                    </div>
                    <div>Bio:
                        <input type="text" id="bio" placeholder={profile.bio} value={profile.bio} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.bio = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Link to Streaming:
                        <input type="url" id="streaming" placeholder={profile.streaming} value={profile.streaming} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.streaming = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Website:
                        <input type="url" id="website" placeholder={profile.website} value={profile.website} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.website = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Instagram:
                        <input type="url" id="instagram" placeholder={profile.instagram} value={profile.instagram} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.instagram = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Twitter:
                        <input type="url" id="twitter" placeholder={profile.twitter} value={profile.twitter} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.twitter = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Facebook:
                        <input type="url" id="facebook" placeholder={profile.facebook} value={profile.facebook} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.facebook = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <div>Tiktok:
                        <input type="url" id="tiktok" placeholder={profile.tiktok} value={profile.tiktok} onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.tiktok = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                    </div>
                    <button onClick={(clickEvent) => {
                        profileEditButtonClick(clickEvent)
                        navigate(`/profile`)
                    }}>Save</button>
                    <button className="cancelEdit" onClick={() => { navigate(`/profile`) }}>Cancel</button>
                </fieldset>
            </form>
        </div>
    </>
}