import React from 'react';
import style from './Modal.module.css'; 

function Modal({ isOpen, setIsOpen, buy, quantity, price, handlePlaceOrder }) {
  if (!isOpen) return null;

  const onClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    
    <div className={style["modal"]}>
      <button className={style["close-button"]} onClick={onClose}>
        &times;
      </button>
      <div className={style["modal-content"]}>
        <br></br>
        {buy === "buy" && <p>Do you want to buy {quantity} units for £{quantity * price}?</p>}
        {buy === "sell" && <p>Do you want to sell {quantity} units for £{quantity * price}?</p>}
        <div className={style["buttons-container"]}>
          <button className={style['confirm-button']} onClick={handlePlaceOrder}>Confirm</button>
          <button className={style['cancel-button']} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
    
  );
}

export default Modal;