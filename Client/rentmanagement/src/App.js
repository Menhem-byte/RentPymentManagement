import Renters from './Pages/RentersPage'
import Home from './Pages/HomePage'
import Renter from './Pages/RenterPage'
import ErrorPage from './Pages/errorPage'
import Navbar from './components/Navbar'
import BuildingAppartments from './Pages/BuildingAppartments'
import './App.css'
import {BrowserRouter as Router,Routes,Route,Link,} from 'react-router-dom'
function App() {
  return (
  <Router>
         <Navbar />
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/renters"  element={<Renters/>}/>
      <Route path="/renter/:username"  element={<Renter/>}/>
      <Route path="/building/:id"  element={<BuildingAppartments/>}/>
      <Route path="*"  element={<ErrorPage/>}/>

    </Routes>
  </Router>
  )
}

export default App;
