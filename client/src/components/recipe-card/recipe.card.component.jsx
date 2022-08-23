import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RecipeInitialInfo from "../recipe-initial-info/recipe-initial-info.component";
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVertSharp"
import { formatRecipeName } from "../../utils/formatStr";
import { deleteRecipe } from "../../redux/redux-saga/sagaActions";

import "./recipe.card.styles.css";

const RecipeCard = ({
  item: { recipeName, likes, preparationTime, imageCover, user, _id }
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const loggedInUser = useSelector(state => state.user.userData);
  const [more, setMore] = useState(false);
  const myRecipe = isLoggedIn && loggedInUser._id === user._id ? true : false;
  const recipeImageCoverApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${imageCover}`;
  const userProfilePicApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/user/userProfilePic/${user.photo}`
  : `http://localhost:3000/api/users/userProfilePic/${user.photo}`

  return (
    <div className="recipe-card">
      <div className="user">
        <img
          className="user-image"
          crossOrigin="anonymous"
          src={userProfilePicApiUrl}
          alt="user"
        />
        <div className="user-name-wrapper">
          <h4 className={myRecipe ? "user-name-me" : "user-name"}>{myRecipe ? "You" : user.name}</h4>
          {isLoggedIn && myRecipe 
            ? <MoreVertIcon className="more-vert-icon" onClick={() => setMore(!more)}/>
            : null
          }
        </div>
        {more &&
          <div className="more-user-actions">
            <div className="more-actions-delete" onClick={() => dispatch(deleteRecipe(_id))}>Delete Recipe <Delete className="more-actions-delete-icon"/></div>
            <Link to={`recipe/updateRecipe/${_id}`}>
              <div className="more-actions-edit">Update Recipe <Edit className="more-actions-edit-icon"/></div>
            </Link>
          </div>
        }
      </div>
      <div className="recipe-image">
        <div className="overlay">
          <Link to={`/recipe/${_id}`}>
            <button className="go-to-btn">Go To Recipe</button>
          </Link>
        </div>
        <img crossOrigin="anonymous" src={recipeImageCoverApiUrl} alt="dish" />
      </div>
      <div className="recipe-name">
        <h3>{formatRecipeName(recipeName)}</h3>
      </div>
      <RecipeInitialInfo id={_id} myRecipe={myRecipe} likes={likes} preparationTime={preparationTime} />
    </div>
  );
};

export default RecipeCard;
