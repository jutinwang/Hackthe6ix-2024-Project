import React, {useState} from "react";
import './fridge-grid.css';
import './clickable-section.css';

export default function FridgeGrid({openFridge}){

    return(

        <div className={`fridge-info ${openFridge ? 'show' : ''}`}>
            {[...Array(16)].map((_, index) => (
                <div key={index} className="grid-item">
                    Item {index + 1}
                </div>
            ))}
        </div>
    )
}