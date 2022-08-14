import React from 'react'
import {Link} from 'react-router-dom'
import './Appartment.css'
import BuildingAppartments from '../../Pages/BuildingAppartments'
function AppartmentItem(props) {
  return (
   <>
   <li className='cards__item'>
    <Link  className='cards__item__link' to={`/building/${props.Id}`} >
        <figure className='cards__item__pic-wrap' data-category={props.label}>
           <img src={props.image} alt='Building Image' className='cards__item__img'/>
        </figure>
           <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
             
           </div>
    </Link>
   </li>
   
   </>
  )
}

export default AppartmentItem

