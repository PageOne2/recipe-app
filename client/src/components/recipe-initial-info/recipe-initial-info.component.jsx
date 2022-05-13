import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { likeRecipe, dislikeRecipe } from "../../redux/redux-saga/sagaActions";
import { userLikedRecipes } from "../../redux/userReducer/userReducer";

import "./recipe-initial-info.styles.css"

const RecipeInitialInfo = ({ id, likes, preparationTime }) => {
  const [notLogged, setNotLogged] = useState(false);
  const [liked, setLiked] = useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLikes = useSelector((state) => state.user.userLikedRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLikes.includes(id)) setLiked(true);
  }, [])

  const likeRecipeFn = (id) => {
    if (isLoggedIn) {
      if (!userLikes.includes(id) && !liked) {
        setTimeout(() => {
          dispatch(likeRecipe(id));
          setLiked(true);
        }, 500)
      } else {
        const filteredUserLikes = userLikes.filter(x => x !== id);
        setTimeout(() => {
          dispatch(dislikeRecipe(id));
          dispatch(userLikedRecipes(['dislike', filteredUserLikes]))
          setLiked(false);
        }, 500)
      }
    } else {
      setNotLogged(true);
    }
  }

  return (
    <div className="more-info">
      <div className="likes">
        <span className="material-icons" id={liked ? "heart-icon-liked" : "heart-icon"} onClick={() => likeRecipeFn(id)}>
          favorite
        </span>
        <span className="number">{likes}</span>
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