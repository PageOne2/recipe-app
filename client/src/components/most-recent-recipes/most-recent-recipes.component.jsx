import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMostRecentRecipes } from "../../redux/redux-saga/sagaActions";
import RecipeCard from "../recipe-card/recipe.card.component";
import MoreButton from "../more-button/more-button.component";
import { v4 as uuidv4 } from "uuid";

import "./most-recent-recipes.styles.css";

const MostRecentRecipes = () => {
  const mostRecentRecipes = useSelector(state => state.recipe.mostRecentRecipes);
  const dispatch = useDispatch();  

  useEffect(() => {
    if (!mostRecentRecipes.length) dispatch(getMostRecentRecipes(1));
  }, [mostRecentRecipes])

  return (
    <div className="categorie-container">
      <div className="recipe-cards">
        {mostRecentRecipes && mostRecentRecipes.map((item) => (
          <RecipeCard key={uuidv4()} item={item} />
        ))}
      </div>
      <MoreButton />
    </div>
  )
}

export default MostRecentRecipes;