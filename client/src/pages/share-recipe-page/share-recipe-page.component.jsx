import { useEffect ,useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { createRecipe } from "../../redux/redux-saga/sagaActions";
import { formatRecipeName } from "../../utils/formatStr";
import { ToastContainer, toast } from "react-toastify";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { editIconSx, deleteIconSx, closeIconSx } from "../../iconStyles";
import { 
  ShareRecipeContainer,
  ShareRecipeForm,
  ShareRecipeFormTitle,
  SubmitButtonWrapper,
  SubmitFormButton,
  InputContainer,
  InputWrapper,
  RecipeImageInput,
  ShareInput,
  AddButtonWrapper,
  AddButton,
  ShareRecipeInfoContainer,
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
  CloseEditButton
} from "../../components/styled-components/share-and-update-recipe-page/styled-components";

import "react-toastify/dist/ReactToastify.css";

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
  const [imagePreview, setImagePreview] = useState();
  const [editMode, setEditMode] = useState(false);
  const [itemBeingEdited, setItemBeingEdited] = useState({ field: "", item: "", itemIdx: null });
  const [recipeNameInputValue, setRecipeNameInputValue] = useState("");
  const [ingredientInputValue, setIngredientInputValue] = useState("");
  const [methodInputValue, setMethodInputValue] = useState("");
  const [servingsInputValue, setServingsInputValue] = useState(0); 
  const [preparationTimeInputValue, setPreparationTimeInputValue] = useState(0);
  const [editableItemInputValue, setEditableItemInputValue] = useState("");
  const dispatch = useDispatch();
  const recipeShareFail = () => toast.error("All fields are required!", {
    position: toast.POSITION.TOP_CENTER
  });

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(file);
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
      setFile();
      setRecipeInfo({ ...recipeInfoInitialState });
    } else {
      recipeShareFail();
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
    setImagePreview(URL.createObjectURL(file));
  }

  return (
    <ShareRecipeContainer>
      <ToastContainer />
      <ShareRecipeForm>
        <ShareRecipeFormTitle>
          <h2>Share your recipe</h2>
        </ShareRecipeFormTitle>
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputContainer>
            <InputWrapper>
              <label htmlFor="recipeImage">Your recipe image</label>
              <RecipeImageInput 
                marginBottom="5px"
                padding="10px 5px 15px 5px"
                name="recipeImage"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileSelection(e)}
              />
            </InputWrapper>
          </InputContainer>

          <InputContainer>            
            <InputWrapper>
              <label htmlFor="recipeName">Your recipe name</label>
              <ShareInput 
                name="recipeName" 
                type="text" 
                value={recipeNameInputValue} 
                onChange={e => setRecipeNameInputValue(e.target.value)}
              />
            </InputWrapper>
            <AddButtonWrapper>
              <AddButton 
                bg="#f5ae37" 
                bgHover="#f19d0b" 
                type="button" 
                onClick={(e) => handleClick(e, 'recipeName')}
                >Add Recipe Name
              </AddButton>
            </AddButtonWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper>
              <label htmlFor="ingredients">Add your recipe ingredients</label>
              <ShareInput 
                name="ingredients" 
                type="text" 
                value={ingredientInputValue}
                onChange={e => setIngredientInputValue(e.target.value)}
              />
            </InputWrapper>
            <AddButtonWrapper>
              <AddButton 
                bg="#f55e8b" 
                bgHover="#f74178" 
                type="button" 
                onClick={(e) => handleClick(e, 'ingredient')}
                >Add Ingredient
              </AddButton>
            </AddButtonWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper>
              <label htmlFor="method">Add preparation methods</label>
              <ShareInput 
                name="method" 
                type="text" 
                value={methodInputValue}
                onChange={e => setMethodInputValue(e.target.value)}
              />
            </InputWrapper>
            <AddButtonWrapper>
              <AddButton 
                bg="#678aff" 
                bgHover="#4460dd" 
                type="button" 
                onClick={(e) => handleClick(e, 'method')}
                >Add Method
              </AddButton>
            </AddButtonWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper>
              <label htmlFor="servings">How many servings</label>
              <ShareInput 
                name="servings" 
                type="number" 
                min="0" 
                value={servingsInputValue}
                onChange={e => {
                    if (e.target.value >= 0) setServingsInputValue(e.target.value);
                  }
                }
              />
            </InputWrapper>
          </InputContainer>

          <InputContainer>
            <InputWrapper>
              <label htmlFor="preparationTime">Preparation time in minutes</label>
              <ShareInput 
                name="preparationTime" 
                type="number" 
                min="0" 
                value={preparationTimeInputValue}
                onChange={e => {
                    if (e.target.value >= 0) setPreparationTimeInputValue(e.target.value)
                  }
                }
              />
            </InputWrapper>
          </InputContainer>

          <SubmitButtonWrapper>
            <SubmitFormButton type="submit">Share Recipe</SubmitFormButton>
          </SubmitButtonWrapper>
        </form>
      </ShareRecipeForm>

      <ShareRecipeInfoContainer>
        <RecipeInfoTitle>
          <RecipeFieldTitle bg="#bc79fb">Recipe Image Cover</RecipeFieldTitle>
          {file && 
          <RecipeImageWrapper>
            <img src={imagePreview}/>
          </RecipeImageWrapper>
          }
        </RecipeInfoTitle>

        <RecipeInfoTitle>
          <RecipeFieldTitle bg="#f5ae37">Recipe Name</RecipeFieldTitle>
          {recipeInfo.recipeName.length ? 
          <RecipeNameWrapper>
            <p>{recipeInfo.recipeName}</p>
            <EditOrDelete>
              <EditIcon sx={editIconSx(2)} onClick={() => openItemEditor('recipeName', recipeInfo.recipeName, null)}/>
              <DeleteIcon sx={deleteIconSx} onClick={() => handleDeleteItem(null, 'recipeName')}/>
            </EditOrDelete>
          </RecipeNameWrapper>
          : null}
        </RecipeInfoTitle>

        <RecipeInfoTitle>
          <RecipeFieldTitle bg="#f55e8b">Ingredients</RecipeFieldTitle>
          <UlItemList>
            { recipeInfo.ingredients.map((item, idx) => (
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
          <RecipeFieldTitle bg="#6784ff">Methods</RecipeFieldTitle>
          <OlItemList>
            { recipeInfo.methods.map((item, idx) => ( 
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

        <PrepAndServingsInfoTitle>
          <RecipeFieldTitle 
            bg="#0ca981"
            >Servings
          </RecipeFieldTitle>
          <p>{servingsInputValue} servings</p>
        </PrepAndServingsInfoTitle>

        <PrepAndServingsInfoTitle>
          <RecipeFieldTitle 
            bg="#7ad55a"
          >Preparation Time
          </RecipeFieldTitle>
          <p>{preparationTimeInputValue} minutes</p>
        </PrepAndServingsInfoTitle>
      </ShareRecipeInfoContainer>

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
      </EditMode>}
    </ShareRecipeContainer>
  )
}

export default ShareRecipePage;