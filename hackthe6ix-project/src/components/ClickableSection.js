import React, {useState} from "react";
import './clickable-section.css';

export default function ClickableSection(){

    const [openFridge, setOpenFridge] = useState(false);

    const handleFridgeClick = () => {
        console.log('fridge has been clicked');
        setOpenFridge(!openFridge)
    }

    return(
        <div className="click-body">
            <div className="fridge-body" onClick={() => handleFridgeClick()}>
            </div>
            <div className={`fridge-content ${openFridge ? 'show' : ''}`}>
                <div className={`fridge-info ${openFridge ? 'show' : ''}`}>

                </div>
            </div>
        </div>
    )
}