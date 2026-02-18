import { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../../assets/frontend_assets/assets';
import { StoreContext } from '../../../context/StoreContext';

export default function FoodItem({ id, name, image, price, desc }) {

    const {cartItems , addToCart , removeFromCart , url} = useContext(StoreContext);

    return (
        <div className='fooditem'>
            <div className="image">
                <img src={url + "/images/" +image} alt="food" />
            </div>
            <div className="item-count">
                {
                    !cartItems[id] ?
                    <div className='add'>
                         <img onClick={()=>addToCart(id)} className='add-white icon' src={assets.add_icon_white} alt="add" /> 
                    </div> 
                   :
                    <div className='inc-dec'>
                        <img onClick={()=>addToCart(id)} className='add-green icon' src={assets.add_icon_green} alt="add" />
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>removeFromCart(id)} className='remove icon' src={assets.remove_icon_red} alt="remove" />
                    </div>
                }
            </div>
            <div className="details">
                <div className="name-rating">
                    <p className='name'>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                </div>
                
                <p className='desc'>{desc}</p>
                <p className='price'>${price}</p>
            </div>

        </div>
    )
}
