import React from 'react';
import style from "./OrderButton.module.css"

function OrderButton({toggleModal}) {
  return (
    <div className={style["buttons-container"]}>
      <button className={style["order-button"]} onClick={toggleModal}>Place Order</button>
    </div>
  );
}

export default OrderButton;