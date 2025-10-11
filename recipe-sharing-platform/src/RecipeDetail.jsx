import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // fetch data.json file
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find(
          (recipeItem) => recipeItem.id === parseInt(id)
        );
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error fetching data.json:", error));
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
      <p className="text-gray-700 mb-6">{recipe.summary}</p>

      <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Instructions</h3>
      <ol className="list-decimal list-inside">
        {recipe.instructions &&
          recipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
      </ol>
    </div>
  );
};

export default RecipeDetail;
