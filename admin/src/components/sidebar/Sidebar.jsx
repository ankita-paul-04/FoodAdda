import { assets } from '../../assets/admin_assets/assets'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='sidebar'>
         
                <div className="sidebar-options">
                    <NavLink to='/addItem' className="sidebar-option">
                        <img src={assets.add_icon} alt="add" />
                        <p>Add Items</p>
                    </NavLink> 
                    <NavLink to='/listItem' className="sidebar-option">
                        <img src={assets.order_icon} alt="order" />
                        <p>List Items</p>
                    </NavLink>
                    <NavLink to='/orders' className="sidebar-option">
                        <img src={assets.order_icon} alt="order" />
                        <p>Orders</p>
                    </NavLink>
                </div>
            </div>
   
    )
}
