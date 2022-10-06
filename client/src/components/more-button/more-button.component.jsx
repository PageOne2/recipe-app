import { useDispatch, useSelector } from "react-redux";
import {
  getMostRecentRecipes,
  getMostLikedRecipes,
} from "../../redux/redux-saga/sagaActions";
import { setRequesting } from "../../redux/recipeReducer/recipeReducer";
import { 
  MoreButtonWrapper,
  LoadMoreButton,
  MoreButtonSpinner
} from "../styled-components/more-button/styled-components";

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
    <MoreButtonWrapper>
      {requesting 
      ? <MoreButtonSpinner />
      : <LoadMoreButton onClick={() => handleClick()}>More</LoadMoreButton>
      }
    </MoreButtonWrapper>
  );
};

export default MoreButton;
