import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { changeClassName } from "../../redux/recipeReducer/recipeReducer";

import {
  getMostRecentRecipes,
  getMostLikedRecipes
} from "../../redux/redux-saga/sagaActions";

import "./categorie-button.styles.css";

const CategorieButton = () => {
  const categorie = useSelector((state) => state.recipe.categorie);
  const mostRecentPage = useSelector((state) => state.recipe.m_r_page);
  const mostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const dispatch = useDispatch();
  
  return (
    <div className="sort">
      <div className="most-recent">
        <button
          className={
            categorie === "mostRecent" ? `opt-btn ${categorie}` : "opt-btn"
          }
          onClick={() => {
            mostRecentPage !== 1
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
            categorie === "mostLiked" ? `opt-btn ${categorie}` : "opt-btn"
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
  );
};

export default CategorieButton;