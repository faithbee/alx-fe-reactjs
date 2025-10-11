import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams(); // Get recipe ID from URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    // Fetch recipes from the public/data.json file
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find(
          (item) => item.id === parseInt(id)
        );
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe data:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-gray-600">
        Loading recipe details...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
      <p className="text-gray-600 mb-6">{recipe.summary}</p>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Instructions</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>

      <Link
        to="/"
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default RecipeDetail;
