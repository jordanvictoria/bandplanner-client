import { useEffect, useRef, useState } from "react"


export const ReplaceFile =({onUpload}) => {
    const [url, setURL] = useState("")
    const cloudinaryRef = useRef()
    const widgetRef = useRef()
    useEffect(
        () => {
            cloudinaryRef.current = window.cloudinary 
            widgetRef.current= cloudinaryRef.current.createUploadWidget({
                cloudName: 'dryxmf6h7',
                uploadPreset: 'w7kba2jx',
                api_key: '411635363534723'
            }, function (error,result) {
                if ( error || result.event === 'success' ) {
                    onUpload(error, result);
                  }
                
               
            })
        },[]
    )
    return (
        <button onClick={(event) => {event.preventDefault(); widgetRef.current.open()}} >Replace Image</button>
    )
}