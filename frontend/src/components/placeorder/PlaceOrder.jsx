import { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

export default function PlaceOrder() {
  const { getTotalOfItems, url, token, cartItems, food_list, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
    phone: "",
  })

  const onChangeHandler = (event) => {
    setData(data => ({ ...data, [event.target.name]: event.target.value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    const orderedItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderedItems.push(itemInfo)
      }
    })

    const orderData = {
      address: data,
      items: orderedItems,
      amount: getTotalOfItems() + 2
    }
    const response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      clearCart();
      navigate("/payment-success",{
        state : {order : response.data.orderDetails}
      });
      toast.success(response.data.message)
    }
    else {
      navigate("/");
      toast.error(response.data.message)
    }

  }

  useEffect(()=>{
    if(getTotalOfItems() === 0) {
      toast.info("Please add some items to procceed")
      navigate("/cart")
    }
  },[token])

  return (
    <form className='placeorder' onSubmit={placeOrder}>
      <div className="delivery-info">
        <h2>Delivery Information</h2>

        <div className="fullname">
          <input required onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='first name' />
          <input required onChange={onChangeHandler} name='lastName' value={data.lastName} type="text" placeholder='last name' />
        </div>

        <div className="email">
          <input required onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='email address' />
        </div>

        <div className="street">
          <input required onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='landmark' />
        </div>

        <div className="address">
          <input required onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='city' />
          <input required onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='state' />
        </div>

        <div className="pin-country">
          <input required onChange={onChangeHandler} name='pinCode' value={data.pinCode} type="text" placeholder='pin code' />
          <input required onChange={onChangeHandler} name='country' value={data.country} type="text" placeholder='country' />
        </div>

        <div className="phone">
          <input required onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='phone number' />
        </div>
      </div>

      <div className="bill-items">
        <h2>Cart Totals</h2>

        <div className="subtotal div">
          <p>Subtotal</p>
          <p>${getTotalOfItems()}</p>

        </div>
        <hr />

        <div className="delivery-fee div">
          <p>Delivery Fee</p>
          <p>${getTotalOfItems() === 0 ? 0 : 2}</p>

        </div>
        <hr />

        <div className="total div">
          <b>Total </b>
          <b>${getTotalOfItems() === 0 ? 0 : getTotalOfItems() + 2}</b>
        </div>

        <button >PROCEED TO PAYMENT</button>


      </div>
    </form>

  )
}
