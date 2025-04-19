import { useState } from 'react';

type Recipe = {
  name: string;
  ingredients: string[];
  steps: string[];
  estimated_time: string;
  estimated_price: string;
};

const RecipePage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [maxTime, setMaxTime] = useState(15);
  const [maxBudget, setMaxBudget] = useState(5);

  const generateRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/gen_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ maxTime, maxBudget }),
      });
      const data = await response.json();
      setRecipes(data.recipes || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trader Joe&apos;s Recipe Generator</h1>
          <p className="mt-2 text-gray-600">Generate quick and budget-friendly recipes using Trader Joe&apos;s ingredients</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Time: {maxTime} minutes
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={maxTime}
              onChange={(e) => setMaxTime(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>5 min</span>
              <span>30 min</span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Budget: ${maxBudget}
            </label>
            <input
              type="range"
              min="1"
              max="20"
              value={maxBudget}
              onChange={(e) => setMaxBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>$1</span>
              <span>$20</span>
            </div>
          </div>

          <button
            onClick={generateRecipes}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Recipes'}
          </button>
        </div>

        {recipes.length > 0 && (
          <div className="space-y-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{recipe.name}</h2>
                
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.map((ingredient: string, i: number) => (
                      <li key={i} className="text-gray-600">{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Steps:</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    {recipe.steps.map((step: string, i: number) => (
                      <li key={i} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Estimated Time: {recipe.estimated_time}</span>
                  <span>Estimated Price: {recipe.estimated_price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipePage;
