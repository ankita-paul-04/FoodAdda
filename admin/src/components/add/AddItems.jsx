import './AddItems.css'
import { assets } from '../../assets/admin_assets/assets'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

export default function AddItems({ url }) {

  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Salad",
    price: "",
  })

  const handleDataEntry = (e) => {
    setData((currData) => ({ ...currData, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/foods/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(formData.get("name"));

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        category: "Salad",
        price: "",
      })
      setImage(false);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }

    navigate("/listItem");

  }



  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="flex-col add-item-img">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
            <input type="file" id='image' onChange={(e) => setImage(e.target.files[0])} hidden required />
          </label>
        </div>

        <div className="flex-col add-item-name">
          <p>Product name</p>
          <input type="text" name='name' onChange={handleDataEntry} value={data.name} placeholder='enter name' required />
        </div>

        <div className="flex-col add-item-desc">
          <p>Product description</p>
          <textarea name="description" rows={6} onChange={handleDataEntry} value={data.description} placeholder='enter description' required></textarea>
        </div>

        <div className="flex-col add-item-category-price">
          <div className="add-item-category">
            <p>Product category</p>
            <select name="category" onChange={handleDataEntry} required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Deserts">Deserts</option>
              <option value="Cake">Cake</option>
              <option value="Pure veg">Pure veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-item-price">
            <p>Product price</p>
            <input type="number" name='price' onChange={handleDataEntry} value={data.price} placeholder='$20' required />
          </div>
        </div>

        <button className='add-btn'>ADD</button>
      </form>
    </div>
  )
}
