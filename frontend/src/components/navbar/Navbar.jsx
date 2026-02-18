import { useContext, useState } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { toast } from 'react-toastify';


const Navbar = ({ showLogin, setShowLogin }) => {

  const [menus, setMenus] = useState("home");
  const { getTotalOfItems, token , setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = async() => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast.success("Succesfully loged out user");
  }


  return (
    <div className='navbar'>
      <img src={assets.logo} alt="logo" className='logo' />

      <div className="nav-menu">
        <ul>
          <Link to="/" onClick={() => setMenus("Home")} className={menus === 'Home' ? "active" : ""}>Home</Link>
          {/* <Link to="/cart" onClick={()=>setMenus("Cart")} className={menus === 'Cart' ? "active" : ""}>Cart</Link> */}
          <a href='#menu' onClick={() => setMenus("Menu")} className={menus === 'Menu' ? "active" : ""}>Menu</a>
          {/* <a href='' onClick={()=>setMenus("Mobile-app")} className={menus === 'Mobile-app' ? "active" : ""}>Mobile-app</a> */}
          <a href='#contact' onClick={() => setMenus("Contact us")} className={menus === 'Contact us' ? "active" : ""}>Contact us</a>
        </ul>
      </div>

      <div className="right-menu">
        <div className="search">
          <img src={assets.search_icon} alt="search-icon" className='search-icon' />
        </div>
        <div className="carts">
          <Link to='/cart'><img src={assets.basket_icon} alt="cart" className='cart-icon' /></Link> 
          <div className={getTotalOfItems() > 0 ? "dot" : ""}></div>
        </div>

        {!token ?
          <button onClick={() => setShowLogin(!showLogin)}>Sign In</button> : 
          <div className="logedin-user">
            <img src={assets.profile_icon} alt="profile" />
            <div className="logout-order">
     
              <div className="order" onClick={()=>navigate("/myorder")}>
                <img src={assets.bag_icon} alt="" />
                <p>Order</p>
              </div>

              <hr />

               <div className="logout" onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Log out</p>
              </div>
              
            </div>
          </div>
        }

      </div>
    </div>
  )
}

export default Navbar
