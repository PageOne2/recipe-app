import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { likeRecipe, dislikeRecipe } from "../../redux/redux-saga/sagaActions";
import { userLikedRecipes } from "../../redux/userReducer/userReducer";

import "./recipe-initial-info.styles.css"

const RecipeInitialInfo = ({ id, myRecipe, likes, preparationTime }) => {
  const [notLogged, setNotLogged] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesTotal, setLikesTotal] = useState(likes);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLikes = useSelector((state) => state.user.userLikedRecipes);
  const interactedRecipes = useSelector((state) => state.user.interactedRecipes);
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
      setNotLogged(true);
    }
  }

  return (
    <div className="more-info">
      <div className="likes">
        {!myRecipe &&
          <span className="material-icons" id={liked ? "heart-icon-liked" : "heart-icon"} onClick={() => likeRecipeFn(id)}>
            favorite
          </span>
        }
        <span className="number">{likesTotal}</span>
      </div>
      <div className="time">
        <span className="material-icons">timer</span>
        <span className="minutes">{preparationTime} MIN</span>
      </div>
      {notLogged && <div className="not_logged">You are not logged in! Log In to like this recipe.</div>}
    </div>
  )
}

export default RecipeInitialInfo;