import { useContext } from 'react'
import './DisplayFood.css'
import FoodItem from './FoodItem'
import { StoreContext } from '../../../context/StoreContext'

export default function DisplayFood({ category }) {

    const { food_list } = useContext(StoreContext);

    return (
        <div className='displayfood'>

            <h2>Top dishes near you</h2>
            <div className="allfood">
                
                {
                   
                    food_list.map((item, idx) => {
                        if (category === "all" || category === item.category ) {
                           return <FoodItem key={idx} id={item._id} name={item.name} image={item.image} price={item.price} desc={item.description} />
                        }
                    })

                }

            </div>

        </div>
    )
}
