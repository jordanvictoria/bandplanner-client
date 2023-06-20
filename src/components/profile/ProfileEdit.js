import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getBandUsers } from "./ProfileManager";

export const ProfileEdit = () => {
    const localUser = localStorage.getItem("userId");
    const { userId } = useParams()
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
                const matchedUser = userArr.find(user => user.user === parseInt(userId))
                updateProfile(matchedUser)
            })
        }, [userId]
    )
}