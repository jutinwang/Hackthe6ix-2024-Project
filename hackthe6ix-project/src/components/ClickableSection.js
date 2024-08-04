import React, {useState} from "react";
import './clickable-section.css';
import FridgeGrid from "./FridgeGrid";
import FoodData from "./FoodData";
import RecipeList from "./RecipeList";
import axios from "axios";

export default function ClickableSection(){

    const [openFridge, setOpenFridge] = useState(false);
    const [displayFood, setDisplayFood] = useState(null);
    const [activeIngredients, setActiveIngredients] = useState([]);
    const [recipeIdeas, setRecipeIdeas] = useState([]);
    const [recipesGenerated, setRecipesGenerated] = useState(false);

    const handleFridgeClick = () => {
        setOpenFridge(!openFridge)
    }

    const handleRecipe = () => {
        const concatenated = activeIngredients.reduce((accumulator, currentValue) => {
            return accumulator ? accumulator + ',' + currentValue : currentValue;
        }, '');

        console.log(concatenated)
        axios.get(`http://localhost:3001/generateRecipeGPT/${concatenated}`)
            .then(response => {
              setRecipeIdeas(response.data)
              setRecipesGenerated(true)
            })
            .catch(error => {
              console.error("Error fetching player data:", error);
        });
    };

    return(
        <div className="click-body">
            <div
                className="fridge-body"
                onClick={() => handleFridgeClick()}
                style={{ display: recipesGenerated || openFridge ? 'none' : 'block' }}
            >
            </div>
            <div
                className={`fridge-content ${openFridge ? 'show' : ''}`}
                style={{ display: recipesGenerated ? 'none' : (openFridge ? 'block' : 'none') }}
            >
                <FridgeGrid openFridge={openFridge} setDisplayFood={setDisplayFood} setActiveIngredients={setActiveIngredients} />
            </div>
            <div
                className={`item-info ${openFridge ? 'show' : ''}`}
                style={{ display: recipesGenerated ? 'none' : (openFridge ? 'block' : 'none') }}
            >
                <FoodData foodInfo={displayFood} />
            </div>
            <div
                className={`generate-container ${openFridge ? 'show' : ''}`}
                onClick={() => handleRecipe()}
                style={{ display: recipesGenerated ? 'none' : (openFridge ? 'flex' : 'none') }}
            >
                Generate Recipes!
            </div>
            <div
                className="recipe-list-body"
                style={{ display: recipesGenerated ? 'block' : 'none' }}
            >
                <RecipeList recipes={recipeIdeas} setRecipesGenerated={setRecipesGenerated}/>
            </div>
        </div>
    )
}