import { useContext } from 'react'
import './MyOrder.css'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
import { useState } from 'react';
import { useEffect } from 'react';
import { assets } from '../../assets/frontend_assets/assets';

export default function MyOrder() {
    const { url, token } = useContext(StoreContext);
    const [myOrders, setMyOrders] = useState([]);

    const fetchOrder = async () => {
        const response = await axios.post(url + "/api/order/show", {}, { headers: { token } });

        setMyOrders(response.data.orders);
        console.log(response.data.orders);

    }

    useEffect(() => {
        if (token) {
            fetchOrder();
        }

    }, [token])

    return (
        <div className='userorder'>
            <h1>My Order</h1>

            <div className="userorder-box">
                {
                    myOrders.map((order, idx) => (
                        <div key={idx} className="userorder-item">
                            <img src={assets.parcel_icon} alt="" />

                            <p>
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

                            <p>Total Amount : ${order.amount}</p>
                            <p>Items : {order.items.length}</p>
                            <p><span>&#x25cf;</span> <b>{order.status}</b></p>

                            <button className='track-order' onClick={fetchOrder}>Track Order</button>

                        </div>
                    ))
                }

            </div>

        </div>
    )
}
