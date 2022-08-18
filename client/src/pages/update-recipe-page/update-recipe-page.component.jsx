import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getRecipeById, updateRecipe } from '../../redux/redux-saga/sagaActions';
import { getRecipeByIdSuccess, updateRecipeSuccess } from "../../redux/recipeReducer/recipeReducer";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { formatRecipeName } from "../../utils/formatStr";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./update-recipe-page.styles.css";

const UpdateRecipePage = () => {
  const params = useParams();
  const recipe = useSelector(state => state.recipe.recipeById);
  const [updatedRecipeInfo, setUpdatedRecipeInfo] = useState({});
  const [file, setFile] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [itemBeingEdited, setItemBeingEdited] = useState({ field: "", item: "", itemIdx: null });
  const [editMode, setEditMode] = useState(false);
  const [editableItemInputValue, setEditableItemInputValue] = useState("");
  const [addMoreItemInputValue, setAddMoreItemInputValue] = useState("");
  const [addMoreItem, setAddMoreItem] = useState({ open: false, field: "" });
  const dispatch = useDispatch();
  const apiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${recipe.imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${recipe.imageCover}`;

  useEffect(() => {
    if (!Object.keys(recipe).length){
      dispatch(getRecipeById(params.recipeId));
    }

    return () => {
      dispatch(getRecipeByIdSuccess({}))
    }
  }, []);

  const handleDeleteItem = (idx, field) => {
    const updatedRecipe = {...recipe};
    if (editMode) setEditMode(false);
    if (field === "ingredient") {
      updatedRecipe.ingredients = updatedRecipe.ingredients.filter((item, index) => index !== idx);
      setUpdatedRecipeInfo(prev => ({ ...prev, ingredients: updatedRecipe.ingredients }));
      dispatch(updateRecipeSuccess(updatedRecipe)); 
    } else if (field === "method") {
      updatedRecipe.method = updatedRecipe.method.filter((item, index) => index !== idx);
      setUpdatedRecipeInfo(prev => ({ ...prev, method: updatedRecipe.method }));
      dispatch(updateRecipeSuccess(updatedRecipe));
    }
  }

  const openItemEditor = (field, item, idx) => {
    const itemToEdit = item.replace(/\s+/g, ' ').trim();
    setItemBeingEdited({ field: field, item: itemToEdit, itemIdx: idx });
    setEditMode(true);
  }

  const handleEditedItem = (field, idx) => {
    const updatedRecipe = {...recipe};
    if (editableItemInputValue.length) {
      if (field === "recipeName") {
        updatedRecipe.recipeName = editableItemInputValue.replace(/\s+/g, ' ').trim();
        updatedRecipe.recipeName = formatRecipeName(updatedRecipe.recipeName);
        setUpdatedRecipeInfo(prev => ({ ...prev, recipeName: updatedRecipe.recipeName }));
        dispatch(updateRecipeSuccess(updatedRecipe));
      } else if (field === "ingredients") {
        const newIngredientsArr = [...updatedRecipe.ingredients];
        newIngredientsArr[idx] = editableItemInputValue.replace(/\s+/g,' ').trim();
        updatedRecipe.ingredients = newIngredientsArr;
        setUpdatedRecipeInfo(prev => ({ ...prev, ingredients: updatedRecipe.ingredients }));
        dispatch(updateRecipeSuccess(updatedRecipe));
      } else if (field === "methods") {
        const newMethodArr = [...updatedRecipe.method];
        newMethodArr[idx] = editableItemInputValue.replace(/\s+/g,' ').trim();
        updatedRecipe.method = newMethodArr;
        setUpdatedRecipeInfo(prev => ({ ...prev, method: updatedRecipe.method }));
        dispatch(updateRecipeSuccess(updatedRecipe));
      }
    }
    setEditableItemInputValue("");
    setEditMode(false);
  }

  const handleAddMoreItem = (item) => {
    if (item.length) {
      const updatedRecipe = {...recipe};
      if (addMoreItem.field === "ingredient") {
        const newIngredientsArr = [...updatedRecipe.ingredients, item];
        updatedRecipe.ingredients = newIngredientsArr;
        setUpdatedRecipeInfo(prev => ({ ...prev, ingredients: updatedRecipe.ingredients }));
        dispatch(updateRecipeSuccess(updatedRecipe));
      } else if (addMoreItem.field === "method") {
        const newMethodArr = [...updatedRecipe.method, item];
        updatedRecipe.method = newMethodArr;
        setUpdatedRecipeInfo(prev => ({ ...prev, method: updatedRecipe.method }));
        dispatch(updateRecipeSuccess(updatedRecipe));
      }
      setAddMoreItemInputValue("");
    }
    setAddMoreItem({ open: false, field: "" });
  }

  const handleValueIncrease = (field) => {
    const updatedRecipe = {...recipe};
    if (field === "servings") {
      updatedRecipe.servings = updatedRecipe.servings + 1;
      setUpdatedRecipeInfo(prev => ({ ...prev, servings: updatedRecipe.servings }));
      dispatch(updateRecipeSuccess(updatedRecipe));
    } else if (field === "preparationTime") {
      updatedRecipe.preparationTime = updatedRecipe.preparationTime + 1;
      setUpdatedRecipeInfo(prev => ({ ...prev, preparationTime: updatedRecipe.preparationTime }));
      dispatch(updateRecipeSuccess(updatedRecipe));
    }
  }

  const handleValueDecrease = (field) => {
    const updatedRecipe = {...recipe};
    if (field === "servings") {
      updatedRecipe.servings = updatedRecipe.servings - 1;
      setUpdatedRecipeInfo(prev => ({ ...prev, servings: updatedRecipe.servings }));
      dispatch(updateRecipeSuccess(updatedRecipe));
    } else if (field === "preparationTime") {
      updatedRecipe.preparationTime = updatedRecipe.preparationTime - 1;
      setUpdatedRecipeInfo(prev => ({ ...prev, preparationTime: updatedRecipe.preparationTime }));
      dispatch(updateRecipeSuccess(updatedRecipe));
    }
  }
  
  const handleFileSelection = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  const handleUpdateSubmit = () => {
    const updatedRecipe = {...updatedRecipeInfo};
    let imageCover;
    if (file) imageCover = file;
    dispatch(updateRecipe({updatedRecipe, imageCover, id: recipe._id}));
  }

  return (
    <div>
      <ToastContainer />
      <div className="update-recipe-info">
        <div className="recipe-info-title recipe-image-cover">
          <div className="title-updateBtn">
            <div>
              <h3>Recipe Image Cover</h3>
              <input 
                className="recipe-image-input-update"
                name="recipeImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelection(e)}
              />
            </div>
            <div className="update-btn-wrapper">
              <button onClick={() => handleUpdateSubmit()}>Update Recipe</button>
            </div>
          </div>
          <div className="recipe-image-wrapper">
            <img crossOrigin="anonymous" src={imagePreview ? imagePreview : apiUrl}/>
          </div>
        </div>
        <div className="recipe-info-title recipe-name-field">
          <h3>Recipe Name</h3>
          <div className="recipe-name-wrapper">
            <p>{recipe.recipeName}</p>
            <div className="edit-or-delete">
              <EditIcon className="edit-item-icon" onClick={() => openItemEditor('recipeName', recipe.recipeName, null)}/>
            </div>
          </div>
        </div>       
        <div className="recipe-info-title ingredients">
          <div className="title-and-add-more">
            <h3>Ingredients</h3>
            <AddIcon className="add-more-items-btn" onClick={() => setAddMoreItem({ open: true, field: "ingredient" })}/>
          </div>
          <ul className="items-list">
            {Object.keys(recipe).length && recipe.ingredients.map((item, idx) => (
              <div className="recipe-item" key={uuidv4()}>
                <li>{item}</li>
                <div className="edit-or-delete">
                  <EditIcon className="edit-item-icon" onClick={() => openItemEditor('ingredients', item, idx)}/>
                  <DeleteIcon className="delete-item-icon" onClick={() => handleDeleteItem(idx, 'ingredient')}/>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <div className="recipe-info-title methods">
          <div className="title-and-add-more">
            <h3>Methods</h3>
            <AddIcon className="add-more-items-btn" onClick={() => setAddMoreItem({ open: true, field: "method" })}/>
          </div>
          <ol className="items-list">
            {Object.keys(recipe).length && recipe.method.map((item, idx) => (
              <div className="recipe-item" key={uuidv4()}>
                <li>{item}</li>
                <div className="edit-or-delete">
                  <EditIcon className="edit-item-icon" onClick={() => openItemEditor('methods', item, idx)}/>
                  <DeleteIcon className="delete-item-icon" onClick={() => handleDeleteItem(idx, 'method')}/>
                </div>
              </div>
            ))}
          </ol>
        </div>
        <div className="recipe-info-title servings up-down-number-wrapper">
          <div className="title-and-number-wrapper">
            <h3>Servings</h3>
            <p>{recipe.servings} servings</p>
          </div>
          <div className="up-and-down-icons-wrapper">
            <ArrowDropUpIcon 
            className="up-and-down-icon" 
            onClick={() => handleValueIncrease("servings")}
            />
            <ArrowDropDownIcon className="up-and-down-icon" onClick={() => handleValueDecrease("servings")}/>
          </div>
        </div>
        <div className="recipe-info-title preparation-time up-down-number-wrapper">
          <div className="title-and-number-wrapper">
            <h3>Preparation Time</h3>
            <p>{recipe.preparationTime} minutes</p>
          </div>
          <div className="up-and-down-icons-wrapper">
            <ArrowDropUpIcon className="up-and-down-icon" onClick={() => handleValueIncrease("preparationTime")}/>
            <ArrowDropDownIcon className="up-and-down-icon" onClick={() => handleValueDecrease("preparationTime")}/>
          </div>
        </div>
      </div>
      {editMode &&
      <div className="edit-mode">
        <div className="item">
          <div className="item-input">
            <input 
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
          <CloseIcon className="close-edit-icon" onClick={() => setEditMode(false)}/>
        </div>
      </div>
      }
      {addMoreItem.open &&
      <div className="add-more-item">
        <div className="add-more-field-and-input">
          <h4 className="field-name">Add one more {addMoreItem.field}</h4>
          <input 
          type="text"
          value={addMoreItemInputValue}
          onChange={(e) => setAddMoreItemInputValue(e.target.value)}
          />
        </div>
        <div className="add-or-cancel">
          <DoneIcon className="done-icon" onClick={() => handleAddMoreItem(addMoreItemInputValue)}/>
          <CloseIcon className="close-icon" onClick={() => {
            setAddMoreItem({ open: false, field: "" });
            setAddMoreItemInputValue("");
          }}/>
        </div>
      </div>
      }
    </div>
  )
};

export default UpdateRecipePage;