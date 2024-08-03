// src/Fridge.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Fridge.css';
import fridgeDoorImage from './images/fridge/fridge_door.png';
import strawberry from './images/sprites/strawberry.png'; // temp

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFridgeClick = () => {
    setIsOpen(!isOpen); // Tracks if door is open or not
  };

  return (
    <div className="fridge-overlay-container">
        <div className="grid-container">
            {[...Array(8)].map((_, index) => ( // Loop for displaying images
                <div key={index} className="grid-item"><img src={strawberry} class="foodImage" alt="food"/></div>
            ))}
        </div>
        <div className="fridge-container" onClick={handleFridgeClick}> 
        <motion.div // Used for fridge animation
            className="fridge-door"
            animate={{ rotateY: isOpen ? 90 : 0 }} // -90 Opens it outwards
            transition={{ duration: 0.5 }}
        >
        <img src={fridgeDoorImage} alt="Fridge" className="fridge-image" />
        </motion.div> { isOpen && (
            // currently does nothing
            <div className="fridge-content"> 
            </div>
        )}
        </div>
    </div>
  );
};

export default Fridge;
