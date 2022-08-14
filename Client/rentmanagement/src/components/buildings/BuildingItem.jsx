import React from 'react'
import {Link} from 'react-router-dom'
import './Buildings.css'
import BuildingAppartments from '../../Pages/BuildingAppartments'
function BuildingItem(props) {
  return (
   <>
   <li className='cards__item'>
      {/*need to be changed the link*/}
    <Link  className='cards__item__link' to={`/building/${props.Id}`} >
        <figure className='cards__item__pic-wrap' data-category={props.label}>
           <img src={props.image} alt='Appartment Image' className='cards__item__img'/>
        </figure>
           <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
             
           </div>
    </Link>
   </li>
   
   </>
  )
}

export default BuildingItem

