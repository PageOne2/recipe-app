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
import { editIconSx, deleteIconSx, doneIconSx, closeIconSx, addIconSx, arrowDropIconSx } from "../../iconStyles";
import { formatRecipeName } from "../../utils/formatStr";
import { ToastContainer } from "react-toastify";
import { 
  UpdateRecipeContainer,
  InputWrapper,
  RecipeImageInput,
  RecipeInfoTitle, 
  RecipeFieldTitle, 
  UlItemList,
  OlItemList,
  RecipeImageWrapper,
  RecipeNameWrapper,
  PrepAndServingsInfoTitle,
  RecipeItem,
  EditOrDelete,
  EditMode,
  EditModeItem,
  ItemInput,
  EditButton,
  CloseEditButton,
  ChooseAndUpdateWrapper,
  UpdateButtonWrapper,
  TitleAndAddMore,
  UpAndDownNumberWrapper,
  UpAndDownIconsWrapper,
  AddMoreItem,
  TitleAndInputAddMoreWrapper,
  AddOrCancelWrapper
} from "../../components/styled-components/share-and-update-recipe-page/styled-components";

import "react-toastify/dist/ReactToastify.css";

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
      <UpdateRecipeContainer>
        <RecipeInfoTitle>
          <ChooseAndUpdateWrapper>
            <InputWrapper>
              <RecipeFieldTitle bg="#bc79fb">Recipe Image Cover</RecipeFieldTitle>
              <RecipeImageInput 
                marginBottom="0px"
                padding="10px 5px 0px"
                name="recipeImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelection(e)}
              />
            </InputWrapper>
            <UpdateButtonWrapper>
              <button onClick={() => handleUpdateSubmit()}>Update Recipe</button>
            </UpdateButtonWrapper>
          </ChooseAndUpdateWrapper>
          <RecipeImageWrapper>
            <img crossOrigin="anonymous" src={imagePreview ? imagePreview : apiUrl}/>
          </RecipeImageWrapper>
        </RecipeInfoTitle>
        <RecipeInfoTitle>
          <RecipeFieldTitle bg="#f5ae37">Recipe Name</RecipeFieldTitle>
          <RecipeNameWrapper>
            <p>{recipe.recipeName}</p>
            <EditOrDelete>
              <EditIcon sx={editIconSx(2)} onClick={() => openItemEditor('recipeName', recipe.recipeName, null)}/>
            </EditOrDelete>
          </RecipeNameWrapper>
        </RecipeInfoTitle>       
        <RecipeInfoTitle>
          <TitleAndAddMore>
            <RecipeFieldTitle bg="#f55e8b">Ingredients</RecipeFieldTitle>
            <AddIcon sx={addIconSx} onClick={() => setAddMoreItem({ open: true, field: "ingredient" })}/>
          </TitleAndAddMore>
          <UlItemList>
            {Object.keys(recipe).length && recipe.ingredients.map((item, idx) => (
              <RecipeItem key={uuidv4()}>
                <li>{item}</li>
                <EditOrDelete>
                  <EditIcon sx={editIconSx(2)} onClick={() => openItemEditor('ingredients', item, idx)}/>
                  <DeleteIcon sx={deleteIconSx} onClick={() => handleDeleteItem(idx, 'ingredient')}/>
                </EditOrDelete>
              </RecipeItem>
            ))}
          </UlItemList>
        </RecipeInfoTitle>
        <RecipeInfoTitle>
          <TitleAndAddMore>
            <RecipeFieldTitle bg="#6784ff">Methods</RecipeFieldTitle>
            <AddIcon sx={addIconSx} onClick={() => setAddMoreItem({ open: true, field: "method" })}/>
          </TitleAndAddMore>
          <OlItemList>
            {Object.keys(recipe).length && recipe.method.map((item, idx) => (
              <RecipeItem key={uuidv4()}>
                <li>{item}</li>
                <EditOrDelete>
                  <EditIcon sx={editIconSx(2)} onClick={() => openItemEditor('methods', item, idx)}/>
                  <DeleteIcon sx={deleteIconSx} onClick={() => handleDeleteItem(idx, 'method')}/>
                </EditOrDelete>
              </RecipeItem>
            ))}
          </OlItemList>
        </RecipeInfoTitle>
        <UpAndDownNumberWrapper>
          <PrepAndServingsInfoTitle border="none">
            <RecipeFieldTitle bg="#0ca981">Servings</RecipeFieldTitle>
            <p>{recipe.servings} servings</p>
          </PrepAndServingsInfoTitle>
          <UpAndDownIconsWrapper>
            <ArrowDropUpIcon sx={arrowDropIconSx} onClick={() => handleValueIncrease("servings")}/>
            <ArrowDropDownIcon sx={arrowDropIconSx} onClick={() => handleValueDecrease("servings")}/>
          </UpAndDownIconsWrapper>
        </UpAndDownNumberWrapper>
        <UpAndDownNumberWrapper>
          <PrepAndServingsInfoTitle border="none">
            <RecipeFieldTitle bg="#7ad55a">Preparation Time</RecipeFieldTitle>
            <p>{recipe.preparationTime} minutes</p>
          </PrepAndServingsInfoTitle>
          <UpAndDownIconsWrapper>
            <ArrowDropUpIcon sx={arrowDropIconSx} onClick={() => handleValueIncrease("preparationTime")}/>
            <ArrowDropDownIcon sx={arrowDropIconSx} onClick={() => handleValueDecrease("preparationTime")}/>
          </UpAndDownIconsWrapper>
        </UpAndDownNumberWrapper>
      </UpdateRecipeContainer>
      {editMode &&
      <EditMode>
        <EditModeItem>
          <ItemInput>
            <input 
            type="text"
            placeholder={itemBeingEdited.item}
            value={editableItemInputValue}
            onChange={(e) => setEditableItemInputValue(e.target.value)}
            />
          </ItemInput>
          <EditButton>
            <button onClick={() => handleEditedItem(itemBeingEdited.field, itemBeingEdited.itemIdx)}>Edit</button>
          </EditButton>
        </EditModeItem>
        <CloseEditButton>
          <CloseIcon sx={closeIconSx} onClick={() => setEditMode(false)}/>
        </CloseEditButton>
      </EditMode>
      }
      {addMoreItem.open &&
      <AddMoreItem>
        <TitleAndInputAddMoreWrapper>
          <h4>Add one more {addMoreItem.field}</h4>
          <input 
          type="text"
          value={addMoreItemInputValue}
          onChange={(e) => setAddMoreItemInputValue(e.target.value)}
          />
        </TitleAndInputAddMoreWrapper>
        <AddOrCancelWrapper>
          <DoneIcon sx={doneIconSx} onClick={() => handleAddMoreItem(addMoreItemInputValue)}/>
          <CloseIcon sx={closeIconSx} onClick={() => {
            setAddMoreItem({ open: false, field: "" });
            setAddMoreItemInputValue("");
          }}/>
        </AddOrCancelWrapper>
      </AddMoreItem>
      }
    </div>
  )
};

export default UpdateRecipePage;