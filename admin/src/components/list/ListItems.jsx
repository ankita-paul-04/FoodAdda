import { useEffect, useState } from 'react'
import './ListItems.css'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function ListItems({url}) {

  const [lists, setLists] = useState([]);

  const showFoodList = async () => {
    const response = await axios.get(`${url}/api/foods/show`);

    if (response.data.success) {
      console.log(response.data.data);
      setLists(response.data.data);
    }
    else {
      toast.error("Can not be fetched food list ")
    }
  }

  const removeFoodItem = async(foodID) => {
    const response = await axios.post(`${url}/api/foods/remove` , {_id : foodID});

    if(response.data.success) {
      toast.success(response.data.message)
    }
    else {
      toast.error(response.data.message)
    }

    showFoodList();    
  }

  useEffect(() => {
    showFoodList();
  }, [])

  return (
    <div className='list '>
      <h1>All Foods List</h1>
      <div className="list-container">
        <div className="list-title ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        <div className="list-items">
          {
            lists.map((item, idx) => {
              return (
                <div key={idx}>
                  <img src={`${url}/images/` + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>${item.price}</p>
                  <p onClick={() => removeFoodItem(item._id)} className='remove'>x</p>
                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  )
}
