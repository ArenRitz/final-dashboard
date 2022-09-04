import React, { useEffect, useState } from 'react'
import axios from 'axios';

// EDAMAM API DETAILS
// let userQueryRecipe = "pizza";
// let appID = "ca9ee7dc";
// let appKey = "aabc9460c81f9334cc2c38dee5a76698"

// let apiRecipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userQueryRecipe}&app_id=${appID}&app_key=${appKey}`

//Meal DB API for random recipe (use this one)

const WidgetRecipe = () => {

  const [recipe, setRecipe] = useState({
    type: "",
    category: "",
    theme: "",
    source: "",
  });

  useEffect(() => {

    const apiRandomRecipeUrl = `https://www.themealdb.com/api/json/v1/1/random.php`

    axios.get(apiRandomRecipeUrl)
      .then((response) => {
        const recipeData = response.data.meals[0];
        console.log(recipeData);
        if (recipeData) {
          setRecipe({
            ...recipe,
            type: recipeData.strArea,
            category: recipeData.strCategory,
            theme: recipeData.strMeal,
            source: recipeData.strSource,
          });
        } else {
          setRecipe({
            ...recipe,
            type: "No data",
            category: "No data",
            theme: "No data",
            source: "No data",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="recipe-main">
      <div className="recipe-title">
        Recipe Information:
      </div>
      <div className="recipe-info">
        <p className="recipe-type">
          {recipe.type}
        </p>
        <p className="recipe-category">
          {recipe.category}
        </p>
        <p className="recipe-theme">
          {recipe.theme}
        </p>
        <p className="recipe-source">
          {recipe.source}
        </p>
      </div>
    </div>

  )
}

export default WidgetRecipe