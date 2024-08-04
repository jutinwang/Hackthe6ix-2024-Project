import React, {useState, useEffect} from "react";
import axios from 'axios';
import './fridge-grid.css';
import './clickable-section.css';
import foodMap from "../backend-logic/hashmap";
import Modal from "./modal";
import Add from "../images/sprites/add.png";

export default function FridegGrid({ openFridge, setDisplayFood, setActiveIngredients }) {

    const [checkedItems, setCheckedItems] = useState(Array(16).fill(false));
    const [checkedLabels, setCheckedLabels] = useState([]);
    const [items, setItems] = useState([]);
    const [rows, setRows] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [foodName, setFoodName] = useState('');
    const [amount, setAmount] = useState('');
    const [datePurchased, setDatePurchased] = useState('');

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

    const fetchItems = () => {
        axios.get('http://localhost:3001/foodInFridge')
            .then(response => {
                console.log(response.data);
                setRows(Math.floor(response.data.length / 4) + 1);
                setItems(response.data);
            })
            .catch(error => {
                console.error("Error fetching items:", error);
            });
    };

    const openModal = () => {
        setIsModalOpen(true);
        console.log(isModalOpen)
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        var formData = {foodName, amount, datePurchased}
        
        axios.post('http://localhost:3001/addFood', formData)
            .then(response => {
                console.log('Food added:', response.data);
                fetchItems();
                closeModal();
            })
            .catch(error => {
                console.error('Error adding food:', error);
            });
    }

    useEffect(() => {
        fetchItems(); // Fetch items when component mounts
    }, []);
    
    if(items.length === 0){
        return(
            <div></div>
        )
    }

    return (
        <div className={`fridge-info ${openFridge ? 'show' : ''}`} style={{gridTemplateRows: `repeat(${rows}, 1fr)`}}>
            {[...Array(items.length)].map((_, index) => (
                <div key={index} className="grid-item">
                    <input 
                        type="checkbox" 
                        id={`checkbox-${index}`} 
                        checked={checkedItems[items[index].food] || false} 
                        onChange={() => handleCheckboxChange(items[index].food)} 
                    />
                    <label htmlFor={`checkbox-${index}`} onClick={() => {setDisplayFood(items[index])}}><img className="food-image" src={foodMap.get(items[index].food)}></img></label>
                </div>
            ))}
            {[...Array(rows*4 - items.length)].map((_, index) => (
                <div key={index+items.length} className="grid-item" onClick={() => {openModal()}}>
                    <div className="free-space"><img className="food-image" src={Add}></img></div>
                </div>
            ))}
            <div className="modal-body" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                <div className="modal-body-header">
                    <div className="modal-exit" onClick={() => closeModal()}>X</div>
                    <div className="modal-tile">Put food in your fridge!</div>
                </div>
                <div className="modal-details">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-input">
                            <label htmlFor="foodName">Food Name:</label>
                            <input
                            type="text"
                            id="foodName"
                            value={foodName}
                            onChange={(e) => setFoodName(e.target.value)}
                            required
                            />
                        </div>
                        <div className="modal-input">
                            <label htmlFor="amount">Amount (in grams):</label>
                            <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                            />
                        </div>
                        <div className="modal-input">
                            <label htmlFor="datePurchased">Date Purchased:</label>
                            <input
                            type="date"
                            id="datePurchased"
                            value={datePurchased}
                            onChange={(e) => setDatePurchased(e.target.value)}
                            required
                            />
                        </div>
                        <div className="modal-submit">
                            <button type="submit">Add to fridge</button>
                        </div>
                        </form>
                    </div>
            </div>
        </div>
    );
}