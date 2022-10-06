import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import RecipeInitialInfo from "../recipe-initial-info/recipe-initial-info.component";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatRecipeName } from "../../utils/formatStr";
import { deleteRecipe } from "../../redux/redux-saga/sagaActions";
import { editIconSx, deleteIconSx, moreVertIconSx } from "../../iconStyles";
import { 
  RecipeCardWrapper,
  UserInfoWrapper,
  UserImageWrapper,
  UserNameWrapper,
  UserName,
  UserNameMe,
  MoreUserActionsWrapper,
  MoreActions,
  RecipeImageWrapper,
  RecipeImageOverlay,
  GoToButton,
  RecipeImage,
  RecipeNameWrapper,
  RecipeName
} from "../styled-components/recipe-card/styled-components";

const RecipeCard = ({
  item: { recipeName, likes, preparationTime, imageCover, user, _id }
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const loggedInUser = useSelector(state => state.user.userData);
  const [more, setMore] = useState(false);
  const myRecipe = isLoggedIn && loggedInUser._id === user._id ? true : false;
  const recipeImageCoverApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${imageCover}`;
  const userProfilePicApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/users/userProfilePic/${user.photo}`
  : `http://localhost:3000/api/users/userProfilePic/${user.photo}`;

  const navigateToUserPage = () => {
    if (isLoggedIn && loggedInUser._id === user._id) {
      navigate(`/myprofile`);
    } else {
      navigate(`/user-page/${user._id}`);
    }
  }

  return (
    <RecipeCardWrapper>
      <UserInfoWrapper>
        <UserImageWrapper onClick={() => navigateToUserPage()}>
          <img
            src={userProfilePicApiUrl}
            alt="user"
          />
        </UserImageWrapper>
        <UserNameWrapper>
          {myRecipe ? <UserNameMe>You</UserNameMe> : <UserName>{user.name}</UserName>}
          {isLoggedIn && myRecipe 
            ? <MoreVertIcon sx={moreVertIconSx} onClick={() => setMore(!more)}/>
            : null
          }
        </UserNameWrapper>
        {more &&
          <MoreUserActionsWrapper>
            <MoreActions onClick={() => dispatch(deleteRecipe(_id))}>
              Delete Recipe <DeleteIcon sx={deleteIconSx}/>
            </MoreActions>
            <Link to={`/recipe/updateRecipe/${_id}`}>
              <MoreActions>
                Update Recipe <EditIcon sx={editIconSx()}/>
              </MoreActions>
            </Link>
          </MoreUserActionsWrapper>
        }
      </UserInfoWrapper>
      <RecipeImageWrapper>
        <RecipeImageOverlay>
          <Link to={`/recipe/${_id}`}>
            <GoToButton>Go To Recipe</GoToButton>
          </Link>
        </RecipeImageOverlay>
        <RecipeImage>
          <img src={recipeImageCoverApiUrl} alt="dish" />
        </RecipeImage>
      </RecipeImageWrapper>
      <RecipeNameWrapper>
        <RecipeName>{formatRecipeName(recipeName)}</RecipeName>
      </RecipeNameWrapper>
      <RecipeInitialInfo id={_id} myRecipe={myRecipe} likes={likes} preparationTime={preparationTime} />
    </RecipeCardWrapper>
  );
};

export default RecipeCard;
