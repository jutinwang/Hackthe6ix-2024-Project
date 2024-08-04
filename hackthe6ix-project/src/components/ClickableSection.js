import React, {useState} from "react";
import './clickable-section.css';
import FridgeGrid from "./FridgeGrid";
import FoodData from "./FoodData";

export default function ClickableSection(){

    const [openFridge, setOpenFridge] = useState(false);
    const [displayFood, setDisplayFood] = useState(null);

    const handleFridgeClick = () => {
        setOpenFridge(!openFridge)
    }

    return(
        <div className="click-body">
            <div className="fridge-body" onClick={() => handleFridgeClick()}>
            </div>
            <div className={`fridge-content ${openFridge ? 'show' : ''}`}>
                <FridgeGrid openFridge={openFridge} setDisplayFood={setDisplayFood}/>
            </div>
            <div className="item-info">
                <FoodData foodInfo={displayFood}/>
            </div>
        </div>
    )
}