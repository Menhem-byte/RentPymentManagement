import React from 'react'
import Payment from '../components/payment'
import {useNavigate} from 'react-router-dom'
function RentersPage() {
    let navigate=useNavigate()
  return (
    <>
     <Payment />
     <button onClick={()=>{navigate('/')}}>Return to Home page</button>
  
  </>
 
  )
}

export default RentersPage