import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Load recipes from data.json
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        const foundRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(foundRecipe);
      })
      .catch((error) => console.error("Error loading data.json", error));
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h2 className="text-3xl font-bold mb-3">{recipe.title}</h2>
      <p className="mb-4 text-gray-700">{recipe.summary}</p>

      <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
      <ol className="list-decimal list-inside space-y-2">
        {recipe.instructions &&
          recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
      </ol>
    </div>
  );
}

export default RecipeDetail;
