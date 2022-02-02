import React from "react";

import recipeImage from "../../assets/default.jpg";

import "./recipe.card.styles.css";

const RecipeCard = ({
  item: { recipeName, likes, preparationTime, imageCover, user },
}) => {
  return (
    <div className="recipe-card">
      <div className="user">
        <img
          className="user-image"
          src={`http://localhost:3000/img/user/${user.photo}`}
          alt="user"
        />
        <h4 className="user-name">{user.name}</h4>
      </div>
      <div className="recipe-image">
        <div className="overlay">
          <button>Go To Recipe</button>
        </div>
        <img src={recipeImage} alt="dish" />
      </div>
      <div className="recipe-name">
        <h3>{recipeName}</h3>
      </div>
      <div className="more-info">
        <div className="likes">
          <span className="material-icons" id="heart-icon">
            favorite
          </span>
          <span className="number">{likes}</span>
        </div>
        <div className="time">
          <span className="material-icons">timer</span>
          <span className="minutes">{preparationTime} MIN</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
