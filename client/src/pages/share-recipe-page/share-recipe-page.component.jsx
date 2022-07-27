import { useEffect ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../redux/redux-saga/sagaActions";
import { formatRecipeName } from "../../utils/formatStr";
import { createRecipeSuccess } from "../../redux/userReducer/userReducer";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";

import "./share-recipe-page.styles.css";

const ShareRecipePage = () => {
  const recipeInfoInitialState = {
    recipeName: "",
    ingredients: [],
    methods: [],
    servings: 0,
    preparationTime: 0
  };
  const [recipeInfo, setRecipeInfo] = useState(recipeInfoInitialState);
  const [file, setFile] = useState();
  const [editMode, setEditMode] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState({ field: "", item: "", itemIdx: null });
  const [recipeSharedSuccess, setRecipeSharedSuccess] = useState(false);
  const [recipeSharedFail, setRecipeSharedFail] = useState(false);
  const [recipeNameInputValue, setRecipeNameInputValue] = useState("");
  const [ingredientInputValue, setIngredientInputValue] = useState("");
  const [methodInputValue, setMethodInputValue] = useState("");
  const [servingsInputValue, setServingsInputValue] = useState(0); 
  const [preparationTimeInputValue, setPreparationTimeInputValue] = useState(0);
  const [editableItemInputValue, setEditableItemInputValue] = useState("");
  const createdRecipe = useSelector((state) => state.user.createdRecipe);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Object.keys(createdRecipe).length) {
      if (recipeSharedFail) setRecipeSharedFail(false);
      setRecipeSharedSuccess(true);
      setTimeout(() => {
        setRecipeSharedSuccess(false);
      }, 5000);
    }
  }, [createdRecipe]);

  useEffect(() => {
    return () => {
      dispatch(createRecipeSuccess({}));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipeInfo.recipeName.length && recipeInfo.ingredients.length && recipeInfo.methods.length) {
      const recipeObj = {
        recipeName: formatRecipeName(recipeInfo.recipeName),
        ingredients: recipeInfo.ingredients,
        method: recipeInfo.methods,
        servings: parseInt(servingsInputValue),
        preparationTime: parseInt(preparationTimeInputValue),
        imageCover: file
      };
      dispatch(createRecipe(recipeObj));
      setServingsInputValue(0);
      setPreparationTimeInputValue(0);
      setRecipeInfo({ ...recipeInfoInitialState });
    } else {
      setRecipeSharedFail(true); 
      setTimeout(() => {
        setRecipeSharedFail(false);
      }, 4000)
    }
  }

  const handleClick = (e, field) => {
    e.preventDefault(e);
    if (field === 'recipeName' && recipeNameInputValue.length) {
      setRecipeInfo(prev => ({ ...prev, recipeName: recipeNameInputValue.trim().toUpperCase() }));
      setRecipeNameInputValue("");
    } else if (field === 'ingredient' && ingredientInputValue.length) {
      setRecipeInfo(prev => ({ ...prev, ingredients: prev.ingredients.concat(ingredientInputValue) }));
      setIngredientInputValue("");
    } else if (field === 'method' && methodInputValue.length) {
      setRecipeInfo(prev => ({ ...prev, methods: prev.methods.concat(methodInputValue) }));
      setMethodInputValue("");
    }
  }

  const handleDeleteItem = (idx, field) => {
    if (editMode) setEditMode(false);
    if (field === "recipeName") {
      setRecipeInfo(prev => ({ ...prev, recipeName: '' }));
    } else if (field === "ingredient") {
      const ingredientsNewArr = recipeInfo.ingredients.filter((item, index) => index !== idx);
      setRecipeInfo(prev => ({ ...prev, ingredients: ingredientsNewArr }));
    } else if (field === "method") {
      const methodsNewArr = recipeInfo.methods.filter((item, index) => index !== idx);
      setRecipeInfo(prev => ({ ...prev, methods: methodsNewArr }));
    }
  }
  
  const openItemEditor = (field, item, idx) => {
    const itemToEdit = item.replace(/\s+/g, ' ').trim();
    setItemBeingEdited({ field: field, item: itemToEdit, itemIdx: idx });
    setEditMode(true);
  }

  const handleEditedItem = (field, idx) => {
    if (editableItemInputValue.length) {
      if (field === "recipeName") {
        const newRecipeName = editableItemInputValue.replace(/\s+/g, ' ').trim().toUpperCase();
        setRecipeInfo(prev => ({ ...prev, recipeName: newRecipeName }));
      } else if (field === "ingredients") {
        const ingredientsNewArray = recipeInfo.ingredients;
        ingredientsNewArray[idx] = editableItemInputValue.replace(/\s+/g,' ').trim();
        setRecipeInfo(prev => ({ ...prev, ingredients: ingredientsNewArray }));
      } else if (field === "methods") {
        const methodsNewArray = recipeInfo.methods;
        methodsNewArray[idx] = editableItemInputValue.replace(/\s+/g,' ').trim();
        setRecipeInfo(prev => ({ ...prev, methods: methodsNewArray }));
      }
    }
    setEditableItemInputValue("");
    setEditMode(false);
  }

  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    setFile(file);
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
              <label htmlFor="recipeImage">Your recipe image</label>
              <input 
              className="recipe-image-input"
              name="recipeImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileSelection(e)}
              />
            </div>
          </div>

          <div className="input-container">            
            <div className="input-wrapper">
              <label htmlFor="recipeName">Your recipe name</label>
              <input 
              className="share-input" 
              name="recipeName" 
              type="text" 
              value={recipeNameInputValue} 
              onChange={e => setRecipeNameInputValue(e.target.value)}
              />
            </div>
            <div className="add-btn">
              <button className="add-recipe-name" type="button" onClick={(e) => handleClick(e, 'recipeName')}>Add Recipe Name</button>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="ingredients">Add your recipe ingredients</label>
              <input 
              className="share-input" 
              name="ingredients" 
              type="text" 
              value={ingredientInputValue}
              onChange={e => setIngredientInputValue(e.target.value)}
              />
            </div>
            <div className="add-btn">
              <button className="add-ingredient" type="button" onClick={(e) => handleClick(e, 'ingredient')}>Add Ingredient</button>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="method">Add preparation methods</label>
              <input 
              className="share-input" 
              name="method" 
              type="text" 
              value={methodInputValue}
              onChange={e => setMethodInputValue(e.target.value)}
              />
            </div>
            <div className="add-btn">
              <button className="add-method" type="button" onClick={(e) => handleClick(e, 'method')}>Add Method</button>
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="servings">How many servings</label>
              <input 
              className="share-input" 
              name="servings" 
              type="number" 
              min="0" 
              value={servingsInputValue}
              onChange={e => {
                  if (e.target.value >= 0) setServingsInputValue(e.target.value);
                }
              }
              />
            </div>
          </div>

          <div className="input-container">
            <div className="input-wrapper">
              <label htmlFor="preparationTime">Preparation time in minutes</label>
              <input 
              className="share-input" 
              name="preparationTime" 
              type="number" 
              min="0" 
              value={preparationTimeInputValue}
              onChange={e => {
                  if (e.target.value >= 0) setPreparationTimeInputValue(e.target.value)
                }
              }
              />
            </div>
          </div>

          <div className="submit-btn-wrapper"><button type="submit" className="submit-btn">Share Recipe</button></div>
        </form>
      </div>
      <div className="share-recipe-info">
        <div className="recipe-info-title recipe-name-field">
          <h3>Recipe Name</h3>
          {recipeInfo.recipeName.length ? 
          <div className="recipe-name-wrapper">
            <p>{recipeInfo.recipeName}</p>
            <div className="edit-or-delete">
              <Edit className="edit-item-icon" onClick={() => openItemEditor('recipeName', recipeInfo.recipeName, null)}/>
              <Delete className="delete-item-icon" onClick={() => handleDeleteItem(null, 'recipeName')}/>
            </div>
          </div>
          : null}
        </div>
        <div className="recipe-info-title ingredients">
          <h3>Ingredients</h3>
          <ul className="items-list">
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
                  <Edit className="edit-item-icon" onClick={() => openItemEditor('methods', item, idx)}/>
                  <Delete className="delete-item-icon" onClick={() => handleDeleteItem(idx, 'method')}/>
                </div>
              </div>
            ))}
          </ol>
        </div>
        <div className="recipe-info-title servings">
          <h3>Servings</h3>
          <p>{servingsInputValue} servings</p>
        </div>
        <div className="recipe-info-title preparation-time">
          <h3>Preparation Time</h3>
          <p>{preparationTimeInputValue} minutes</p>
        </div>
      </div>
      {editMode &&
      <div className="edit-mode">
        <div className="item">
          <div className="item-input">
            <input 
            className=""
            type="text"
            placeholder={itemBeingEdited.item}
            value={editableItemInputValue}
            onChange={(e) => setEditableItemInputValue(e.target.value)}
            />
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
      {recipeSharedSuccess &&
      <div className="recipe-page-modal success-modal">
        <div>Recipe Created Successfully!</div>
      </div>
      }
      {recipeSharedFail &&
      <div className="recipe-page-modal error-modal">
        <div>All fields are required!</div>
      </div>
      }
    </div>
  )
}

export default ShareRecipePage;