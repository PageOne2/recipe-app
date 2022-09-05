import { useSelector } from "react-redux";
import MostRecentRecipes from "../most-recent-recipes/most-recent-recipes.component";
import MostLikedRecipes from "../most-liked-recipes/most-liked-recipes.component";
import { RecipeCardsContainer } from "../styled-components/recipes-container/styled-components";

const RecipesContainer = () => {
  const categorie = useSelector(state => state.recipe.categorie);

  const loadCategorie = () => {
    if (categorie === "mostRecent") {
      return <MostRecentRecipes /> 
    } else if (categorie === "mostLiked") {
      return <MostLikedRecipes />
    }
  }

  return <RecipeCardsContainer>{loadCategorie()}</RecipeCardsContainer>;
};

export default RecipesContainer;
