import React, {useState} from "react";
import './fridge-grid.css';
import './clickable-section.css';

export default function FridegGrid({ openFridge }) {

    const [checkedItems, setCheckedItems] = useState(Array(16).fill(false));
    const [checkedLabels, setCheckedLabels] = useState([]);

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

    console.log(checkedLabels)
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
                    <label htmlFor={`checkbox-${index}`}>Item {index + 1}</label>
                </div>
            ))}
        </div>
    );
}