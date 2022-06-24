import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMostLikedRecipes, getMostRecentRecipes } from '../../redux/redux-saga/sagaActions';
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "../../components/recipe-card/recipe.card.component";

import "./recipes.container.styles.css";

const RecipesContainer = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const mostRecentRecipes = useSelector((state) => state.recipe.mostRecentRecipes);
  const mostLikedRecipes = useSelector((state) => state.recipe.mostLikedRecipes);
  const categorie = useSelector((state) => state.recipe.categorie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categorie === "mostRecent") {
      if (!mostRecentRecipes.length) dispatch(getMostRecentRecipes(1));
    } else if (categorie === "mostLiked") {
      if (!mostLikedRecipes.length) dispatch(getMostLikedRecipes(1));
    }
  }, [isLoggedIn, categorie])

  const loadRecipes = (categorie) => {
    if (categorie === "mostRecent" && mostRecentRecipes.length) {
      return mostRecentRecipes.map((item) => (
        <RecipeCard key={uuidv4()} item={item}/>
      ));
    } else if (categorie === "mostLiked" && mostLikedRecipes.length) {
      const existingCardsIds = []; 
      return mostLikedRecipes.map((item) => {
        if (existingCardsIds.includes(item._id)) return; 
        existingCardsIds.push(item._id);
        return <RecipeCard key={uuidv4()} item={item}/>
      });
    } else {
      return null;
    }
  };

  return <div className="recipe-cards-container">{loadRecipes(categorie)}</div>;
};

export default RecipesContainer;
