import React from "react";
import './clickable-section.css';

export default function ClickableSection(){
    return(
        <div className="click-body">
            <div className="fridge-body" onClick={() => {console.log('fridge has been clicked')}}>

            </div>
        </div>
    )
}