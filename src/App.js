import './App.css';
import DashBoard from './Pages/DashBoard';
import Operator from './Pages/Operator';
import LandOwners from './Pages/LandOwners';
import LandParcels from './Pages/LandParcels';
import OperatorProfile from './Pages/Operator/Profile';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Landparcel from './Pages/Operator/landparcel';
import Crops from './Pages/Operator/crops';
import AddOperator from './Pages/Operator/AddOperator';
import Events from './Pages/Events';
import EventDescription from './Pages/Events/EventDescription';
import AddEvent from './Pages/Events/AddEvent';
import OwnerProfile from './Pages/LandOwners/Profile';
import ParcelProfile from './Pages/LandParcels/Profile';
import AddLandOwner from './Pages/LandOwners/AddLandOwner';
import AddLandParcel from './Pages/LandParcels/AddLandParcel';
import AddLandparcel from './Pages/Operator/AddLandparcel'
import AddCrop from './Pages/Operator/AddCrop';
import { AuthProvider } from './AuthProvider';
function App() {

  
  return (
    <div className="App">
      <AuthProvider>

      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/dashboard" element={<DashBoard />} />

          <Route path='/landowners' element={<LandOwners />} />
          <Route path='/landowners/add-landowner/:addLandownerId' element={<AddLandOwner />} />
          <Route path='/landowners/:id' element={<OwnerProfile />} />

          <Route path='/landparcels' element={<LandParcels />} />
          <Route path='/landparcels/add-landparcel/:id' element={<AddLandParcel />} />
          <Route path='/landparcels/:id' element={<ParcelProfile />} />

          <Route path='/operator' element={<Operator />} />
          <Route path='/operator/add-operator/:id' element={<AddOperator />} />
          <Route path='/operator/:id' element={<OperatorProfile />} />
          <Route path='/operator/:id/add-landparcel/:landparcelid' element={<AddLandparcel/>} />
          <Route path='/operator/:id/landparcel/:landparcelid' element={<Landparcel />} />
          <Route path='/operator/:id/landparcel/:landparcelid/crops/:cropid' element={<Crops />} />
          <Route path='/operator/:id/landparcel/:landparcelid/crops/add-crops/:cropid' element={<AddCrop/>} />
          <Route path='/operator/:id/landparcel/:landparcelid/crops/:cropid/add-event/:eventid' element={<AddEvent />} />
          
          <Route path='/events' element={<Events />} />
          <Route path='/events/eventDescription/:id' element={<EventDescription />} />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
