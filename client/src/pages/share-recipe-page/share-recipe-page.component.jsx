import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../redux/redux-saga/sagaActions";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import "./share-recipe-page.styles.css";

const ShareRecipePage = () => {
  const [recipeInfo, setRecipeInfo] = useState({
    recipeName: '',
    ingredients: [],
    methods: [],
    preparationTime: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState({ field: '', item: "", itemIdx: null });
  const editableItem = useRef(null);
  const recipeNameInput = useRef(null);
  const ingredientInput = useRef(null);
  const methodInput = useRef(null);
  const ingredientRecipeItems = useRef(null);
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
      setRecipeInfo(prev => ({ ...prev, methods: prev.methods.concat(methodInput.current.value) }));
      setTimeout(() => methodInput.current.value = '', 200);
    }
  }

  const handleDeleteItem = (idx, field) => {
    if (editMode) setEditMode(false);
    if (field === "ingredient") {
      const ingredientsNewArr = recipeInfo.ingredients.filter((item, index) => index !== idx);
      setRecipeInfo(prev => ({ ...prev, ingredients: ingredientsNewArr }));
    } else if (field === "method") {
      const methodsNewArr = recipeInfo.methods.filter((item, index) => index !== idx);
      setRecipeInfo(prev => ({ ...prev, methods: methodsNewArr }));
    }
  }
  
  const openItemEditor = (field, item, idx) => {
    setItemBeingEdited({ field: field, item: item, itemIdx: idx });
    setEditMode(true);
  }

  const handleEditedItem = (field, idx) => {
    if (editableItem.current.innerText.length) {
      if (field === "ingredients") {
        const ingredientsNewArray = recipeInfo.ingredients;
        ingredientsNewArray[idx] = editableItem.current.innerText.replace(/\s+/g,' ').trim();
        setRecipeInfo(prev => ({ ...prev, ingredients: ingredientsNewArray }));
      } else if (field === "methods") {
        const methodsNewArray = recipeInfo.methods;
        methodsNewArray[idx] = editableItem.current.innerText.replace(/\s+/g,' ').trim();
        setRecipeInfo(prev => ({ ...prev, methods: methodsNewArray }));
      }
    }
    setEditMode(false);
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
      <div className="share-recipe-info">
        <div className="recipe-info-title recipe-name-field">
          <h3>Recipe Name</h3>
          {recipeInfo.recipeName.length ? <p>{recipeInfo.recipeName}</p> : null}
        </div>
        <div className="recipe-info-title ingredients">
          <h3>Ingredients</h3>
          <ul className="items-list" ref={ingredientRecipeItems}>
            { recipeInfo.ingredients.map((item, idx) => (
              <div className="recipe-item" key={uuidv4()}>
                <li>{item}</li>
                <div className="edit-or-delete">
                  <Edit className="edit-item-icon" onClick={() => openItemEditor('ingredients', item, idx)}/>
                  <Delete className="delete-item-icon" onClick={() => handleDeleteItem(idx, 'ingredient')}/>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="recipe-info-title methods">
          <h3>Methods</h3>
          <ol className="items-list">
            { recipeInfo.methods.map((item, idx) => ( 
              <div className="recipe-item" key={uuidv4()}>
                <li>{item}</li>
                <div className="edit-or-delete">
                  <Edit className="edit-item-icon" onClick={() => openItemEditor('methods' ,item, idx)}/>
                  <Delete className="delete-item-icon" onClick={() => handleDeleteItem(idx, 'method')}/>
                </div>
              </div>
            ))}
          </ol>
        </div>
        <div className="recipe-info-title preparation-time">
          <h3>Preparation Time</h3>
          <p>{recipeInfo.preparationTime} minutes</p>
        </div>
      </div>
      {editMode &&
      <div className="edit-mode">
        <div className="item">
          <div className="item-div">
            <div contentEditable="true" suppressContentEditableWarning="true" ref={editableItem}>{itemBeingEdited.item}</div>
          </div>
          <div className="edit-btn">
            <button onClick={() => handleEditedItem(itemBeingEdited.field, itemBeingEdited.itemIdx)}>Edit</button>
          </div>
        </div>
        <div className="close-edit-btn">
          <Close className="close-edit-icon" onClick={() => setEditMode(false)}/>
        </div>
      </div>
      }
    </div>
  )
}

export default ShareRecipePage;