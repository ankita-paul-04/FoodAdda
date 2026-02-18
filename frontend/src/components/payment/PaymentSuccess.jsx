import { useLocation, useNavigate } from "react-router-dom";
import './PaymentSuccess.css'

export default function PaymentSuccess() {

  const navigate = useNavigate();
  const location = useLocation();
  const { order } = location.state || {};

  if (!order) {
    return <h2>No order found</h2>;
  }

  return (
    <div className="payment-success">
      <h1>🎉 Payment Successful</h1>

      <div className="payment-success-container">
        <div className="order-id">
          <h3>Order ID: {order._id}</h3>
          <p>Total Paid: ${order.amount}</p>
        </div>

        <div className="address">
          <h3>Delivery Address</h3>
          <p>
            {order.address.firstName} {order.address.lastName}<br />
            {order.address.street}, {order.address.city}<br />
            {order.address.state} - {order.address.pinCode}<br />
            {order.address.country}
          </p>
        </div>
        
        <div className="items">
          <h3>Items</h3>
          {
            order.items.map((item, i) => (
              <p key={i}>
                {item.name} × {item.quantity} = ${item.price * item.quantity}
              </p>
            ))
          }
        </div>
      </div>

      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
}
