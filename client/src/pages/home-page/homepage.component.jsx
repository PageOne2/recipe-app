import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategorieButton from "../../components/categorie-button/categorie-button.component"
import RecipesContainer from "../../components/recipes-container/recipes.container.component";

import "./homepage.styles.css";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/sharerecipe');
    }
  }

  return (
    <div className="homepage">
      <div className="homepage-btns">
        <CategorieButton />
        <div className="share-recipe-btn">
          <button className="share-btn" onClick={() => handleClick()}>+ Share Recipe</button>
        </div>
      </div>
      <RecipesContainer />
    </div>
  );
};

export default HomePage;
