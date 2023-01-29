import React ,{useState,useEffect}from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Appartment from './AppartmentItem'
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'
import {insertAppartment,uploadImage} from "../Appartments/service"
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import UploadImage from "./uploadImage"

function BuildingAppartments() {
    const [open,setOpen] =useState(false)
    const [alert,setAlert]=useState(false)
    const [passToParent,setPassToParent]=useState(null)
    const {id}=useParams()
    // let formData = new FormData()

    const [inputs,setInputs]=useState({BuildingId:id,AppNumber:"",Description:""})
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

//  useEffect(()=>{
// handleSubmit()
//  },[passToParent])

    useEffect(()=>{
        getAllAppartments()
        getBuildingInfo()
    },[])
    const handleClickOpen=()=>{
        
        setOpen(true)
    }
    const handleClose=()=>{
        setInputs({BuildingId:id,AppNumber:"",Description:""})
        setOpen(false)
    }

    const handleChange=(e)=>{
setInputs((prevState)=>({
    ...prevState,[e.target.name]:e.target.value
}))
    }

    const handleSubmit=async(e)=>{
       let insertImage={}
         insertAppartment(inputs)
        setAlert(true)
        let reader = new FileReader()
        reader.readAsDataURL(passToParent)
        reader.onload=async()=>{
            insertImage["Image"]=reader.result
            insertImage["AppNum"]=inputs.AppNumber
             uploadImage(insertImage)
        }
    
    
    
      
    //    let image=await onFileUpload()
    //     inputs["file"]=image

    //     console.log(inputs)
         
        
    //    console.log(formData)
     
    //    
        
        setTimeout(() => {
            setAlert(false);
                 }, 3000);
        handleClose()
       
    }

    

    const getFromChild=(data)=>{
        setPassToParent(data)
    }

 
  return (
    
    <>
   
   
    {building &&
    <div className='cards'>
   {alert ? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="success">One appartment has been added</Alert>
            </Stack>:<></>}
    <h1>All Appartments In {building.name}</h1>
   
    <div className="cards__container">
        <div className="cards__wrapper">
            <ul className="cards__items">
               
            {appartments.map((appartment)=>(
                       <Appartment  key={appartment.Id} image={appartment.Image} label={appartment.Description}
                        text={appartment.AppNumber} Id={appartment.Id} startDate={appartment.RentDate}
                        leaveDate={appartment.LeaveDate} firstName={appartment.Firstname}  lastName={appartment.Lastname} renterId={appartment.renterId}
                        />
             
                     ))}
            </ul>
        </div>
    </div>
    
    <Box sx={{ '& > :not(style)': { m: 3 } }}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        
        <AddIcon />
      </Fab>
    </Box>

    <Dialog open={open} onClose={handleClose}>
<DialogTitle>
    Add Appartment
    
</DialogTitle>

<DialogContentText>
<form onSubmit={handleSubmit}>
<Box
      sx={{
        width: 500,
        maxWidth: '100%',
        margin:5,
      }}
    >
    <TextField fullWidth label="App Number" name="AppNumber" id="AppNumber" value={inputs.AppNumber} margin='normal' type='text' variant='outlined' onChange={handleChange}/>
      <br />
      <TextField fullWidth label="BuildingId" name="BuildingId" id="BuildingId" value={inputs.BuildingId} margin='normal' type='text' variant='outlined' onChange={handleChange}/>
      <TextField fullWidth label="Description" name="Description" value={inputs.Description} id="Description" margin='normal'  type='text' variant='outlined' onChange={handleChange} />
    <UploadImage sendToParent={getFromChild}/>
     <Button type='submit'>Submit</Button>
     <Button  onClick={handleClose}>Cancel</Button>
      </Box>
    
</form>




</DialogContentText>
</Dialog>


 </div>
 
  }
 </>

  )
}

export default BuildingAppartments