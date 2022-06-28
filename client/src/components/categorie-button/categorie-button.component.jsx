import { useDispatch, useSelector } from "react-redux";
import { changeCategorie } from "../../redux/recipeReducer/recipeReducer";

import "./categorie-button.styles.css";

const CategorieButton = () => {
  const categorie = useSelector((state) => state.recipe.categorie);
  const dispatch = useDispatch();
  
  return (
    <div className="sort">
      <div className="most-recent">
        <button
          className={
            categorie === "mostRecent" ? `${categorie}` : `${categorie} inactive`
          }
          onClick={() => dispatch(changeCategorie("mostRecent"))}
        >
          Most Recent
        </button>
      </div>
      <div className="most-liked">
        <button
          className={
            categorie === "mostLiked" ? `${categorie}` : `${categorie} inactive`
          }
          onClick={() => dispatch(changeCategorie("mostLiked"))}
        >
          Most Liked
        </button>
      </div>
    </div>
  );
};

export default CategorieButton;