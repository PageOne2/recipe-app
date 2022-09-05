import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMostRecentRecipes } from "../../redux/redux-saga/sagaActions";
import RecipeCard from "../recipe-card/recipe.card.component";
import { v4 as uuidv4 } from "uuid";
import MoreButton from "../more-button/more-button.component";
import { RecipeCards } from "../styled-components/most-recent-most-liked/styled-components"; 

const MostRecentRecipes = () => {
  const mostRecentRecipes = useSelector(state => state.recipe.mostRecentRecipes);
  const dispatch = useDispatch();  

  useEffect(() => {
    if (!mostRecentRecipes.length) dispatch(getMostRecentRecipes(1));
  }, [mostRecentRecipes])

  return (
    <>
      <RecipeCards>
        {mostRecentRecipes && mostRecentRecipes.map((item) => (
          <RecipeCard key={uuidv4()} item={item} />
        ))}
      </RecipeCards>
      <MoreButton />
    </>
  )
}

export default MostRecentRecipes;