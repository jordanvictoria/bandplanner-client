import { useEffect, useState } from "react"
import { getTags } from "./tagManager"
import { TagForm } from "./tagForm"

export const TagList = () => {
    const [tags, setTags] = useState([])
    useEffect(
        () => {
            getTags().then((data) => {
                setTags(data)
            })
        }, []
    )

    const getAllTags = () => {
        getTags().then((data) => {
            setTags(data);
        })
    }

    return <>
        <div>
            {
                tags.map((tag) => {
                    return <>
                        <div>{tag.label}</div>
                        <button>Edit</button>
                        <button>Delete</button>
                    </>
                })
            }
        </div>
        <div>
            <TagForm getAllTags={getAllTags} />
        </div>
    </>
}