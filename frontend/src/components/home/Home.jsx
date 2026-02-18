import { useState } from 'react';
import ExploreMenu from './exploremenu/ExploreMenu';
import Header from './header/Header';
import './Home.css';
import DisplayFood from './displayfood/DisplayFood';

export default function Home() {
  const [category , setCategory] = useState("all");

  return (
    <div className='home'>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <DisplayFood category={category}/>
    </div>
  )
}
