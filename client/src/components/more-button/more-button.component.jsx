import { useDispatch, useSelector } from "react-redux";
import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/redux-saga/sagaActions";

import "./more-button.styles.css";

const MoreButton = () => {
  const mostRecentPage = useSelector((state) => state.recipe.mostRecentPage);
  const mostLikedPage = useSelector((state) => state.recipe.mostLikedPage);
  const categorie = useSelector((state) => state.recipe.categorie);
  const noResultsMostRecent = useSelector((state) => state.recipe.noResultsMostRecent);
  const noResultsMostLiked = useSelector((state) => state.recipe.noResultsMostLiked);
  const dispatch = useDispatch();

  return (
    <div className="more">
      <button
        disabled={
          (noResultsMostRecent && categorie === "mostRecent") ||
          (noResultsMostLiked && categorie === "mostLiked")
        }
        className={
          (noResultsMostRecent && categorie === "mostRecent") ||
          (noResultsMostLiked && categorie === "mostLiked")
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
