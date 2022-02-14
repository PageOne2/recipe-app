import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/recipeReducer/sagaActions";

import "./more-button.styles.css";

const MoreButton = () => {
  const getRecentPage = useSelector((state) => state.recipe.m_r_page);
  const getMostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const btnClass = useSelector((state) => state.recipe.class);
  const noResultsMR = useSelector((state) => state.recipe.noResultsMR);
  const noResultsML = useSelector((state) => state.recipe.noResultsML);
  const dispatch = useDispatch();

  return (
    <div className="more">
      <button
        disabled={
          (noResultsMR && btnClass === "mostRecent") ||
          (noResultsML && btnClass === "mostLiked")
        }
        className={
          (noResultsMR && btnClass === "mostRecent") ||
          (noResultsML && btnClass === "mostLiked")
            ? "disabled"
            : "more_btn"
        }
        onClick={() => {
          btnClass === "mostRecent"
            ? dispatch(getMostRecentRecipes(getRecentPage))
            : dispatch(getMostLikedRecipes(getMostLikedPage));
        }}
      >
        More
      </button>
    </div>
  );
};

export default MoreButton;
