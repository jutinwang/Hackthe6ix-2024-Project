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
              console.log(response.data)
              setRows( Math.floor((response.data.length)/4)+ 1 )
              setItems(response.data)
            })
            .catch(error => {
              console.error("Error fetching player data:", error);
            });
        // }
    }, []);


    console.log(foodMap.get("strawberry"))
    return (
        <div className={`fridge-info ${openFridge ? 'show' : ''}`} style={{gridTemplateRows: `repeat(${rows}, 1fr)`}}>
            {items.map((grocery, index) => (
                <div key={index} className="grid-item">
                    <input 
                        type="checkbox" 
                        id={`checkbox-${index}`} 
                        checked={checkedItems[index]} 
                        onChange={() => handleCheckboxChange(index)} 
                    />
                    <label htmlFor={`checkbox-${index}`} onClick={() => {setDisplayFood(items[index])}}><img className="food-image" src={foodMap.get(grocery.food)}></img></label>
                </div>
            ))}
        </div>
    );
}