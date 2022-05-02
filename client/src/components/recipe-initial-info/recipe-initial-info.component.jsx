import React from 'react';

import "./recipe-initial-info.styles.css"

const RecipeInitialInfo = ({ likes, preparationTime }) => {
    return (
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
    )
}

export default RecipeInitialInfo;