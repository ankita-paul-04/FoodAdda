import Cart from "./components/cart/Cart"
import Home from "./components/home/Home"
import PlaceOrder from "./components/placeorder/PlaceOrder"
import Navbar from "./components/navbar/Navbar"
import './index.css'
import { Routes, Route } from 'react-router-dom'
import Footer from "./components/footer/Footer"
import { useContext, useState } from "react"
import { ToastContainer } from 'react-toastify';
import Login from "./components/loginpopup/Login"
import { StoreContext } from "./context/StoreContext"
import PaymentSuccess from "./components/payment/PaymentSuccess"
import MyOrder from "./components/myorder/MyOrder"

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <ToastContainer />
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/cart" element={<Cart setShowLogin={setShowLogin} />} /> 
          
          <Route path="/order" element={<PlaceOrder />} />

          <Route path="/payment-success" element={<PaymentSuccess/>}/>

          <Route path="/myorder" element={<MyOrder/>}/>
        </Routes>


      </div>
      <Footer />
    </>
  )
}

export default App
