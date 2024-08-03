// src/Fridge.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Fridge.css'; // Create a CSS file for styling
import fridgeDoorImage from './images/fridge/fridge_door.png';
import strawberry from './images/sprites/strawberry.png';

const Fridge = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFridgeClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fridge-container" onClick={handleFridgeClick}>
      <motion.div
        className="fridge-door"
        animate={{ rotateY: isOpen ? -90 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={fridgeDoorImage} alt="Fridge" className="fridge-image" />
      </motion.div>
      {isOpen && (
        <div className="fridge-content">
             <img src={strawberry} alt="food"/>
        </div>
      )}
    </div>
  );
};

export default Fridge;
