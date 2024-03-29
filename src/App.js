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
function App() {
  return (
    <div className="App">


      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard/>}/>

          <Route path='/landowners' element={<LandOwners />} />
          <Route path='/landowners/add-landowner/:addLandownerId' element={<AddLandOwner />} />
          <Route path='/landowners/:id' element={<OwnerProfile />} />

          <Route path='/landparcels' element={<LandParcels />} />
          <Route path='/landparcels/add-landparcel/:id' element={<AddLandParcel />} />
          <Route path='/landparcels/:id' element={<ParcelProfile />} />

          <Route path='/operator/:id/profile' element={<OperatorProfile />} />
          <Route path='/operator/:id/profile/landparcel/:landparcelid' element={<Landparcel />} />
          <Route path='/operator/:id/profile/landparcel/:landparcelid/crops/:cropid' element={<Crops />} />
          <Route path='/operator' element={<Operator />} />
          <Route path='/add-operator/:addOperatorId' element={<AddOperator />} />
          <Route path='/operator/:id/profile/landparcel/:landparcelid/crops/add-crops/:cropid' element={<AddCrop/>} />
          <Route path='/operator/:id/profile/landparcel/:landparcelid/add-landparcel/:landparcelid' element={<AddLandparcel/>} />


          <Route path='/operator/:id/profile/landparcel/:landparcelid/crops/:cropid/add-event/:eventid' element={<AddEvent />} />
          <Route path='/events' element={<Events />} />
          <Route path='/events/eventDescription/:id' element={<EventDescription />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
