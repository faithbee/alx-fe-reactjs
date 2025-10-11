import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!title.trim() || !ingredients.trim() || !steps.trim()) {
      setError("Please fill out all fields before submitting.");
      return;
    }

    const ingredientsList = ingredients
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item);

    if (ingredientsList.length < 2) {
      setError("Please include at least two ingredients, separated by commas.");
      return;
    }

    // Mock submitting the recipe
    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredientsList,
      instructions: steps.split(".").filter((s) => s.trim()),
    };

    console.log("✅ New Recipe Added:", newRecipe);

    setSuccess(true);
    setTitle("");
    setIngredients("");
    setSteps("");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add a New Recipe
      </h2>

      {error && (
        <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-3">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-100 text-green-600 px-4 py-2 rounded mb-3">
          Recipe submitted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2 font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Ingredients (separated by commas)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g. Rice, Chicken, Salt"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            placeholder="Write each step separated by a period."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
