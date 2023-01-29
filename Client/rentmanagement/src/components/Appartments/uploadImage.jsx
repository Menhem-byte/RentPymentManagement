import React,{useState} from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import {useForm} from "react-hook-form"
import { useEffect } from 'react';

function UploadButtons(props){
    // const {register,handleSubmit}=useForm()
    const [selectedFile,setSelectedFile]=useState();
    const [selected,setSelected]=useState(false);
useEffect(()=>{
finaldata(selectedFile)
},[selectedFile])

const changeHandler=(event)=>{
    setSelected(true)
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
    console.log(event.target)
    // setSelectedFile(file)
    // const data = new FormData()
    
    //  data.append('file',selectedFile)
 
   
 
  
}

const finaldata=(selectedFile)=>{
    
    if(selectedFile){
        console.log("file is selected")
        props.sendToParent(selectedFile)
    }
   
}

  return (
 
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button  variant="contained" component="label" >
        Upload
        <input   hidden accept="image/*" name='file' type="file" onChange={changeHandler}/>
      </Button>
  
    </Stack>
   
  );
}

export default UploadButtons