import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { getMe } from "../../redux/redux-saga/sagaActions";

import CategorieButton from "../../components/categorie-button/categorie-button.component"
import RecipesContainer from "../../components/recipes-container/recipes.container.component";
import MoreButton from "../../components/more-button/more-button.component";


import "./homepage.styles.css";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      dispatch(getMe())
    }
  }, [dispatch])

  return (
    <div className="homepage">
      <CategorieButton />
      <RecipesContainer />
      <MoreButton />
    </div>
  );
};

export default HomePage;
