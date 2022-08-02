import { useDispatch, useSelector } from "react-redux";
import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/redux-saga/sagaActions";
import { setRequesting } from "../../redux/recipeReducer/recipeReducer";

import "./more-button.styles.css";

const MoreButton = () => {
  const mostRecentPage = useSelector(state => state.recipe.mostRecentPage);
  const mostLikedPage = useSelector(state => state.recipe.mostLikedPage);
  const categorie = useSelector(state => state.recipe.categorie);
  const requesting = useSelector(state => state.recipe.requesting);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setRequesting(true));
    if (categorie === "mostRecent") {
      dispatch(getMostRecentRecipes(mostRecentPage + 1));
    } else if (categorie === "mostLiked") {
      dispatch(getMostLikedRecipes(mostLikedPage + 1));
    }
  }

  return (
    <div className="more">
      {requesting 
      ? <div className="more-btn-spinner"></div>
      : <button className="more-btn" onClick={() => handleClick()}>More</button>
      }
    </div>
  );
};

export default MoreButton;
