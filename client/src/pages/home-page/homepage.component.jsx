import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getMostRecentRecipes,
  getMostLikedRecipes,
  changeClassName,
} from "../../redux/recipe/recipe.action";

import RecipeCard from "../../components/recipe-card/recipe.card.component";
import MoreButton from "../../components/more-button/more-button.component";

import "./homepage.styles.css";

const HomePage = () => {
  const mostRecentRecipes = useSelector(
    (state) => state.recipe.most_recent_recipes
  );
  const mostLikedRecipes = useSelector(
    (state) => state.recipe.most_liked_recipes
  );
  const btnClass = useSelector((state) => state.recipe.class);
  const getRecentPage = useSelector((state) => state.recipe.m_r_page);
  const getMostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const dispatch = useDispatch();

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

  useEffect(() => {
    console.log("fui buscar as receitas");
    dispatch(getMostRecentRecipes(1));
  }, [dispatch]);

  return (
    <div className="homepage">
      <div className="sort">
        <div className="most-recent">
          <button
            className={
              btnClass === "mostRecent" ? `opt-btn ${btnClass}` : "opt-btn"
            }
            onClick={() => {
              getRecentPage !== 1
                ? dispatch(changeClassName("mostRecent"))
                : dispatch(getMostRecentRecipes(1));
            }}
          >
            Most Recent
          </button>
        </div>
        <div className="most-liked">
          <button
            className={
              btnClass === "mostLiked" ? `opt-btn ${btnClass}` : "opt-btn"
            }
            onClick={() => {
              getMostLikedPage !== 1
                ? dispatch(changeClassName("mostLiked"))
                : dispatch(getMostLikedRecipes(1));
            }}
          >
            Most Liked
          </button>
        </div>
      </div>
      <div className="cards">{loadRecipes(btnClass)}</div>
      <MoreButton />
    </div>
  );
};

export default HomePage;
