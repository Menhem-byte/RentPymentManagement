import React ,{useState,useEffect}from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Appartment from './AppartmentItem'


function BuildingAppartments() {
    const {id}=useParams()
    console.log({id})
    const [appartments,setAppartments]=useState([])
    const [building,setBuilding]=useState()
    const getAllAppartments=(async()=>{
        const appUrl=`http://localhost:3002/appartments/appartments?building_Id=${id}`
         await axios.get(appUrl).then(async(response)=>{
            setAppartments(response.data)
           console.log('that the data'+response.data)
        }).catch((err)=>{
            console.log(err)
        });
    })

  const getBuildingInfo=(async()=>{
    const buildingURL=`http://localhost:3002/building/building?Id=${id}`
    await axios.get(buildingURL).then(async(response)=>{
        setBuilding(response.data)
    }).catch((err)=>{
        console.log(err)
    })
  })


    useEffect(()=>{
        getAllAppartments()
        getBuildingInfo()
    },[])
    
  console.log(building)
  return (
    
    <>
    {building &&
    <div className='cards'>
    <h1>All Appartments In {building.name}</h1>
    <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
            {appartments.map((appartment)=>(
                       <Appartment  key={appartment.Id} image={appartment.Image} label={appartment.Description} text={appartment.AppNumber+appartment.Id } Id={appartment.Id}/>
             
                     ))}
            </ul>
        </div>
    </div>
 </div>
  }
 </>

  )
}

export default BuildingAppartments