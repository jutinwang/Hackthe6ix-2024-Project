import React, {useState, useEffect} from "react";
import axios from 'axios';
import './fridge-grid.css';
import './clickable-section.css';
import foodMap from "../backend-logic/hashmap";

export default function FridegGrid({ openFridge }) {

    const [checkedItems, setCheckedItems] = useState(Array(16).fill(false));
    const [checkedLabels, setCheckedLabels] = useState([]);
    const [items, setItems] = useState([]);

    const handleCheckboxChange = (index) => {
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = [...prevCheckedItems];
            newCheckedItems[index] = !newCheckedItems[index];
            
            const itemLabel = `Item ${index + 1}`;
            const newCheckedLabels = newCheckedItems[index]
                ? [...checkedLabels, itemLabel]
                : checkedLabels.filter(label => label !== itemLabel);

            setCheckedLabels(newCheckedLabels);
            return newCheckedItems;
        });
    };

    useEffect(() => {
        // if (player) {
          axios.get(`http://localhost:3001/foodInFridge`)
            .then(response => {
              console.log(response)
            })
            .catch(error => {
              console.error("Error fetching player data:", error);
            });
        // }
    }, []);


    console.log(foodMap.get("strawberry"))
    return (
        <div className={`fridge-info ${openFridge ? 'show' : ''}`}>
            {[...Array(16)].map((_, index) => (
                <div key={index} className="grid-item">
                    <input 
                        type="checkbox" 
                        id={`checkbox-${index}`} 
                        checked={checkedItems[index]} 
                        onChange={() => handleCheckboxChange(index)} 
                    />
                    <label htmlFor={`checkbox-${index}`}><img src={foodMap.get("strawberry")}></img></label>
                </div>
            ))}
        </div>
    );
}