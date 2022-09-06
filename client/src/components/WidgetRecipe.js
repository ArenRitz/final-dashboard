import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Button from './Button';
// EDAMAM API DETAILS
// let userQueryRecipe = "pizza";
// let appID = PROCESS.ENV.REACT_APP_EDAMAM_APP_ID;
// let appKey = PROCESS.ENV.REACT_APP_EDAMAM_APP_KEY;

// let apiRecipeURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${userQueryRecipe}&app_id=${appID}&app_key=${appKey}`

//Meal DB API for random recipe (use this one)

const WidgetRecipe = () => {

  const [recipe, setRecipe] = useState({
    type: "",
    category: "",
    theme: "",
    source: "",
    thumbnail: "",
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
            thumbnail: recipeData.strMealThumb,
          });
        } else {
          setRecipe({
            ...recipe,
            type: "No data",
            category: "No data",
            theme: "No data",
            source: "No data",
            thumbnail: "No data",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <>
    <Button click={props.click} name="Recipe" />
    
    <div className="recipe-main">
      <div className="recipe-title">
        <p>RECIPE INFORMATION</p>
      </div>
      <div className="recipe-info">
        <div className="recipe-details">
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
        <div>
          <img className="recipe-thumbnail" src={recipe.thumbnail} alt="thumbnail for recipe" width="200" height="200" />
        </div>
      </div>
    </div>

    </>
  );
}

export default WidgetRecipe