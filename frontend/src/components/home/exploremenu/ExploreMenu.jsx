import './ExploreMenu.css';
import { menu_list } from '../../../assets/frontend_assets/assets';

export default function ExploreMenu({category,setCategory}) {
  return (
    <div className='exploremenu' id='menu'>
      <div className="heading">
        <h1>Explore our menu</h1>
      </div>

      <div className="description">
        <p>From spicy street food to premium meals — Food Adda delivers the best flavors straight to your home.</p>
      </div>

      <div className="menu-list">
        {
           menu_list.map((item , idx) => (
           
                <div onClick={()=>setCategory(prev=> prev === item.menu_name ? "all" : item.menu_name)} key={idx} className='menu-list-item'>
                    <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="menu" />
                    <p>{item.menu_name}</p>
                </div>
           
           ))
        }
      </div>

      <hr />
    </div>
  )
}
