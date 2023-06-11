import { useState, useEffect } from "react"
import { createTag } from "./tagManager"

export const TagForm = ({ getAllTags }) => {
  const [tag, setTag] = useState({})


  const handleControlledInputChange = (event) => {
    const newTag = { ...tag }
    newTag[event.target.name] = event.target.value
    setTag(newTag)
  }

  const createNewTag = () => {
    if (tag.label === "") {
      window.alert("Please provide a label")
    }
    else {
      createTag({
        label: tag.label
      })
        .then(() => getAllTags())
    }
  }




  return <>
    <form className="">
      <h2 className="">Create Tag</h2>
      <fieldset>
        <div className="">
          <label htmlFor="name">Label: </label>
          <input type="text" name="label" required autoFocus className="form-control"
            placeholder="Tag label"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          createNewTag()
        }}
        className="btn btn-primary">
        Save Tag
      </button>
    </form>
  </>
}