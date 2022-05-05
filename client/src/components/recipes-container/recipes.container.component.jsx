import React from "react";

import { useSelector } from "react-redux";

import RecipeCard from "../../components/recipe-card/recipe.card.component";

import { v4 as uuidv4 } from "uuid";

import "./recipes.container.styles.css";

const RecipesContainer = () => {
  const mostRecentRecipes = useSelector(
    (state) => state.recipe.most_recent_recipes
  );
  const mostLikedRecipes = useSelector(
    (state) => state.recipe.most_liked_recipes
  );
  const btnClass = useSelector((state) => state.recipe.class);

  const loadRecipes = (btnClass) => {
    if (btnClass === "mostRecent" && mostRecentRecipes.length) {
      return mostRecentRecipes.map((item) => (
        <RecipeCard key={uuidv4()} item={item} />
      ));
    } else if (btnClass === "mostLiked" && mostLikedRecipes.length) {
      const existingCardsIds = []; 
      return mostLikedRecipes.map((item) => {
        if (existingCardsIds.includes(item._id)) return; 
        existingCardsIds.push(item._id);
        return <RecipeCard key={uuidv4()} item={item} />
      });
    } else {
      return null;
    }
  };

  return <div className="recipe-cards-container">{loadRecipes(btnClass)}</div>;
};

export default RecipesContainer;
