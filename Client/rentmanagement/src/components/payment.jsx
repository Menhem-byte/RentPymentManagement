import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import {DataGrid,GridColDef,GridValueGetterParams, useGridApiRef}  from '@mui/x-data-grid'
import './payment.css'
import {insertRenter,insertPayment} from "../components/Appartments/service"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import { truncate } from 'lodash';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack'

export default function renter(){
    const [open,setOpen] =useState(false)
    const [alert,setAlert]=useState(false)
    const [selectedRows, setSelectedRows] = useState();
    const [MonthlyBilling,setMonthlyBilling]=useState()
    const [Paid,setPaid]=useState()
    const [DueDate,setDueDate]=useState()
    const [PaidDate,setPaidDate]=useState(selectedRows?.DueDate)
    const [AppartmentNumber,setAppartmentNumber]=useState()
    const [RenterName,setPaymentName]=useState()
    const [TotalPaid,setTotalPaid]=useState()
    const [Rest,setRest]=useState()
    const [RentPaid,setRentPaid]=useState(false)
    const [formData,setFormData]=useState()
    const [disableButton,setDisableButton]=useState(true)
    const [formDataEdit,setFormDataEdit]=useState({})
    const [alertMessage,setAlertMessage]=useState("")
    const [severity,setSevirity]=useState("error")
    
// useEffect(()=>{
//   EditRenter()
// },[formDataEdit])

    

    const EditRenter =(model)=>{
console.log(model)
setFormDataEdit(model)
    }
    const selectRow =(row)=>{
        console.log(row.row)
       setSelectedRows(row.row)
       setDisableButton(false)
       
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
        
      },[Paid,PaidDate])
    const dataVerify =(prev)=>{
       
       
      
        setFormData(()=>({
            Paid:Paid,PaidDate:PaidDate
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
      
        

        if(formData?.Paid && formData.PaidDate){
            selectedRows["PaidAmount"]=formData?.Paid
            selectedRows["PaidDate"]=formData?.PaidDate
            setSevirity("success")
            setAlertMessage("your payment has been added succefully")
            setAlert(true)
            console.log(selectedRows)
            insertPayment(selectedRows)
            setPaid(null)
            setPaidDate(null)

        
        }else {
            setSevirity("error")
            setAlertMessage("you have to insert payment amount and payment date")
            setAlert(true)
        }
       
        

        setTimeout(() => {
            setAlert(false);
                 }, 3000);
      
       
    //    insertRenter(formData)
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
      <TextField fullWidth label="First Name " id="Paid" margin='normal' value={selectedRows?.RenterName} type='text' variant='outlined'/>
      <br />
      <TextField fullWidth label="Appartment Number" id="Paid" margin='normal' type='text' value={selectedRows?.AppartmentNumber}  variant='outlined'/>
      <TextField fullWidth label="Monthly Billing" id="Paid" margin='normal' type='text' value={selectedRows?.MonthlyBilling} variant='outlined'/>
      <TextField fullWidth label="Payment Received"  id="Paid" margin='normal'  type='number' variant='outlined' onChange={(e)=>{changePaid(e.target.value)}}/>
      
      <TextField
        id="datetime-local"
        label="Payment Date"
        type="date"
        onChange={(e)=>{
            changePaidDate(e.target.value)
      }}
        sx={{ width: 500 ,marginTop:"15px"}}
        InputLabelProps={{
          shrink: true,
        }}
      />
      
      
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
        {alert ? <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert variant='filled' severity={severity}>{alertMessage}</Alert>
            </Stack>:<></>}
        <DataGrid 
       
        sx={{backgroundColor: 'rgba(240, 248, 255, 0.7)'}}
        rows={payment}
        getRowId={(row) => row.Id}
        columns ={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        
        editMode='row'
        // onEditRowsModelChange={EditRenter}
        // onRowEditCommit={UpdateData}
        disableSelectionOnClick={true}
        onRowClick={selectRow}
        
        
        
        
        // onSelectionModelChange={(ids) => {
        //     const selectedIDs = new Set(ids);
        //     const selectedRows = data.rows((row) =>
        //       selectedIDs.has(row.id),
        //     ); console.log(row)
           
  
        //     setSelectedRows(selectedRows);
        //   }}
       
        
        />
    </Box>
   
    {selectedRows && <Box sx={{ '& > :not(style)': { m: 3 } ,textAlign:"left",width:"20px"}}  disabled={disableButton}>
      <Fab color="primary"  aria-label="add" onClick={handleClickOpen} size="large" variant='extended'>
         payment
        <PaidRoundedIcon />
      </Fab>
    </Box>
    
}

   
    </div>
    
)
      
}