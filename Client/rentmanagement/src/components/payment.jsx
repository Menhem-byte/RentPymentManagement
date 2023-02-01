import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import {DataGrid,GridColDef,GridValueGetterParams, useGridApiRef}  from '@mui/x-data-grid'
import './payment.css'
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
    const [MonthlyBilling,setMonthlyBilling]=useState()
    const [Paid,setPaid]=useState()
    const [DueDate,setDueDate]=useState()
    const [PaidDate,setPaidDate]=useState()
    const [AppartmentNumber,setAppartmentNumber]=useState()
    const [RenterName,setPaymentName]=useState()
    const [TotalPaid,setTotalPaid]=useState()
    const [Rest,setRest]=useState()
    const [RentPaid,setRentPaid]=useState(false)
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
    const changeMonthlyBilling=(value)=>{
    setMonthlyBilling(value)
    }
      const changePaid=(value)=>{
        setPaid(value)
        console.log(Paid)
            }
            const changeDueDate=(value)=>{
                setDueDate(value)
                    }
                    const changePaidDate=(value)=>{
                        setPaidDate(value)
                            }
                            const changeAppartmentNumber=(value)=>{
                                setAppartmentNumber(value)
                                    }

                                    const isRentPaid=(value)=>{
                                     setRentPaid(value)
                                        
                                            }
                            
    const handleClose=()=>{
        
       setOpen(false)
    }

    const handleAdd=()=>{
        data()
        setOpen(false)
    }

    useEffect(()=>{
        dataVerify()
        
      },[AppartmentNumber,Paid,DueDate,PaidDate,MonthlyBilling,RentPaid])
    const dataVerify =(prev)=>{
       
       

      
        setFormData(()=>({
            Paid:Paid,DueDate:DueDate,PaidDate:PaidDate,MonthlyBilling:MonthlyBilling,AppartmentNumber:AppartmentNumber,isRentPaid:RentPaid
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
        {field:'AppartmentNumber' ,headerName:'AppartmentNumber' , width:300,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'RenterName' ,headerName:'Renter Name' ,editable:true, width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'MonthlyBilling' ,headerName:'MonthlyBilling' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'DueDate' ,headerName:'Due Date' ,editable:true, width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Paid' ,headerName:'Amount Paid' ,editable:true, width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'PaidDate' ,headerName:'PaidDate' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'TotalPaid' ,headerName:'Total Paid' ,editable:true, width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Rest' ,headerName:'Amount Due' ,editable:true, width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'RentPaid' ,headerName:'Rent Paid' , width:150,editable:true,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value==true?cellValues.value='true':cellValues.value='false'}</div>)}},
       ]
    const [payment,setPayment]=useState([]);
   
    const getAllpayment=(async()=>{
        const renterUrl="http://localhost:3002/payment/payment"
         await axios.get(renterUrl).then(async(response)=>{
            setPayment(response.data)
           console.log(response.data)
        }).catch((err)=>{
            console.log(err)
        });
    })
    useEffect(()=>{
      getAllpayment()
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
      <TextField fullWidth label="First Name " id="Paid" margin='normal' type='text' variant='outlined' onChange={(e)=>{changePaid(e.target.value)}}/>
      <br />
      
      <TextField fullWidth label="Last Name " id="Paid" margin='normal'  type='text' variant='outlined' onChange={(e)=>{changeDueDate(e.target.value)}}/>
      <TextField fullWidth label="AppartmentNumber" id="Paid" margin='normal' type='text' variant='outlined' onChange={(e)=>{changeAppartmentNumber(e.target.value)}}/>
      <TextField fullWidth label="MonthlyBilling" id="Paid" margin='normal' type='text' variant='outlined' onChange={(e)=>{changeMonthlyBilling(e.target.value)}} />
      <TextField fullWidth label="PaidDate " id="Paid" margin='normal'  type='text' variant='outlined' onChange={(e)=>{changePaidDate(e.target.value)}}/>
      <span>is RentPaid <Checkbox  label= " isRentPaid " id='isRentPaid' onChange={(e)=>{isRentPaid(e.target.checked)}} /></span>
      
    </Box>
   
    </DialogContentText>
</DialogContent>


<DialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <Button onClick={handleAdd}>Add</Button>
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
        rows={payment}
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