import { useState } from 'react'
import AddItems from './components/add/AddItems'
import ListItems from './components/list/ListItems'
import Navbar from './components/navbar/Navbar'
import OrderItem from './components/orders/OrderItem'
import Sidebar from './components/sidebar/Sidebar'
import {Routes , Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';



export default function App() {
  const url = "http://localhost:3000";
  
  return (
    
    <div className='app'>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        
        <Routes>
          <Route path='/addItem' element={<AddItems url={url}/>}/>
          <Route path='/listItem' element={<ListItems url={url}/>}/>
          <Route path='/orders' element={<OrderItem url={url}/>}/>
        </Routes>
      </div>
    </div>
    
    
  )
}
