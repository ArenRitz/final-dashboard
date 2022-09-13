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
    <div className="text-center bg-base-200 px-4 py-4 border-solid border-2 border-base-content w-[380px] rounded-3xl h-[143px]  shadow-lg shadow-black/30">
      <div className="flex flex-row items-center">
        <div>
          <p>Type: {recipe.type}</p>
          <p>Category: {recipe.category}</p>
          <p>
            Theme:{" "}
            {recipe.theme.length > 15
              ? recipe.theme.substring(0, 15) + "..."
              : recipe.theme}
          </p>
        </div>
        <div className="px-8">
          <a href={recipe.source} className="masker mask-squircle">
            <div>
              <img
                src={recipe.thumbnail}
                alt="thumbnail for recipe"
                className="w-[100px] h-[100px] "
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WidgetRecipe;
