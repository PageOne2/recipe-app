import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMostLikedRecipes } from "../../redux/redux-saga/sagaActions";
import RecipeCard from "../recipe-card/recipe.card.component";
import { v4 as uuidv4 } from "uuid";

import "./most-liked-recipes.styles.css";
import MoreButton from "../more-button/more-button.component";

const MostLikedRecipes = () => {
  const mostLikedRecipes = useSelector(state => state.recipe.mostLikedRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mostLikedRecipes.length) dispatch(getMostLikedRecipes(1));
  }, [mostLikedRecipes])

  return (
    <div className="categorie-container">
      <div className="recipe-cards">
        {mostLikedRecipes && mostLikedRecipes.map((item) => (
          <RecipeCard key={uuidv4()} item={item} />
        ))}
      </div>
      <MoreButton />
    </div>
  )
}

export default MostLikedRecipes;