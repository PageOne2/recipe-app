import { useDispatch, useSelector } from "react-redux";
import { changeCategorie } from "../../redux/recipeReducer/recipeReducer";
import { ButtonsWrapper, Button } from "../styled-components/categorie-button/styled-components";

const CategorieButton = () => {
  const categorie = useSelector(state => state.recipe.categorie);
  const dispatch = useDispatch();
  
  return (
    <ButtonsWrapper>
      {categorie === "mostRecent" 
        ? <Button opacity="1" onClick={() => dispatch(changeCategorie("mostRecent"))}>Most Recent</Button>
        : <Button opacity="0.6" onClick={() => dispatch(changeCategorie("mostRecent"))}>Most Recent</Button>
      }
      {categorie === "mostLiked"
        ? <Button opacity="1" onClick={() => dispatch(changeCategorie("mostLiked"))}>Most Liked</Button>
        : <Button opacity="0.6" onClick={() => dispatch(changeCategorie("mostLiked"))}>Most Liked</Button>
      }
  </ButtonsWrapper>
  );
};

export default CategorieButton;