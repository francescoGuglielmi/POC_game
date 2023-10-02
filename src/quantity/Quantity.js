import React from 'react';
import style from "./Quantity.module.css"

const Quantity = ({setQuantity}) => {
  return (
    <div className={style["quantity-container"]}>
      <input className={style["quantity"]} type="number" defaultValue={10} onChange={(event) => setQuantity(event.target.value)}></input>
    </div>
  );
};

export default Quantity;