import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { likeRecipe, dislikeRecipe } from "../../redux/redux-saga/sagaActions";
import { userLikedRecipes } from "../../redux/userReducer/userReducer";
import TimerIcon from '@mui/icons-material/Timer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { favoriteIconSx, timerIconSx } from '../../iconStyles';
import { 
  RecipeInitialInfoWrapper,
  LikesWrapper,
  TimeWrapper,
  NumberOfLikes,
  Minutes
 } from '../styled-components/recipe-initial-info/styled-components';

const RecipeInitialInfo = ({ id, myRecipe, likes, preparationTime }) => {
  const [liked, setLiked] = useState(false);
  const [likesTotal, setLikesTotal] = useState(likes);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userLikes = useSelector(state => state.user.userLikedRecipes);
  const interactedRecipes = useSelector(state => state.recipe.interactedRecipes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isTouched = interactedRecipes.find(x => x.id === id);
    // Recipe like button that was not "touched" but it is liked already
    if (userLikes.includes(id)) {
      setLiked(true);
      // Recipe that is now liked and that have been "touched"
      if (isTouched) {
        setLikesTotal(isTouched.likes);
      }
    } else if (isTouched) {
      // Recipe that have been "touched" but is not liked = disliked
      setLikesTotal(isTouched.likes);
    } else {
      // Recipe that is not liked and has not been "touched"
      setLikesTotal(likes);
    }
  }, [interactedRecipes])

  const likeRecipeFn = (id) => {
    if (isLoggedIn) {
      if (!userLikes.includes(id) && !liked) {
        dispatch(userLikedRecipes({ type: 'like', id }));
        dispatch(likeRecipe(id));
        setLiked(true);
      } else {
        dispatch(userLikedRecipes({ type: 'dislike', id }));
        dispatch(dislikeRecipe(id));
        setLiked(false);
      }
    } else {
      navigate('/login');
    }
  }

  return (
    <RecipeInitialInfoWrapper>
      <LikesWrapper>
        {!myRecipe &&
          <FavoriteIcon 
            sx={liked 
              ? favoriteIconSx("#ff0000", "#fd7b7b")
              : favoriteIconSx()
            } 
            onClick={() => likeRecipeFn(id)}
          />
        }
        <NumberOfLikes>{likesTotal}</NumberOfLikes>
      </LikesWrapper>
      <TimeWrapper>
        <TimerIcon sx={timerIconSx}/>
        <Minutes>{preparationTime} MIN</Minutes>
      </TimeWrapper>
    </RecipeInitialInfoWrapper>
  )
}

export default RecipeInitialInfo;