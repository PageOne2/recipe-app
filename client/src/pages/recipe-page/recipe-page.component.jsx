import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../redux/redux-saga/sagaActions';
import RecipeInitialInfo from "../../components/recipe-initial-info/recipe-initial-info.component";
import Spinner from "../../components/spinner/spinner.component";
import { v4 as uuidv4 } from "uuid";
import { getRecipeByIdSuccess } from "../../redux/recipeReducer/recipeReducer";
import { 
  RecipePageWrapper,
  RecipePageContent,
  RecipePageName,
  RecipeInfo,
  RecipePageInfo,
  RecipePageImage,
  RecipeListWrapper,
  FieldTitle,
  OlMethodList,
  UlIngredientList
} from "../../components/styled-components/recipe-page/styled-components";

const RecipePage = () => {
  const params = useParams();
  const recipe = useSelector(state => state.recipe.recipeById);
  const isUserLogged = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const recipeImageCoverApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${recipe.imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${recipe.imageCover}`;
  const myRecipe = () => {
    if (Object.keys(recipe).length) {
      return Object.keys(isUserLogged).length && isUserLogged._id === recipe.user._id ? true : false;
    } else {
      return false
    }
  };

  useEffect(() => {
    dispatch(getRecipeById(params.recipeId));
    return () => {
      dispatch(getRecipeByIdSuccess({}));
    }
  }, []);

  return (
    <RecipePageWrapper>
      {Object.keys(recipe).length ? 
        <RecipePageContent>
          <RecipePageName>
            <h1>{recipe.recipeName}</h1>
          </RecipePageName>
          <RecipeInfo>
            <RecipePageInfo>
              <RecipePageImage>
                <img crossOrigin="anonymous" src={recipeImageCoverApiUrl} alt="dish"/>
              </RecipePageImage>
              <RecipeListWrapper>
                <FieldTitle>Method</FieldTitle>
                <OlMethodList>
                  {recipe.method?.map(item => (
                    <li key={uuidv4()} >{item}</li>   
                  ))}
                </OlMethodList>
              </RecipeListWrapper>
              <RecipeInitialInfo id={params.recipeId} myRecipe={myRecipe()} likes={recipe.likes} preparationTime={recipe.preparationTime} />
            </RecipePageInfo>
            <RecipeListWrapper>
              <FieldTitle>Ingredients</FieldTitle>
              <UlIngredientList>
                {recipe.ingredients?.map(ingredient => (
                  <li key={uuidv4()}>{ ingredient }</li>
                ))}
              </UlIngredientList>
            </RecipeListWrapper>
          </RecipeInfo>
        </RecipePageContent>
        : <Spinner />
      }
    </RecipePageWrapper>
  );
};

export default RecipePage;
