import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { getUser } from "../../redux/redux-saga/sagaActions";

import CategorieButton from "../../components/categorie-button/categorie-button.component"
import RecipesContainer from "../../components/recipes-container/recipes.container.component";
import MoreButton from "../../components/more-button/more-button.component";


import "./homepage.styles.css";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      dispatch(getUser())
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
