import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMostRecentRecipes } from '../../redux/redux-saga/sagaActions';

import RecipeCard from "../../components/recipe-card/recipe.card.component";

import { v4 as uuidv4 } from "uuid";

import "./recipes.container.styles.css";

const RecipesContainer = () => {
  const redirected = useSelector((state) => state.user.redirected);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const mostRecentPage = useSelector((state) => state.recipe.m_r_page);
  const mostRecentRecipes = useSelector((state) => state.recipe.most_recent_recipes);
  const mostLikedRecipes = useSelector((state) => state.recipe.most_liked_recipes);
  const categorie = useSelector((state) => state.recipe.categorie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!redirected) dispatch(getMostRecentRecipes(mostRecentPage));
  }, [isLoggedIn])

  const loadRecipes = (categorie) => {
    if (categorie === "mostRecent" && mostRecentRecipes.length) {
      return mostRecentRecipes.map((item) => (
        <RecipeCard key={uuidv4()} item={item} />
      ));
    } else if (categorie === "mostLiked" && mostLikedRecipes.length) {
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

  return <div className="recipe-cards-container">{loadRecipes(categorie)}</div>;
};

export default RecipesContainer;
