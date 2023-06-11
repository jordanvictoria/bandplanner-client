import { useState } from "react"
import { addCategory, getCategories } from "./categoryManager"



export const CategoryForm = ({GetAllCategories}) => {
    const [category, setCategory] = useState({})

    const handleControlledInputChange = (event) => {
        const newCategory = {...category}
        newCategory[event.target.name] = event.target.value
        setCategory(newCategory)
      }
    
      const CreateNewCategory = () => {
        
    
        if (category.label === "") {
          window.alert("Please provide a label")
        } 
        else {
            addCategory({
             label: category.label
            })
            .then(res => res.json()).then(() => GetAllCategories())
          }
        }
      


    return<>
    <form>
      <h2>Create a Category</h2>
      <fieldset>
        <div className="">
          <label htmlFor="">Category Label </label>
          <input type="text" name="label" required autoFocus className="form-control"
            placeholder="Category Label"
            onChange={handleControlledInputChange}
          />
        </div>
      </fieldset>
      
     
    
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          CreateNewCategory()
        }}
        className="btn btn-primary">
        Create a Category
      </button>
    </form>
    </>
}