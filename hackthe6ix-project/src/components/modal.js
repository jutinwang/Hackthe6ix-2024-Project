import React from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  console.log("hellp")
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        Here we are
      </div>
    </div>
  );
};

export default Modal;
