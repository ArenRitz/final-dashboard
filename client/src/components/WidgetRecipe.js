import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";

const WidgetRecipe = (props) => {
  const [recipe, setRecipe] = useState({
    type: "",
    category: "",
    theme: "",
    source: "",
    thumbnail: "",
  });

  useEffect(() => {
    const apiRandomRecipeUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;

    axios
      .get(apiRandomRecipeUrl)
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
    <div className="text-center bg-base-200   shadow-lg shadow-base-content/10 w-[380px] rounded-3xl h-[168px]">
      <div className="flex flex-row">
        <div className="w-[40%] m-2 ">
          <a href={recipe.source} className=" ">
              <img
                src={recipe.thumbnail}
                alt="thumbnail for recipe"
                className=" w-full h-full rounded-3xl"
              />
          </a>
        </div>
        <div className="w-[60%] h-[100%]  flex flex-col">
          <div className="h-[20%] w-[95%]">
         
          <h2 className="mt-2 mb-4 text-accent border-b-2 border-accent"> What Should I Cook?</h2>
          </div>
        <div className=" h-[80%] text-start">
        <a href={recipe.source} className=" ">
          <h3 className="text-secondary">
            {recipe.theme.length > 45
              ? recipe.theme.substring(0, 45) + "..."
              : recipe.theme}
          </h3>
          </a>
          <p>Cuisine: {recipe.type}</p>
          <p>Category: {recipe.category}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default WidgetRecipe;
