import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeById } from '../../redux/redux-saga/sagaActions';
import RecipeInitialInfo from "../../components/recipe-initial-info/recipe-initial-info.component";
import Spinner from "../../components/spinner/spinner.component";
import { v4 as uuidv4 } from "uuid";
import { likeRecipe, dislikeRecipe } from "../../redux/redux-saga/sagaActions";
import { userLikedRecipes } from "../../redux/userReducer/userReducer";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { localDiningIconSx, formatListNumberedIconSx } from "../../iconStyles";
import { 
  RecipePageWrapper,
  RecipePageContent,
  RecipePageName,
  RecipeInfo,
  RecipePageInfo,
  RecipePageImage,
  RecipeImageWrapper,
  UserPicAndInitialInfoWrapper,
  UserPicWrapper,
  LikesAndPrepTimeWrapper,
  LikesInfoWrapper,
  PrepTimeWrapper,
  RecipeFieldsWrapper,
  TabWrapper,
  RecipeListWrapper,
  RecipeFieldNameAndIconWrapper,
  FieldTitle,
  OlMethodList,
  UlIngredientList
} from "../../components/styled-components/recipe-page/styled-components";

const RecipePage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likesTotal, setLikesTotal] = useState(0);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const userLikes = useSelector(state => state.user.userLikedRecipes);
  const interactedRecipes = useSelector(state => state.recipe.interactedRecipes);
  const params = useParams();
  const navigate = useNavigate();
  const recipe = useSelector(state => state.recipe.recipeById);
  const loggedUserData = useSelector(state => state.user.userData);
  const dispatch = useDispatch();
  const recipeImageCoverApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/recipes/recipeImageCover/${recipe.imageCover}` 
  : `http://localhost:3000/api/recipes/recipeImageCover/${recipe.imageCover}`;
  const userProfilePicApiUrl = process.env.NODE_ENV === 'production' 
  ? `${process.env.REACT_APP_API_URL}/user/userProfilePic/${recipe.user?.photo}`
  : `http://localhost:3000/api/users/userProfilePic/${recipe.user?.photo}`
  
  useEffect(() => {
    if (!Object.keys(recipe).length || recipe._id !== params.recipeId) dispatch(getRecipeById(params.recipeId));
    const isTouched = interactedRecipes.find(x => x.id === params.recipeId);
    // Recipe like button that was not "touched" but it is liked already
    if (userLikes.includes(params.recipeId)) {
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
      setLikesTotal(recipe.likes);
    }   
  }, [interactedRecipes]);

  const likeRecipeFn = (id) => {
    if (isLoggedIn) {
      const isMyRecipe = loggedUserData._id === recipe.user._id ? true : false;
      if (!isMyRecipe) {
        if (!userLikes.includes(id) && !liked) {
          dispatch(userLikedRecipes({ type: 'like', id }));
          dispatch(likeRecipe(id));
          setLiked(true);
        } else {
          dispatch(userLikedRecipes({ type: 'dislike', id }));
          dispatch(dislikeRecipe(id));
          setLiked(false);
        }
      }
    } else {
      navigate('/login');
    }
  }

  const favoriteIconSx = (color) => {
    const sx = {
    fontSize: 30, 
    color: color ? "#ed4444" : "#f98c8c",
    cursor: "pointer",
    '&:hover': {
      color: "#ed4444"
    }
    }
    const isMyRecipe = loggedUserData._id === recipe.user._id ? true : false;
    if (isMyRecipe) {
      sx.color = "#ed4444";
      sx.cursor = "default";
    }
    return sx;
  };

  return (
    <RecipePageWrapper>
      {Object.keys(recipe).length ? 
        <RecipePageContent>
          <RecipeInfo>
            <RecipePageInfo>
              <RecipePageName>
                <h1>{recipe.recipeName}</h1>
              </RecipePageName>
              <RecipePageImage>
                <RecipeImageWrapper>
                  <img crossOrigin="anonymous" src={recipeImageCoverApiUrl} alt="dish"/>
                </RecipeImageWrapper>
                <UserPicAndInitialInfoWrapper>
                  <UserPicWrapper>
                    <img crossOrigin="anonymous" src={userProfilePicApiUrl} title={recipe.user.name} alt={recipe.user.name}/>
                  </UserPicWrapper>
                  <LikesAndPrepTimeWrapper>
                    <LikesInfoWrapper bgColor="#ff707021" borderColor="#ed4444">
                      <FavoriteIcon sx={
                        userLikes.includes(params.recipeId) 
                        ? favoriteIconSx("#ed4444") 
                        : favoriteIconSx()
                        } 
                        onClick={() => likeRecipeFn(params.recipeId)}/>
                      <p>{likesTotal ? likesTotal : recipe.likes} likes</p>
                    </LikesInfoWrapper>
                    <PrepTimeWrapper bgColor="#70707017" borderColor="#707070">
                      <AccessTimeIcon sx={{fontSize: 30, color: "#464646"}}/>
                      <p>{recipe.preparationTime} min</p>
                    </PrepTimeWrapper>
                  </LikesAndPrepTimeWrapper>
                </UserPicAndInitialInfoWrapper>
              </RecipePageImage>
              <RecipeFieldsWrapper>
                <TabWrapper>
                  <RecipeFieldNameAndIconWrapper 
                  bgColor={tabIndex === 0 ? "#f55e8b45" : "#f55e8b0f"} borderColor="#f55e8b" onClick={() => setTabIndex(0)}>
                    <LocalDiningIcon sx={localDiningIconSx}/>
                    <FieldTitle>Ingredients</FieldTitle>
                  </RecipeFieldNameAndIconWrapper>
                  <RecipeFieldNameAndIconWrapper 
                  bgColor={tabIndex === 1 ? "#6784ff4d" : "#6784ff0f"} borderColor="#6784ff" onClick={() => setTabIndex(1)}>
                    <FormatListNumberedIcon sx={formatListNumberedIconSx}/>
                    <FieldTitle>Method</FieldTitle>
                  </RecipeFieldNameAndIconWrapper>
                </TabWrapper>
                {tabIndex === 0 && 
                <RecipeListWrapper>
                  <UlIngredientList>
                    {recipe.ingredients?.map(ingredient => (
                      <li key={uuidv4()}>{ ingredient }</li>
                    ))}
                  </UlIngredientList>
                </RecipeListWrapper>
                }
                {tabIndex === 1 &&
                <RecipeListWrapper>
                  <OlMethodList>
                    {recipe.method?.map(item => (
                      <li key={uuidv4()} >{item}</li>   
                      ))}
                  </OlMethodList>
                </RecipeListWrapper>
                }
              </RecipeFieldsWrapper>
            </RecipePageInfo>
          </RecipeInfo>
        </RecipePageContent>
        : <Spinner />
      }
    </RecipePageWrapper>
  );
};

export default RecipePage;
