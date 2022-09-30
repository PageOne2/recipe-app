import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getUserRecipes, getRecipesUserLiked } from "../../redux/redux-saga/sagaActions";
import { v4 as uuidv4 } from "uuid";
import RecipeCard from "../../components/recipe-card/recipe.card.component";
import { 
  UserPageWrapper,
  UserProfilePicWrapper,
  ProfilePic,
  UserName,
  TabWrapper,
  Tab,
  RecipesWrapper,
  EmptyResponseWrapper,
  SpinnerWrapper,
  SpinnerRotate
} from "../../components/styled-components/user-page/styled.component";
import { getRecipesUserLikedEmpty, getRecipesUserLikedSuccess } from "../../redux/userReducer/userReducer";

const UserPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const userInfo = useSelector(state => state.user.userInfo);
  const userRecipes = useSelector(state => state.user.userRecipes);
  const recipesUserLiked = useSelector(state => state.user.recipesUserLiked);
  const noRecipesUserLiked = useSelector(state => state.user.noRecipesUserLiked);
  const params = useParams();
  const dispatch = useDispatch();
  const userProfilePicApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/users/userProfilePic/${userInfo.photo}`
  : `http://localhost:3000/api/users/userProfilePic/${userInfo.photo}`

  useEffect(() => {
    dispatch(getUserInfo(params.userId));
    dispatch(getUserRecipes(params.userId));

    return () => {
      dispatch(getRecipesUserLikedSuccess([]));
      dispatch(getRecipesUserLikedEmpty(false));
    }
  }, []);

  const handleClick = (index) => {
    if (tabIndex === index) return;
    if (index === 1) dispatch(getRecipesUserLiked(params.userId));
    setTabIndex(index);
  }

  const loadRecipesUserLiked = () => {
    if (tabIndex === 1) {
      if (recipesUserLiked.length) {
        return (
          <RecipesWrapper>
            {recipesUserLiked.map(item => (
              <RecipeCard key={uuidv4()} item={item}/>
            ))}
          </RecipesWrapper>
        )
      } else if (noRecipesUserLiked) {
        return (
          <EmptyResponseWrapper>
            <p>User have not liked any recipes yet!</p>
          </EmptyResponseWrapper>
        )
      } else {
        return (
          <SpinnerWrapper>
            <SpinnerRotate/>
          </SpinnerWrapper> 
        )
      }
    }
  }

  return (
    <UserPageWrapper>
      <UserProfilePicWrapper>
        <ProfilePic src={userProfilePicApiUrl}/>
        <UserName>{userInfo.name}</UserName>
      </UserProfilePicWrapper>
      <TabWrapper>
        <Tab op={tabIndex !== 0 ? "0.6" : "1"} onClick={() => handleClick(0)}>Shared Recipes</Tab>
        <Tab op={tabIndex !== 1 ? "0.6" : "1"} onClick={() => handleClick(1)}>Liked Recipes</Tab>
      </TabWrapper>
      {tabIndex === 0 &&
        <RecipesWrapper>
          {userRecipes.map(item => (
            <RecipeCard key={uuidv4()} item={item}/>
          ))}
        </RecipesWrapper>
      }
      {loadRecipesUserLiked()}
    </UserPageWrapper>
  )
};

export default UserPage;
