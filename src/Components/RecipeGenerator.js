import React, { useState } from "react";

function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const createRecipe = async () => {
    try {
      if (!ingredients.trim()) return;

      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/recipe-creator?ingredients=${encodeURIComponent(ingredients)}&cuisine=${encodeURIComponent(cuisine)}&dietaryRestrictions=${encodeURIComponent(dietaryRestrictions)}`
      );
      const data = await response.text();
      setRecipe(data);

    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create a Recipe</h2>

      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients (comma separated)"
      />

      <input
        type="text"
        value={cuisine}
        onChange={(e) => setCuisine(e.target.value)}
        placeholder="Cuisine type"
      />

      <input
        type="text"
        value={dietaryRestrictions}
        onChange={(e) => setDietaryRestrictions(e.target.value)}
        placeholder="Dietary restrictions"
      />

      <button className="generate-btn" onClick={createRecipe}>
        {loading ? "Generating..." : "Create Recipe"}
      </button>

      <div className="output">
        {recipe && <pre className="recipe-text">{recipe}</pre>}
      </div>
    </div>
  );
}

export default RecipeGenerator;