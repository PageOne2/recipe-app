import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./recipe-page.styles.css";

const RecipePage = () => {
  const [state, setState] = useState({});
  const params = useParams();

  useEffect(() => {
    async function getRecipe() {
      const res = await fetch(
        `http://localhost:3000/api/recipes/${params.recipeId}`
      );
      const data = await res.json();
      setState(data.data.recipe);
    }

    getRecipe();
  }, []);

  return (
    <div>
      <h1>{state.recipeName}</h1>
    </div>
  );
};

export default RecipePage;
