import React, {useState} from "react";
import './clickable-section.css';
import FridgeGrid from "./FridgeGrid";
import FoodData from "./FoodData";
import axios from "axios";

export default function ClickableSection(){

    const [openFridge, setOpenFridge] = useState(false);
    const [displayFood, setDisplayFood] = useState(null);
    const [activeIngredients, setActiveIngredients] = useState([])

    const handleFridgeClick = () => {
        setOpenFridge(!openFridge)
    }

    const handleRecipe = () => {
        axios.get(`http://localhost:3001/generateRecipeGPT`)
            .then(response => {
              console.log(response.data)
            })
            .catch(error => {
              console.error("Error fetching player data:", error);
        });
    };

    return(
        <div className="click-body">
            <div className="fridge-body" onClick={() => handleFridgeClick()}>
            </div>
            <div className={`fridge-content ${openFridge ? 'show' : ''}`}>
                <FridgeGrid openFridge={openFridge} setDisplayFood={setDisplayFood} setActiveIngredients={setActiveIngredients}/>
            </div>
            <div className="item-info">
                <FoodData foodInfo={displayFood}/>
            </div>
            <div className="generate-container" onClick={() => {handleRecipe()}}>
                Generate Recipes!
            </div>
        </div>
    )
}