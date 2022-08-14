import axios from 'axios'
import React ,{useState,useEffect} from 'react'
import Building from './BuildingItem'
import './Buildings.css'


function Buildings() {
 const [buildings,setBuilding] =useState([])
 const getAllBuildings=(async()=>{
    const buildingUrl="http://localhost:3002/building/building"
    await axios.get(buildingUrl).then(async(response)=>{
        setBuilding(response.data)
        
    })
    .catch((err)=>{
        console.log(err)
    })
 })


useEffect(()=>{
    getAllBuildings()
},[])
const buildings1=buildings

  return (
    <>
    {buildings &&
   <div className='cards'>
   <h1>Building </h1>
   <div className="cards__container">
       <div className="cards__wrapper">
           <ul className="cards__items">
           {buildings1.map((building)=>(
                      <Building key={building.Id} image={building.Image} label={building.name} text={building.location} Id={building.Id}/>
            
                    ))}
           </ul>
       </div>
   </div>
</div>
}
</>

  )
}

export default Buildings