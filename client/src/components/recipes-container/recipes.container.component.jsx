import React from "react";

import { useSelector } from "react-redux";

import RecipeCard from "../../components/recipe-card/recipe.card.component";

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
        <RecipeCard key={item._id} item={item} />
      ));
    } else if (btnClass === "mostLiked" && mostLikedRecipes.length) {
      return mostLikedRecipes.map((item) => (
        <RecipeCard key={item._id} item={item} />
      ));
    } else {
      return null;
    }
  };

  return <div className="cards">{loadRecipes(btnClass)}</div>;
};

export default RecipesContainer;
