import ProtectedRoute from './auth/ProtectedRoute';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/DashBoard';
import WeeklyReport from './pages/WeeklyReport';
import CanvassingVehicle from './pages/CanvassingVehicle';
import BookState from './context/states/BookState';
import VehicleState from './context/states/VehicleState';
import UserState from './context/states/UserState';
import StockerRoomState from './context/states/StockerRoomState';
import AppBarComponent from './components/container/AppBarComponent';
import ReportData from './pages/ReportData';
import CanvassingVehiclesListPage from './pages/CanvassingVehiclesListPage'
import StockerRoomsPage from './pages/StockerRoomsPage';
import StockerRoomsListPage from './pages/StockerRoomsListPage';
import VerifyRole from './auth/VerifyRole';
import ConfigPage from './pages/ConfigPage';

function App() {
  return (
    <div className="App">
        {/* <BookListContainer></BookListContainer> */}
      <UserState> 
       <BookState>
       <VehicleState>
       <StockerRoomState>
        <BrowserRouter>
          <Routes>
            <Route exact index path='/signUp' element={<RegisterForm/>}></Route>
            <Route exact path='/login' element={<LoginForm/>}></Route>
            <Route exact path='/dash' element={<AppBarComponent/>}></Route>
            <Route element={<ProtectedRoute/>}>
              <Route exact path='/dashboard' element={<DashBoard/>}></Route>
              <Route element={<VerifyRole/>}>
                <Route exact path='/weeklyreports' element={<WeeklyReport/>}></Route>
                <Route exact path='/canvassingVehicles' element={<CanvassingVehicle/>}></Route>
                <Route exact path='/editvehicle' element={<CanvassingVehiclesListPage/>}></Route>
                <Route exact path='/stockerrooms' element={<StockerRoomsPage/>}></Route>
                <Route exact path='/editroom' element={<StockerRoomsListPage/>}></Route>
                <Route exact path='/weeklyreport/report' element={<ReportData/>}></Route>
                <Route exact path='/configuration' element={<ConfigPage/>}></Route>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        </StockerRoomState>
        </VehicleState>
        </BookState>
      </UserState>
    </div>
  );
}

export default App;
