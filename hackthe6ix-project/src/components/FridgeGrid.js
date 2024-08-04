import React, {useState, useEffect} from "react";
import axios from 'axios';
import './fridge-grid.css';
import './clickable-section.css';
import foodMap from "../backend-logic/hashmap";

export default function FridegGrid({ openFridge, setDisplayFood }) {

    const [checkedItems, setCheckedItems] = useState(Array(16).fill(false));
    const [checkedLabels, setCheckedLabels] = useState([]);
    const [items, setItems] = useState([]);
    const [rows, setRows] = useState(0);

    const handleCheckboxChange = (foodName) => {
        setCheckedItems(prevCheckedItems => {
            const newCheckedItems = { ...prevCheckedItems };
            newCheckedItems[foodName] = !newCheckedItems[foodName];
            
            const newCheckedLabels = newCheckedItems[foodName]
                ? [...checkedLabels, foodName]
                : checkedLabels.filter(label => label !== foodName);
    
            setCheckedLabels(newCheckedLabels);
            setActiveIngredients(newCheckedLabels);
            return newCheckedItems;
        });
    };

    useEffect(() => {
        // if (player) {
          axios.get(`http://localhost:3001/foodInFridge`)
            .then(response => {
              console.log(response.data)
              setRows( Math.floor((response.data.length)/4)+ 1 )
              setItems(response.data)
            })
            .catch(error => {
              console.error("Error fetching player data:", error);
            });
        // }
    }, []);

    return (
        <div className={`fridge-info ${openFridge ? 'show' : ''}`} style={{gridTemplateRows: `repeat(${rows}, 1fr)`}}>
            {items.map((grocery, index) => (
                <div key={index} className="grid-item">
                    <input 
                        type="checkbox" 
                        id={`checkbox-${index}`} 
                        checked={checkedItems[grocery.food] || false} 
                        onChange={() => handleCheckboxChange(grocery.food)} 
                    />
                    <label htmlFor={`checkbox-${index}`} onClick={() => {setDisplayFood(items[index])}}><img className="food-image" src={foodMap.get(grocery.food)}></img></label>
                </div>
            ))}
        </div>
    );
}