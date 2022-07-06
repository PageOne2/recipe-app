import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../redux/redux-saga/sagaActions";
// import DeleteIcon from '@mui/icons-material/Delete';

import "./share-recipe-page.styles.css";

const ShareRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    recipeName: '',
    ingredients: [],
    method: [],
    preparationTime: 0
  });
  const recipeNameInput = useRef(null);
  const ingredientInput = useRef(null);
  const methodInput = useRef(null);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleChange = (value, field) => {
    if (field === 'time') setRecipeInfo(prev => ({ ...prev, preparationTime: value }));
  }

  const handleClick = (e, field) => {
    e.preventDefault(e);
    if (field === 'recipeName') {
      setRecipeInfo(prev => ({ ...prev, recipeName: recipeNameInput.current.value.toUpperCase() }));
      setTimeout(() => recipeNameInput.current.value = '', 200);
    } else if (field === 'ingredient') {
      setRecipeInfo(prev => ({ ...prev, ingredients: prev.ingredients.concat(ingredientInput.current.value) }));
      setTimeout(() => ingredientInput.current.value = '', 200);
    } else if (field === 'method') {
      setRecipeInfo(prev => ({ ...prev, method: prev.method.concat(methodInput.current.value) }));
      setTimeout(() => methodInput.current.value = '', 200);
    }
  }

  return (
    <div className="share-recipe-container">
      <div className="share-recipe-form">
        <div className="form-title">
          <h2>Share your recipe</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="recipeName">Your recipe name</label>
              <input className="share-input" name="recipeName" type="text" ref={recipeNameInput}/>
            </div>
            <div className="add-btn">
              <button type="button" onClick={(e) => handleClick(e, 'recipeName')}>Add Recipe Name</button>
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
      <div className="recipe-info">
        <div className="recipe-info-title recipe-name">
          <h3>Recipe Name</h3>
          {recipeInfo.recipeName.length ? <p>{recipeInfo.recipeName}</p> : null}
        </div>
        <div className="recipe-info-title ingredients">
          <h3>Ingredients</h3>
          <ul className="items-list">
            { recipeInfo.ingredients.map(item => (
              <li key={uuidv4()}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="recipe-info-title methods">
          <h3>Methods</h3>
          <ol className="items-list">
            { recipeInfo.method.map(item => ( 
              <div className="recipe-item">
                <li key={uuidv4()}>{item}</li>
                <div className="delete-item-btn">X</div>
                {/* <DeleteIcon /> */}
              </div>
            ))}
          </ol>
        </div>
        <div className="recipe-info-title preparation-time">
          <h3>Preparation Time</h3>
          <p>{recipeInfo.preparationTime} min</p>
        </div>
      </div>
    </div>
  )
}

export default ShareRecipePage;