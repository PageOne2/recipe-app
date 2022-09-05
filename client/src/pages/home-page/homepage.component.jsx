import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CategorieButton from "../../components/categorie-button/categorie-button.component"
import RecipesContainer from "../../components/recipes-container/recipes.container.component";
import { 
  HomePageButtonsWrapper, 
  ShareRecipeButtonWrapper 
} from "../../components/styled-components/home-page/styled-components";

import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate('/sharerecipe');
    }
  }

  return (
    <>
      <ToastContainer />
      <HomePageButtonsWrapper>
        <CategorieButton />
        <ShareRecipeButtonWrapper>
          <button onClick={() => handleClick()}>+ Share Recipe</button>
        </ShareRecipeButtonWrapper>
      </HomePageButtonsWrapper>
      <RecipesContainer />
    </>
  );
};

export default HomePage;
