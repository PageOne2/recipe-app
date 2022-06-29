import CategorieButton from "../../components/categorie-button/categorie-button.component"
import RecipesContainer from "../../components/recipes-container/recipes.container.component";
import MoreButton from "../../components/more-button/more-button.component";

import "./homepage.styles.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <CategorieButton />
      <RecipesContainer />
    </div>
  );
};

export default HomePage;
