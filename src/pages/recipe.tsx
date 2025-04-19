import { useState } from 'react';
// import './styles/recipe.css';

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
    <div className="recipe-container">
      <title>Recipe Generator</title>
      <div className="tj-header">
        <span className="tj-header-icon">🌶️</span>
        {/* <h1 className="tj-title">TRADER JOE'S<br />Recipe Generator</h1> */}
        <h1 className="tj-title tj-font">TRADER JOE&apos;S</h1>
        <h2 className="tj-title">Recipe Generator</h2>
        <span className="tj-header-icon tj-header-icon-right">🥦</span>
        <p className="tj-subtitle">Generate quick and budget-friendly recipes using Trader Joe&apos;s ingredients</p>
      </div>
      <div className="tj-controls-card">
        <div className="tj-slider-group">
          <label className="tj-slider-label">
            Maximum Time: <span className="tj-slider-value">{maxTime}</span> minutes
          </label>
          <input
            type="range"
            min="5"
            max="30"
            value={maxTime}
            onChange={(e) => setMaxTime(parseInt(e.target.value))}
            className="tj-slider"
          />
          <div className="tj-slider-range"><span>5</span><span>15</span><span>30</span></div>
        </div>
        <div className="tj-slider-group">
          <label className="tj-slider-label">
            Maximum Budget: <span className="tj-slider-value">${maxBudget}</span>
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={maxBudget}
            onChange={(e) => setMaxBudget(parseInt(e.target.value))}
            className="tj-slider"
          />
          <div className="tj-slider-range"><span>$1</span><span>$20</span></div>
        </div>
        <button
          onClick={generateRecipes}
          disabled={loading}
          className="tj-generate-btn"
        >
          {loading ? 'Generating...' : 'Generate Recipes'}
        </button>
      </div>
      {recipes.length > 0 && (
        <div className="tj-recipe-list">
          {recipes.map((recipe, index) => (
            <div key={index} className="tj-recipe-card">
              <div className="tj-recipe-header">
                {/* <span className="tj-wrap-icon">🏷️</span> */}
                <h2 className="tj-recipe-title">{recipe.name}</h2>
              </div>
              <div className="tj-recipe-section">
                <h3 className="tj-section-title">Ingredients:</h3>
                <ul className="tj-ingredients-list">
                  {recipe.ingredients.map((ingredient: string, i: number) => (
                    <li key={i} className="tj-ingredient-item">{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="tj-recipe-section">
                <h3 className="tj-section-title">Steps:</h3>
                <ol className="tj-steps-list">
                  {recipe.steps.map((step: string, i: number) => (
                    <li key={i} className="tj-step-item">{step}</li>
                  ))}
                </ol>
              </div>
              <div className="tj-recipe-footer">
                <span>Estimated Time: <b>{recipe.estimated_time}</b></span>
                <span>Estimated Price: <b>{recipe.estimated_price}</b></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipePage;
