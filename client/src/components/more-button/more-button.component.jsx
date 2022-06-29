import { useEffect, useState } from "react";
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
  const [btnState, setBtnState] = useState({ disabled: false, class: "more_btn" });

  useEffect(() => {
    if (categorie === "mostRecent" && noResultsMostRecent) {
      setBtnState({ disabled: true, class: "disabled" }); 
    } else if (categorie === "mostLiked" && noResultsMostLiked) {
      setBtnState({ disabled: true, class: "disabled" }); 
    }
  }, [noResultsMostRecent, noResultsMostLiked])

  const handleClick = () => {
    if (categorie === "mostRecent") {
      if (noResultsMostRecent) return;
      dispatch(getMostRecentRecipes(mostRecentPage + 1));
    } else if (categorie === "mostLiked") {
      if (noResultsMostLiked) return;
      dispatch(getMostLikedRecipes(mostLikedPage + 1));
    }
  }

  return (
    <div className="more">
      <button
        disabled={btnState.disabled}
        className={btnState.class}
        onClick={() => handleClick()}
      >
        More
      </button>
    </div>
  );
};

export default MoreButton;
