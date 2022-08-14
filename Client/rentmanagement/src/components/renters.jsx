import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Box from '@mui/material/Box'
import {DataGrid,GridColDef,GridValueGetterParams}  from '@mui/x-data-grid'
import './renters.css'
import { style } from '@mui/system';


export default function renter(){
    const columns=[
        { field:'Id' ,headerName:'ID',width:90, headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Username' ,headerName:'User Name' , width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Firstname' ,headerName:'First Name' , width:150 ,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Lastname' ,headerName:'Last Name' , width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'ArearCode' ,headerName:'Area Code' , width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Phone' ,headerName:'Phone' , width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Email' ,headerName:'Email' , width:300,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'Address' ,headerName:'Address' , width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value}</div>)}},
        {field:'isActive' ,headerName:'isActive' , width:150,headerClassName: 'super-app-theme--header',renderCell:(cellValues)=>{return(<div style={{color:"black",fontSize:18}}>{cellValues.value==true?cellValues.value='true':cellValues.value='false'}</div>)}},
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
    <Box sx={{height:400,width:'100%',  '& .super-app-theme--header': {
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        />
    </Box>
    </div>
)
      
}