import React from "react";
import './recipe-list.css';

export default function RecipeList({recipes, setRecipesGenerated}){

    console.log(recipes)
    const hasValidRecipes = recipes.some(recipe => recipe.hits && recipe.hits.length > 10);
    const handleRecipeClick = (url) => {
        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    return(
        <div className="recipe-list-details">
            <div className="recipe-list-header">
                <div className="exit-button" onClick={() =>  setRecipesGenerated(false)}>X</div>
                <div className="recipe-list-title">RECIPE LIST</div>
            </div>
            <div className="recipe-list-content">
                {recipes.length > 0 ? (
                    recipes.map((recipe, index) => (
                        <div key={index} onClick={() => handleRecipeClick(recipe.hits[0].recipe.shareAs)} className="recipe-item" style={{ display: recipe.hits.length !== 0 ? 'block' : 'none' }}>
                            <div className="recipe-name">{recipe.q}</div>
                        </div>
                    ))
                ) : (
                    <div className="no-recipes">No recipes found.</div>
                )}
            </div>
        </div>
    )
}