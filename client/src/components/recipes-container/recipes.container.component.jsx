import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getMostRecentRecipes } from '../../redux/redux-saga/sagaActions';

import RecipeCard from "../../components/recipe-card/recipe.card.component";

import { v4 as uuidv4 } from "uuid";

import "./recipes.container.styles.css";

const RecipesContainer = () => {
  const isRedirected = useSelector((state) => state.user.isRedirected);
  const mostRecentPage = useSelector((state) => state.recipe.m_r_page);
  const mostRecentRecipes = useSelector((state) => state.recipe.most_recent_recipes);
  const mostLikedRecipes = useSelector((state) => state.recipe.most_liked_recipes);
  const btnClass = useSelector((state) => state.recipe.btn_class);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isRedirected) dispatch(getMostRecentRecipes(mostRecentPage));
  }, [])

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
