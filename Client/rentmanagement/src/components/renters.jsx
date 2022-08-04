import React,{useState,useEffect} from 'react'
import axios from 'axios';




export default function renter(){
    
    const [renters,setRenter]=useState([]);
   
    const getAllRenters=(async()=>{
        const renterUrl="http://localhost:3002/renter/renter"
         await axios.get(renterUrl).then(async(response)=>{
            setRenter(response.data)
           console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        });
    })
    useEffect(()=>{
      getAllRenters()
    },[])

 
return(
    <div>
       <ul>
       {renters.map((renter)=>
       <li key={renter.Id}>
           {renter.Firstname}
       </li>
       )}
       </ul>
    </div>
)
      
}