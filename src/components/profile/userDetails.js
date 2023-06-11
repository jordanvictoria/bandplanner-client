import { useState, useEffect } from "react"
import { getAllUsers, getUserById } from "./UserManager"
import { useNavigate, useParams } from "react-router-dom"
import { addNewSubscription } from "./UserManager"
import { GetAllSubscriptions } from "../events/postManager"
import { deleteSubscription } from "../events/postManager"

export const UserDetails = () => {
    const [user, setUser] = useState({})
    const [subscriptions, setSubscriptions] = useState([])
    const [subscribed, setSubscribed] = useState({})
    
    const { userId } = useParams()
    const navigate = useNavigate()
    const localUser = localStorage.getItem("auth_token");
    const localUserObj = JSON.parse(localUser);
    useEffect(
        () => {
            getUserById(userId)
                .then((data) => {
                    setUser(data)
                })
            GetAllSubscriptions(localUserObj).then((data) => { setSubscriptions(data) })
        }, [userId]
    )
    useEffect(
        () => {
            const subscribed = subscriptions.find((s) => s.author_id === parseInt(userId) && localUserObj === s.follower_id)
            setSubscribed(subscribed)
        }, [subscriptions, userId]
    )
    // useEffect(
    //     () => {
    //         CreateNewSubscriptionOrDelete()
    //     }, [subscribed]
    // )

    const CreateNewSubscriptionOrDelete= () => {
        !subscribed ? addNewSubscription({
            follower_id: localUserObj,
            author_id: userId,
            created_on: new Date().toLocaleDateString()
        }).then(() => navigate("/"))
        : deleteSubscription(subscribed.id)
        .then(() =>  GetAllSubscriptions(localUserObj).then((data) => { setSubscriptions(data) }))
        .then(() => navigate(`/userDetails/${userId}`))
    }
    
    return <>
        <article className="userDetails">
            <div>{user.first_name} {user.last_name}</div>
            <div>{user?.profile_image}</div>
            <div>{user.username}</div>
            <div>{user.bio}</div>
            <div>{user.created_on}</div>
            
            <button onClick={(evt) => {
                evt.preventDefault();
                CreateNewSubscriptionOrDelete()
            }}>{!subscribed ? "Subscribe" : "Unsubscribe"}</button>
        </article>
    </>
}