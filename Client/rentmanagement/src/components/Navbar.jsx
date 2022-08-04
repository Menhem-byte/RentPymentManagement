import React ,{useState}from 'react'
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'
function Navbar() {
  return (
  <>
  <nav className="navbar">
    <div className="navbar-container">
        <Link to="/" className="navbar-logo">TRVL<FontAwesomeIcon icon={solid('user-secret')} /></Link>
      
    <Link to="/renters">renters</Link>
    <Link to="/renter">renter</Link>
    </div>
  </nav>
  </>
  )
}

export default Navbar