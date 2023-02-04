import React, { useState,useEffect } from 'react'
import './Appartment.css'
import { TextField ,Button,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle,
   FormGroup,Stack,FormControl,ListItemText,Checkbox,Select,OutlinedInput,MenuItem} from '@mui/material';
import Selector from '../Select/Select'
import axios from 'axios';
import {insertAppartmentRenter} from './service'
import { result } from 'lodash';


function AppartmentItem(props) {
  
 const[openModal,setOpenModal] = useState(false)
 const [renters,setRenter]=useState([]);
 const [alldata,setAllData]=useState();
 const [AppNum,setAppNum]=useState(props.text)
 const [note,setNote]=useState(props.label)
 const [fullName,setFullName]=useState()
 const [lastName,setLastName]=useState()
 const [startDate,setStartDate]=useState()
 const [leaveDate,setLeaveDate]=useState()
 const [isDisable,setDisabled]=useState(true)
 const [formData,setFormData]=useState([])
 const getAllRenters=(async()=>{
     const renterUrl="http://localhost:3002/renter/renter"
      await axios.get(renterUrl).then(async(response)=>{
         setRenter(response.data)
      
     }).catch((err)=>{
         console.log(err)
     });
 })
 useEffect(()=>{
   getAllRenters()
   
 },[])

 useEffect(()=>{  
   if(!isDisable){
      data()
   }
  


},[AppNum,leaveDate,startDate,note,renters])


const changeAppNumber =(value) =>{
   setAppNum(value)
}



const getAllData=()=>{
setAllData(props)
console.log(alldata)
}

 const handleClickOpen = () =>{
   setOpenModal(true);
   setAppNum(props.text)
   getAllData()
  
}
const handleClose =() =>{
   setOpenModal(false);
}


const data =(prev)=>{
   let firstName=null;
   let lastName =null;
   let RenterId =null;
   console.log(fullName)
   if(fullName){
       RenterId=fullName.split(' ')[0]
      firstName =fullName.split(' ')[2];
       lastName=fullName.split(' ')[1]
   }
   // setFormData(()=>({
   //    AppNum:AppNum,leaveDate:leaveDate,startDate:startDate,note:note,firstName,lastName,buildingId:props.Id,RenterId:RenterId
   // }))
   console.log(formData)
   
   insertAppartmentRenter(formData)
   getAllData()
   setDisabled(true)
  /*
   insertAppartmentRenter(formData)
   .then((result)=>{
      console.log('one row inserted')
   })
   .catch((error)=>{
      console.log(error)
   })
 */
}
const dataVerify =(prev)=>{
   setDisabled(false)
   let firstName=null;
   let lastName =null;
   let RenterId =null;
   console.log(fullName)
   if(fullName){
       RenterId=fullName.split(' ')[0]
      firstName =fullName.split(' ')[2];
       lastName=fullName.split(' ')[1]
   }
   setFormData(()=>({
      AppNum:AppNum,leaveDate:leaveDate,startDate:startDate,note:note,firstName,lastName,buildingId:props.Id,RenterId:RenterId
   }))
   console.log(formData)
  /*
   insertAppartmentRenter(formData)
   .then((result)=>{
      console.log('one row inserted')
   })
   .catch((error)=>{
      console.log(error)
   })
 */
}
  return (
   <>
   <li className='cards__item'>
    <Button  className='cards__item__link'  onClick={handleClickOpen} >
        <figure className='cards__item__pic-wrap' data-category={props.label}>
           <img src={props.image} alt='Building Image' className='cards__item__img'/>
        </figure>
           <div className="cards__item__info">
              <h5 className="cards__item__text">{props.text}</h5>
           </div>
    </Button>
   </li>
   {openModal && <div>
      <Dialog  open={openModal} onClose={handleClose} >
       <DialogTitle  >Edit Appartment</DialogTitle>
            
        <DialogContent  className='dialogContent' >
      
        <Stack component="form" noValidate spacing={3}>
        <DialogContentText>here is the text</DialogContentText>
        <TextField
         margin='dense'
         id='outlined-name'  
         label='Appartment Number'
         type='text'
         variant='outlined'
         defaultValue={AppNum}
         onChange={(e)=>{
            changeAppNumber(e.target.value)
         }}
                   />
     <Selector  selected={renters} setFullName={setFullName}  CurrentRenter={alldata.renterId+" "+alldata.lastName+" "+alldata.firstName}/>
    
      <TextField 
         label='Note'
         type='Notes'
         variant='outlined'
         defaultValue={note}
         onChange={(e)=>{
            setNote(e.target.value)
         }}
         />

      
    
      <TextField
        id="datetime-local"
        label="Start Date"
        type="date"
        defaultValue={alldata.startDate.split("T")[0]}
        onChange={(e)=>{
         setStartDate(e.target.value)
      }}
        sx={{ width: 400 }}
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        id="datetime-local"
        label="Leave Date"
        type="date"
        defaultValue={alldata.leaveDate.split("T")[0]}
        onChange={(e)=>{
         setLeaveDate(e.target.value)
      }}
        sx={{ width: 400 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    


    </Stack> 
        </DialogContent>

     <DialogActions>
        <Button onClick={handleClose}>cancel</Button>
        <Button onClick={dataVerify}>Verify</Button>
        <Button onClick={data} disabled={isDisable}>sub</Button>
     </DialogActions>
    </Dialog>
  </div>
      
      }
   
   </>
  )
}

export default AppartmentItem

