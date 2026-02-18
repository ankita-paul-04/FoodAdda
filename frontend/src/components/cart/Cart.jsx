import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Cart({ setShowLogin }) {

  const { cartItems, food_list, removeFromCart, getTotalOfItems, url, token } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-container">
        <div className="cart-items cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div>
                  <div className="cart-items-item cart-items-title">
                    <img src={url + "/images/" + item.image} alt="img" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>

                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>

      <div className="bottom-cart">
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

          <button onClick={() => {
            if(!token) {
              toast.info("Please login to continue checkout")
              localStorage.setItem("redirectAfterLogin" , "/order")
              setShowLogin(true)
            }else{
              navigate('/order')
            }
          }} >PROCEED TO CHECKOUT</button>

        </div>



        <div className="promo-code">
          <p>If you have a promo code, enter it here</p>
          <div>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
