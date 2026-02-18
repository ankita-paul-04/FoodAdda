import { useState } from 'react'
import './OrderItem.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { assets } from '../../../../frontend/src/assets/frontend_assets/assets'

export default function OrderItem({ url }) {
  const [userOrder, setUserOrder] = useState([])

  const fetchAllOrder = async () => {
    const response = await axios.get(url + "/api/order/admin/allOrders")

    if (response.data.success) {
      setUserOrder(response.data.allUserOrders);
      console.log(response.data.allUserOrders);
    }
    else {
      toast.error(response.data.message)
    }
  }

  const changeOrderStatus = async (event , orderID) => {
    const status = event.target.value;
    const response = await axios.post(url+"/api/order/status" , {orderID , status});

    if(response.data.success){
      await fetchAllOrder();
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, [])

  return (
    <div className='orderitem'>
      <h1>All Orders</h1>
      <div className="order-box">
        {
          userOrder.map((order, idx) => (
            <div key={idx} className="userorder-item">
              <img src={assets.parcel_icon} alt="" />
              <div className="user-details">
                <p className='user-items'>
                  {
                    order.items.map((item, idx) => {
                      if (idx === order.items.length - 1) {
                        return item.name + " - " + item.quantity
                      }
                      else {
                        return item.name + " - " + item.quantity + ", "
                      }
                    })
                  }
                </p>
                <p>{order.address.firstName + " " + order.address.lastName}  </p>
                <p>{order.address.street + ", " + order.address.city}  </p>
                <p>{order.address.state + ", " + order.address.country + ", " + order.address.pinCode}  </p>
                <p>{order.address.phone }  </p>

              
              </div>


              <p>Total Amount : ${order.amount}</p>
              <p>Items : {order.items.length}</p>
              <select name="status" onChange={(event) => changeOrderStatus(event , order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>

            </div>
          ))
        }

      </div>
    </div>
  )
}
