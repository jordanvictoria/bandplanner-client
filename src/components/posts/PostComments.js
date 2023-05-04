import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getPostById } from "./postManager"
import { deleteComment } from "./commentManager"
// import { ReactComponent as YellowStar } from "../images/favorite-star-yellow.svg"

export const PostComments = () => {
    const { postId } = useParams()
    const [post, setPost] = useState({})
    const localUser = localStorage.getItem("userId");
    // const localUserObj = JSON.parse(localUser);

    useEffect(
        () => {
            getPostById(parseInt(postId))
                .then((data) => {
                    setPost(data)
                })
        },
        [postId]
    )
    console.log(post)
    const deleteIcon = (comment) => {
        if (comment.author_id === parseInt(localUser)) {
            return <>
                <svg onClick={() => deleteComment(comment.id).then(() => getPostById(parseInt(postId))
                            .then((data) => {
                                setPost(data)}))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="trash">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </>

        } else {
            return ""
        }
    }

    return <>
        {
            post?.comments?.map(comment => {
                return <>
                    <div className="myComment">
                        <div>{comment.content}</div>
                        {
                            comment ? deleteIcon(comment)
                                : ""
                        }
                    </div>
                </>
            })
        }
        <Link to={`/commentForm/${post.id}`}>Add a comment</Link>
    </>
}