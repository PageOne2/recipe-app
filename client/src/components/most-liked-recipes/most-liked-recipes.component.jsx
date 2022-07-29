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

  const loadRecipes = () => {
    if (mostLikedRecipes.length) {
      const existingCardsIds = [];
      return mostLikedRecipes.map((item) => {
        if (existingCardsIds.includes(item._id)) return; 
        existingCardsIds.push(item._id);
        return <RecipeCard key={uuidv4()} item={item}/>
      });
    }
  }

  return (
    <div className="categorie-container">
      <div className="recipe-cards">{loadRecipes()}</div>
      <MoreButton />
    </div>
  )
}

export default MostLikedRecipes;