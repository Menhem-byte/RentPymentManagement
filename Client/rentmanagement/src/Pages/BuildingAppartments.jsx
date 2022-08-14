import React ,{useState,useEffect}from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Appartments from '../components/Appartments/Appartments'

function BuildingAppartments() {
return(
    <Appartments/>
)
}

export default BuildingAppartments