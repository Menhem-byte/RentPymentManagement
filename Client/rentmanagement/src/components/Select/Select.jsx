import  React, {useState,useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectOtherProps(props) {
  const Renters=props.selected;
  console.log(props)
  const [name, setName] = useState(props.CurrentRenter);

  

  const handleChange = (event) => {
    setName(event.target.value);
    setData()
   
    console.log(name)
  };
  useEffect(()=>{
    setData()
  })
  const setData=()=>{
    console.log("the name is"+name)
    props.setFullName(name)
   
  }

 
  
  return (
    <>
    {Renters &&
    <div>
    
      <FormControl required sx={{ minWidth: 400 }}>
        <InputLabel id="demo-simple-select-required-label">Name</InputLabel>
        <Select
          
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          label="Name *"
          value={name}
          onChange={handleChange}
         
        >

          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {Renters.map((renter)=>(
          <MenuItem key={renter.Id} value={renter.Id+" "+renter.Lastname+" "+renter.Firstname}>{renter.Id+" "+renter.Lastname+" "+renter.Firstname}</MenuItem>
        ))}

        </Select>
       
        <FormHelperText>Required</FormHelperText>
      </FormControl>
    </div>
  }
  </>
  );
}
