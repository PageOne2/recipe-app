import React from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/redux-saga/sagaActions";

import "./more-button.styles.css";

const MoreButton = () => {
  const mostRecentPage = useSelector((state) => state.recipe.m_r_page);
  const mostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const btnClass = useSelector((state) => state.recipe.btn_class);
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
            ? dispatch(getMostRecentRecipes(mostRecentPage))
            : dispatch(getMostLikedRecipes(mostLikedPage));
        }}
      >
        More
      </button>
    </div>
  );
};

export default MoreButton;
