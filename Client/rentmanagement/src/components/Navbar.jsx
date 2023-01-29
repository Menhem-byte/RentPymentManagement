import React ,{useState,useEffect}from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
import ('./Navbar.css')
import { Button } from './Button'
function Navbar() {
    const [click,setClick] =useState(false)
    const [button,setButton]=useState(true)
    //function to close and open the open
    const menuClick=()=> setClick(!click)
    //function to close the menu
    const closeMobileMenu =()=>setClick(false)

    const showButton=()=>{
        if(window.innerWidth<=960){
            setButton(false)
        }
        else{
            setButton(true)
        }
    }
useEffect(()=>{
    showButton()
},[])
    window.addEventListener('resize',showButton)
    
  return (
  <>
  <nav className="navbar">
    <div className="navbar-container">
    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>Property<FontAwesomeIcon icon={solid('building-shield')}  className='fab fa-typo3' /></Link>
    <div className='menu-icon' onClick={menuClick}>
          <FontAwesomeIcon   icon={ click ? solid('xmark') : solid('bars')} color='white'/>
    </div>
     <ul className={click ? 'nav-menu active' : 'nav-menu'}>
     <li className='nav-item'>
     <Link to="/"  onClick={closeMobileMenu} className='nav-links'><FontAwesomeIcon icon={solid('house')} className='fab fa-typo3' />Home</Link>
     </li>
     <li className='nav-item'>
     <Link to="/renters" onClick={closeMobileMenu} className='nav-links'> <FontAwesomeIcon icon={solid('users')} className='fab fa-typo3' /> renters</Link>
     </li>
     <li className='nav-item'>
     <Link to="/payment" onClick={closeMobileMenu} className='nav-links'><FontAwesomeIcon icon={solid('user-tag')}  className='fab fa-typo3' />Payments</Link>
     </li>
    </ul>

         {button && <Button buttonStyle={'btn--outline'}>Sign Up</Button>}

    </div>
  </nav>
  </>
  )
}

export default Navbar