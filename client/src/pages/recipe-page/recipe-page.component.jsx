import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../redux/redux-saga/sagaActions';
import RecipeInitialInfo from "../../components/recipe-initial-info/recipe-initial-info.component";
import Spinner from "../../components/spinner/spinner.component";
import recipeImage from "../../assets/default.jpg"
import { v4 as uuidv4 } from "uuid";
import { getRecipeByIdSuccess } from "../../redux/recipeReducer/recipeReducer";

import "./recipe-page.styles.css";

const RecipePage = () => {
  const params = useParams();
  const recipe = useSelector(state => state.recipe.recipeById);
  const isUserLogged = useSelector(state => state.user.userData);
  const myRecipe = () => {
    if (Object.keys(recipe).length) {
      return Object.keys(isUserLogged).length && isUserLogged._id === recipe.user._id ? true : false;
    } else {
      return false
    }
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipeById(params.recipeId));
    return () => {
      dispatch(getRecipeByIdSuccess({}));
    }
  }, []);

  return (
    <div className="recipe-page-container">
      {Object.keys(recipe).length ? 
        <div className="recipe-page-content">
          <div className="wrapper">
            <div className="recipe-page-name">
              <h1>{recipe.recipeName}</h1>
            </div>
            <div className="recipe-info">
              <div className="recipe-page-info">
                <div className="recipe-page-image">
                  <img crossOrigin="anonymous" src={`http://localhost:3000/api/recipes/recipeImageCover/${recipe.imageCover}`} alt="dish"/>
                </div>
                <div className="recipe-page-method">
                  <h4 className="method-title">Method</h4>
                  <ol className="method">
                    {recipe.method?.map(item => (
                      <li key={uuidv4()} >{item}</li>   
                    ))}
                  </ol>
                </div>
                <RecipeInitialInfo id={params.recipeId} myRecipe={myRecipe()} likes={recipe.likes} preparationTime={recipe.preparationTime} />
              </div>
              <div className="recipe-page-ingredient">
                <h4 className="ingredients-title">Ingredients</h4>
                <ul className="ingredients">
                  {recipe.ingredients?.map(ingredient => (
                    <li key={uuidv4()}>{ ingredient }</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        : <Spinner />
      }
    </div>
  );
};

export default RecipePage;
