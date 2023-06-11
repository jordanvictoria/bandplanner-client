import { CategoryForm } from "./categoryForm";
import { getCategories } from "./categoryManager";
import { useEffect, useState } from "react";
import "./categories.css"
export const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    GetAllCategories()
    
  }, []);

   const GetAllCategories = () => {
    getCategories().then((data) => {
        setCategories(data);
  })}
  return (
    <>
    <div className="category_container">
      <div className="category_list">
        {categories.map((category) => {
          return (
            <>
              <div>{category.label}</div>
              <button>Edit</button>
              <button>Delete</button>
            </>
          );
        })}
      </div>
      <div className="category_form">
        <CategoryForm  GetAllCategories ={GetAllCategories}/>
      </div>
      </div>
    </>
  );
};
