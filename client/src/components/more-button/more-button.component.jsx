import { useDispatch, useSelector } from "react-redux";
import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/redux-saga/sagaActions";

import "./more-button.styles.css";

const MoreButton = () => {
  const mostRecentPage = useSelector((state) => state.recipe.m_r_page);
  const mostLikedPage = useSelector((state) => state.recipe.m_l_page);
  const categorie = useSelector((state) => state.recipe.categorie);
  const noResultsMR = useSelector((state) => state.recipe.noResultsMR);
  const noResultsML = useSelector((state) => state.recipe.noResultsML);
  const dispatch = useDispatch();

  return (
    <div className="more">
      <button
        disabled={
          (noResultsMR && categorie === "mostRecent") ||
          (noResultsML && categorie === "mostLiked")
        }
        className={
          (noResultsMR && categorie === "mostRecent") ||
          (noResultsML && categorie === "mostLiked")
            ? "disabled"
            : "more_btn"
        }
        onClick={() => {
          categorie === "mostRecent"
            ? dispatch(getMostRecentRecipes(mostRecentPage + 1))
            : dispatch(getMostLikedRecipes(mostLikedPage + 1));
        }}
      >
        More
      </button>
    </div>
  );
};

export default MoreButton;
