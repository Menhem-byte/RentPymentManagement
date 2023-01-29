import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import {DataGrid,GridColDef,GridValueGetterParams, useGridApiRef}  from '@mui/x-data-grid'
import './renters.css'
import {insertRenter,updateRenter} from "../components/Appartments/service"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';

export default function renter(){
    const [open,setOpen] =useState(false)
    const [address,setAddress]=useState()
     const [firstname,setFirstName]=useState()
    const [lastname,setLastName]=useState()
    const [phone,setPhone]=useState()
    const [email,setEmail]=useState()
    const [active,setActive]=useState(false)
    const [formData,setFormData]=useState()
    const [formDataEdit,setFormDataEdit]=useState({})
// useEffect(()=>{
//   EditRenter()
// },[formDataEdit])

    const EditRenter =(model)=>{
console.log(model)
setFormDataEdit(model)
    }

    const UpdateData=()=>{
      console.log("here")
      console.log(formDataEdit)
      updateRenter(formDataEdit)
    }

    const handleClickOpen=()=>{
        setOpen(true)
    }
    const changeAddress=(value)=>{
    setAddress(value)
    }
      const changeFirstName=(value)=>{
        setFirstName(value)
        console.log(firstname)
            }
            const changeLastName=(value)=>{
                setLastName(value)
                    }
                    const changePhone=(value)=>{
                        setPhone(value)
                            }
                            const changeEmail=(value)=>{
                                setEmail(value)
                                    }

                                    const isActive=(value)=>{
                                     setActive(value)
                                        
                                            }
                            
    const handleClose=()=>{
        data()
        setOpen(false)
    }

    useEffect(()=>{
        dataVerify()
        
      },[email,firstname,lastname,phone,address,active])
    const dataVerify =(prev)=>{
       
       

      
        setFormData(()=>({
            Firstname:firstname,Lastname:lastname,Phone:phone,Address:address,Email:email,isActive:active
        }))
       
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
     const data =(prev)=>{
       
       

      
       
       insertRenter(formData)
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
    const columns=[
        {field:'Id' ,headerName:'ID',width:90,  headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Username' ,headerName:'User Name' ,editable:true, width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Firstname' ,headerName:'First Name' ,editable:true, width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Lastname' ,headerName:'Last Name' ,editable:true, width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'ArearCode' ,headerName:'Area Code' ,editable:true, width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Phone' ,headerName:'Phone' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Email' ,headerName:'Email' , width:300,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Address' ,headerName:'Address' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'isActive' ,headerName:'isActive' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value==true?cellValues.value='true':cellValues.value='false'}</div>)}},
       ]
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
  
    <div className='container'>
       
       <Dialog open={open} onClose={handleClose}>
<DialogTitle>
    Add Renter
</DialogTitle>

<DialogContent>
    <DialogContentText>
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        margin:5,
      }}
    >
      <TextField fullWidth label="First Name " id="firstname" margin='normal' type='text' variant='outlined' onChange={(e)=>{changeFirstName(e.target.value)}}/>
      <br />
      
      <TextField fullWidth label="Last Name " id="firstname" margin='normal'  type='text' variant='outlined' onChange={(e)=>{changeLastName(e.target.value)}}/>
      <TextField fullWidth label="Email" id="firstname" margin='normal' type='text' variant='outlined' onChange={(e)=>{changeEmail(e.target.value)}}/>
      <TextField fullWidth label="Address" id="firstname" margin='normal' type='text' variant='outlined' onChange={(e)=>{changeAddress(e.target.value)}} />
      <TextField fullWidth label="Phone " id="firstname" margin='normal'  type='text' variant='outlined' onChange={(e)=>{changePhone(e.target.value)}}/>
      <span>is Active <Checkbox  label= " isActive " id='isActive' onChange={(e)=>{isActive(e.target.checked)}} /></span>
      
    </Box>
   
    </DialogContentText>
</DialogContent>


<DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleClose}>Add</Button>
</DialogActions>
       </Dialog>
    <Box sx={{height:700,width:'100%',  '& .super-app-theme--header': {
        backgroundColor: 'rgba(79,139,192,0.5)',
        fontSize:20,
        fontFamily:"Times New Roman",
        fontWeight:"bold"
      },}}>
        <DataGrid 
        sx={{backgroundColor: 'rgba(240, 248, 255, 0.7)'}}
        rows={renters}
        getRowId={(row) => row.Id}
        columns ={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        editMode='row'
        onEditRowsModelChange={EditRenter}
        onRowEditCommit={UpdateData}
        disableSelectionOnClick
        />
    </Box>
   
    <Box sx={{ '& > :not(style)': { m: 3 } ,textAlign:"left"}}>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        
        <AddIcon />
      </Fab>
    </Box>
   
    </div>
    
)
      
}