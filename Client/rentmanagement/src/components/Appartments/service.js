import axios from 'axios';

const APIURL= 'http://localhost:3002'

export  const insertAppartmentRenter = async(data) =>{

    try{
    const resp= await axios.put(`${APIURL}/appartments/updateAppartment`,{data})
      
      console.log(resp)
    }
    catch(error){
        console.log(error)
    }
}

export  const insertRenter = async(data) =>{

  try{
  const resp= await axios.post(`${APIURL}/renter/insertRenter`,{data})
    
    console.log(resp)
  }
  catch(error){
      console.log(error)
  }
}

export  const insertAppartment = async(data) =>{

  try{
  const resp= await axios.post(`${APIURL}/appartments/insertAppartment`,{data})
    
    console.log(resp)
  }
  catch(error){
      console.log(error)
  }
}