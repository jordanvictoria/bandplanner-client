import { useEffect, useState } from "react"
import { getAllUsers } from "./UserManager"
import { Link } from "react-router-dom"
import "./users.css"

export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers().then((data) => {
            setUsers(data)
        })
    },[])
    return <>
    <div>
        {
            users.map((user) => {
                return(
                    <div className="individual_user">
                     <h2>{user.username}</h2> 
                    <Link to={`/userDetails/${user.id}`}><div>{user.first_name} {user.last_name}</div> </Link>
                    <div>{user.email}</div>
                    </div>
                )
            })
        }
    </div>
    </>
}