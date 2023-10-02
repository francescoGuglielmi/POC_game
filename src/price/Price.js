import React from 'react';
import style from "./Price.module.css"

const Price = ({price}) => {
  return (
    <div className={style["price-container"]}>
      <h1>£{price}.00</h1>
      <div className={style["space"]}></div>
      <h1 className={price === 10? style["arrow-up"] : style["arrow-down"]}>&#8679;</h1>
    </div>
  );
};

export default Price;