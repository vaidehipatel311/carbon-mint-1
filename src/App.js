import './App.css';


import DashBoard from './Pages/DashBoard';
import Operator from './Pages/Operator';
import LandOwners from './Pages/LandOwners';
import LandParcels from './Pages/LandParcels';
import Profile from './Pages/Operator/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Landparcel from './Pages/Operator/landparcel';
import Crops from './Pages/Operator/crops';
import AddOperator from './Pages/Operator/AddOperator';
import Events from './Pages/Events';
function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard/>}/>
          <Route path='/operator' element={<Operator />} />
          <Route path='/add-operator' element={<AddOperator />} />
          <Route path='/operator/profile' element={<Profile />} />
          <Route path='/operator/profile/landparcel' element={<Landparcel />} />
          <Route path='/operator/profile/landparcel/crops' element={<Crops />} />
          <Route path='/landowners' element={<LandOwners />} />
          <Route path='/landparcels' element={<LandParcels />} />
          <Route path='/events/:id' element={<Events />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
