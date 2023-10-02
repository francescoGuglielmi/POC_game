import style from './App.module.css';
import Buttons from '../mode-buttons/Buttons';
import OrderButton from '../order-button/OrderButton';
import Asset from '../asset/Asset';
import Price from '../price/Price';
import Quantity from '../quantity/Quantity';
import Modal from '../modal/Modal';
import { useEffect, useState } from 'react';

function App() {

  const [price, setPrice] = useState(10)
  const [isTen, setIsTen] = useState(true)
  const [buy, setBuy] = useState("buy")
  const [yellowBorder, setYellowBorder] = useState("")
  const [paid, setPaid] = useState(0)
  const [gained, setGained] = useState(500)
  const [quantity, setQuantity] = useState(10)
  const [owned, setOwned] = useState(0)
  const [orders, setOrders] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTen((prevIsTen) => {
        const newValue = prevIsTen ? 5 : 10;
        setPrice(newValue);
        return !prevIsTen;
      });
    }, 800);

    const handleKeyDown = (event) => {
      if (event.key === "k" && 
          event.shiftKey && 
          (event.ctrlKey || event.metaKey)
      ) {
        setYellowBorder((prevYellowBorder) => {
          if (prevYellowBorder === "") return "yellow-border";
          return "";
        });
      }

      if (event.key === "m" && yellowBorder !== "") {
        if (buy === "buy" && isOpen) {
          handlePlaceOrder()
          toggleModal()
          return
        }
        if (buy === "sell" && isOpen) {
          toggleModal()
          return
        }
        if (buy === "buy" && !isOpen) {
          toggleModal()
          return
        }
        if (buy !== "buy") {
          setBuy("buy")
          return
        }
      }

      if (event.key === "n" && yellowBorder !== "") {
        if (buy === "sell" && isOpen) {
          handlePlaceOrder()
          toggleModal()
          return
        }
        if (buy === "buy" && isOpen) {
          toggleModal()
          return
        } 
        if (buy === "sell" && !isOpen) {
          toggleModal()
          return
        }
        if (buy !== "sell") {
          setBuy("sell")
          return
        } 
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(timer);
    };
    
  }, [yellowBorder, buy, isOpen, price]); 

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handlePlaceOrder = () => {
    if (buy === "buy" && price * quantity <= gained) {
      orders.push({ type: buy, quantity: quantity, price: price })
      setPaid(paid + (price * Number(quantity)))
      setOwned(owned + quantity)
      console.log(orders)
    } else if (buy === "buy" && !(price * quantity <= gained)) {
      alert("YOU CAN'T PLACE THIS ORDER")
      return
    }
    if (buy === "sell" && owned - quantity >= 0) {
      orders.push({ type: buy, quantity: quantity, price: price })
      setGained(gained + (price * quantity))
      setOwned(owned - quantity)
    } else if (buy === "sell" && owned - quantity < 0) {
      alert("YOU CAN'T PLACE THIS ORDER")
      return
    }
    toggleModal()
  }

  return (
    <div className={style["god-container"]}>
      <div className={style["page-container1"]}>
        <h2>Shares Owned: {owned}</h2>
        <h2>Account: £{gained - paid}</h2>
        { orders && orders.map(order => {
          return (<div className={`${style["order"]} ${order.type === "buy" ? style["green"] : style["red"]}`}>
            <p>{order.type === "buy"? "B" : "S"}</p>
            <p>{order.quantity}</p>
            <p className={style["order-info-price"]}> £{order.price * order.quantity}</p>
          </div>)
        })}
      </div>
      <div className={`${style["page-container2"]} ${yellowBorder && style[yellowBorder]}`}>
        <Asset/><br/>
        <Price price={price} /><br/>
        <Buttons buy={buy} setBuy={setBuy}/><br/><br/>
        <h2>Quantity:</h2>
        <Quantity setQuantity={setQuantity} /><br/><br/><br/>
        <OrderButton toggleModal={toggleModal}/>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} buy={buy} quantity={quantity} price={price} handlePlaceOrder={handlePlaceOrder}/>
      </div>
    </div>
  );
}

export default App;
