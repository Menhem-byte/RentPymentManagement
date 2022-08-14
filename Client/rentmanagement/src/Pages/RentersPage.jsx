import React from 'react'
import Renters from '../components/renters'
import {useNavigate} from 'react-router-dom'
function RentersPage() {
    let navigate=useNavigate()
  return (
    <>
     <Renters/>
     <button onClick={()=>{navigate('/')}}>Return to Home page</button>
  
  </>
 
  )
}

export default RentersPage