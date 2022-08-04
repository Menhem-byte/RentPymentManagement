import Renters from './Pages/RentersPage'
import Home from './Pages/HomePage'
import Renter from './Pages/RenterPage'
import ErrorPage from './Pages/errorPage'
import {BrowserRouter as Router,Routes,Route,Link,} from 'react-router-dom'
function App() {
  return (
  <Router>
    <Link to="/">Home</Link>
    <Link to="/renters">renters</Link>
    <Link to="/renter">renter</Link>
    <Routes>
      <Route path="/"  element={<Home/>}/>
      <Route path="/renters"  element={<Renters/>}/>
      <Route path="/renter/:username"  element={<Renter/>}/>
      <Route path="*"  element={<ErrorPage/>}/>

    </Routes>
  </Router>
  )
}

export default App;
