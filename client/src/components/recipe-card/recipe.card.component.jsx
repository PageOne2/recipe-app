import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecipeInitialInfo from "../recipe-initial-info/recipe-initial-info.component";
import recipeImage from "../../assets/default.jpg";
import { formatRecipeName } from "../../utils/formatStr";

import "./recipe.card.styles.css";

const RecipeCard = ({
  item: { recipeName, likes, preparationTime, imageCover, user, _id }
}) => {
  const isUserLogged = useSelector(state => state.user.userData);
  const myRecipe = Object.keys(isUserLogged).length && isUserLogged._id === user._id ? true : false;
  const apiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${imageCover}`;

  return (
    <div className="recipe-card">
      <div className="user">
        <img
          className="user-image"
          src={`http://localhost:3000/img/user/${user.photo}`}
          alt="user"
        />
        <h4 className={myRecipe ? "user-name-me" : "user-name"}>{user.name}</h4>
      </div>
      <div className="recipe-image">
        <div className="overlay">
          <Link to={`/recipe/${_id}`}>
            <button className="go-to-btn">Go To Recipe</button>
          </Link>
        </div>
        <img crossOrigin="anonymous" src={apiUrl} alt="dish" />
      </div>
      <div className="recipe-name">
        <h3>{formatRecipeName(recipeName)}</h3>
      </div>
      <RecipeInitialInfo id={_id} myRecipe={myRecipe} likes={likes} preparationTime={preparationTime} />
    </div>
  );
};

export default RecipeCard;
