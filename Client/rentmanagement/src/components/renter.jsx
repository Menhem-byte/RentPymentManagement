import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import {DataGrid,GridColDef,GridValueGetterParams}  from '@mui/x-data-grid'



export default function renter(props){
   const columns=[
    { field:'id' ,headerName:'ID',width:90 },
    {field:'Username' ,headerName:'User Name' , width:150},
    {field:'Firstname' ,headerName:'First Name' , width:150},
    {field:'Lastname' ,headerName:'Last Name' , width:150},
    {field:'ArearCode' ,headerName:'Area Code' , width:150},
    {field:'Phone' ,headerName:'Phone' , width:150},
    {field:'Email' ,headerName:'Email' , width:150},
    {field:'Address' ,headerName:'Address' , width:150},
    {field:'isActive' ,headerName:'isActive' , width:150},
   ]
    
    const [renter,setRenter]=useState([]);
   
    const getAllRenters=(async()=>{
        const renterUrl=`http://localhost:3002/renter/renter?name=${props.username}`
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
    <>
   
    <Box sx={{height:400,width:'100%'}}>
        
        <DataGrid 
        rows={renter}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        />
    </Box>
   
    </>
)
      
}