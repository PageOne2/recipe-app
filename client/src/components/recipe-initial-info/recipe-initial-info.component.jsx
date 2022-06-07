import React, { useEffect, useState, useRef } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { likeRecipe, dislikeRecipe } from "../../redux/redux-saga/sagaActions";
import { userLikedRecipes } from "../../redux/userReducer/userReducer";

import "./recipe-initial-info.styles.css"

const RecipeInitialInfo = ({ id, likes, preparationTime }) => {
  const [notLogged, setNotLogged] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLikes = useSelector((state) => state.user.userLikedRecipes);
  const dispatch = useDispatch();
  const value = useRef(null);

  useEffect(() => {
    if (userLikes.includes(id)) {
      setLiked(true);
      // console.log(typeof parseInt(value.current.innerText))
      // if (parseInt(value.current.innerText) === likes) setLikesNumber(likes + 1);
    }
  }, [])

  const likeRecipeFn = (id) => {
    if (isLoggedIn) {
      if (!userLikes.includes(id) && !liked) {
        dispatch(likeRecipe(id));
        setLiked(true);
        // setLikesNumber(likes + 1);
      } else {
        dispatch(dislikeRecipe(id));
        dispatch(userLikedRecipes({ type: 'dislike', id }))
        setLiked(false);
        // setLikesNumber(likes - 1);
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
        <span className="number" ref={value}>{likes}</span>
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