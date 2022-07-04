import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../redux/redux-saga/sagaActions";

import "./share-recipe-page.styles.css";

const ShareRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    recipeName: '',
    ingredients: [],
    method: [],
    preparationTime: 0
  });
  const ingredientInput = useRef(null);
  const methodInput = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (value, field) => {
    if (field === 'recipeName') setRecipeInfo({ ...recipeInfo, recipeName: value });
    if (field === 'time') setRecipeInfo({ ...recipeInfo, preparationTime: value });
  }

  const handleClick = (e, field) => {
    e.preventDefault(e);
    if (field === 'ingredient') {
      setRecipeInfo(prev => ({ ...prev, ingredients: prev.ingredients.concat(ingredientInput.current.value) }));
      setTimeout(() => ingredientInput.current.value = '', 200);
    }
    if (field === 'method') {
      setRecipeInfo(prev => ({ ...prev, method: prev.method.concat(methodInput.current.value) }));
      setTimeout(() => methodInput.current.value = '', 200);
    }
  }

  return (
    <div className="share-recipe-container">
      <div className="form">
        <div className="form-title">
          <h2>Share your recipe</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="recipeName">Your recipe name</label>
              <input className="share-input" name="recipeName" type="text" onChange={(e) => handleChange(e.target.value, 'recipeName')}/>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="ingredients">Add your recipe ingredients</label>
              <input className="share-input" name="ingredients" type="text" ref={ingredientInput}/>
            </div>
            <div className="add-btn">
              <button type="button" onClick={(e) => handleClick(e, 'ingredient')}>Add Ingredient</button>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="method">Add preparation methods</label>
              <input className="share-input" name="method" type="text" ref={methodInput}/>
            </div>
            <div className="add-btn">
              <button type="button" onClick={(e) => handleClick(e, 'method')}>Add Method</button>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="preparationTime">Preparation time in minutes</label>
              <input className="share-input" name="preparationTime" type="number" onChange={(e) => handleChange(e.target.value, 'time')}/>
            </div>
          </div>

          <div className="submit-btn-wrapper"><button type="submit" className="submit-btn">Share Recipe</button></div>
        </form>
      </div>
      <div className="recipeInfo">
        <div><h3>Recipe Name: {recipeInfo.recipeName}</h3></div>
        <div>
          <h3>Ingredients:</h3>
          <ul>
            { recipeInfo.ingredients.map(item => (
              <li key={uuidv4()}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Methods:</h3>
          <ol>
            { recipeInfo.method.map(item => ( 
              <li key={uuidv4()}>{item}</li>
            ))}
          </ol>
        </div>
        <div><h3>Preparation Time: {recipeInfo.preparationTime} min</h3></div>
      </div>
    </div>
  )
}

export default ShareRecipePage;