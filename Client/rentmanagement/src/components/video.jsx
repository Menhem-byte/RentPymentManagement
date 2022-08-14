import React from 'react'
import { Button } from './Button'
import './video.css'
import '../App.css'
import { fontWeight } from '@mui/system'
function Video() {
  return (
    <div className='hero-container'>
{/*}
   <video src='/videos/video-2.mp4' autoPlay loop muted/>
{*/}
   <h1> Appartments For Rent</h1>
   <br></br>
   <p style={{fontSize:"36px", fontWeight:"bold"}}>What are you waiting for ??</p>
   <br></br>
   <p style={{fontSize:"32px", fontWeight:"bold"}}>start renting with us??</p>
   <br>
   </br>
   <div>
    <Button className='btns' 
    buttonStyle='btn--outline'
    buttonSize='btn--large'
    >
        Get Started
    </Button>
    <Button className='btns' 
    buttonStyle='btn--primary'
    buttonSize='btn--large'
    >
       Watch Trailer 
      
    </Button>
   </div>
    </div>
  )
}

export default Video