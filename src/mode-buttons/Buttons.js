import React from 'react';
import style from "./Buttons.module.css"

function Buttons({buy, setBuy}) {

  function handleClickSell(e) {
    e.preventDefault()
    setBuy("sell")
  }

  function handleClickBuy(e) {
    e.preventDefault()
    setBuy("buy")
  }

  return (
    <div className={style["buttons-container"]}>
      <button className={buy === "sell"? style["mode-button-sell"] : style["mode-button"]} onClick={handleClickSell}>Sell</button>
      <button className={buy === "buy"? style["mode-button-buy"] : style["mode-button"]} onClick={handleClickBuy}>Buy</button>
    </div>
  );
}

export default Buttons;