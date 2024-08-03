import React, {useState} from "react";
import './clickable-section.css';
import FridgeGrid from "./FridgeGrid";

export default function ClickableSection(){

    const [openFridge, setOpenFridge] = useState(false);

    const handleFridgeClick = () => {
        setOpenFridge(!openFridge)
    }

    return(
        <div className="click-body">
            <div className="fridge-body" onClick={() => handleFridgeClick()}>
            </div>
            <div className={`fridge-content ${openFridge ? 'show' : ''}`}>
                <FridgeGrid openFridge={openFridge}/>
            </div>
        </div>
    )
}