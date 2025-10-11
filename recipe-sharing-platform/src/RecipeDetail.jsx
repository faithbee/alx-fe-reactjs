import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedRecipe = data.find((item) => item.id === parseInt(id));
        setRecipe(selectedRecipe);
      })
      .catch((error) => console.error("Error loading recipe details:", error));
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading recipe details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {recipe.title}
        </h1>

        <p className="text-gray-700 mb-6 text-lg">{recipe.summary}</p>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            🧂 Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            👩‍🍳 Cooking Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            {recipe.instructions?.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <Link
          to="/"
          className="inline-block mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
