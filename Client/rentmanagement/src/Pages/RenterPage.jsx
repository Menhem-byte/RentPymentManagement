import React from 'react'
import Renter from '../components/renter'
import {useNavigate,useParams} from 'react-router-dom'
function renterPage() {
    let navigate =useNavigate()
    let {username}=useParams()
  return (
    <div>
        <Renter username={username}/>
        <button onClick={()=>{navigate('/')}}>Return to Home page</button>
    </div>
  )
}

export default renterPage