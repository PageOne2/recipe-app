import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { changeClassName } from "../../redux/recipeReducer/recipeReducer";

import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/recipeReducer/sagaActions";

import RecipesContainer from "../../components/recipes-container/recipes.container.component";
import MoreButton from "../../components/more-button/more-button.component";

import "./homepage.styles.css";

const HomePage = () => {
  const btnClass = useSelector((state) => state.recipe.class);
  const recentPage = useSelector((state) => state.recipe.m_r_page);
  const mostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const dispatch = useDispatch();

  useEffect(() => {
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
              recentPage !== 1
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
              mostLikedPage !== 1
                ? dispatch(changeClassName("mostLiked"))
                : dispatch(getMostLikedRecipes(1));
            }}
          >
            Most Liked
          </button>
        </div>
      </div>
      <RecipesContainer />
      <MoreButton />
    </div>
  );
};

export default HomePage;
