import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyRecipes } from "../../redux/redux-saga/sagaActions";
import profilePic from "../../assets/user-profile.png";
import RecipeCard from "../../components/recipe-card/recipe.card.component";
import { v4 as uuidv4 } from "uuid";

import "./profile.styles.css"

const ProfilePage = () => {
  const me = useSelector((state) => state.user.userData);
  const myRecipes = useSelector((state) => state.user.myRecipes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyRecipes());
  }, [])

  return (
    <div className="profile-container">
      <div className="user-info">
        <img className="profile-pic" src={profilePic} alt="profile-picture"></img>
        <h3>{me.name}</h3>
      </div>
      <div className="my-recipes">
        {myRecipes.map(item => (
          <RecipeCard key={uuidv4()} item={item}/>
        ))}
      </div>
    </div>
  )
}

export default ProfilePage;