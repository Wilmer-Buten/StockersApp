import ProtectedRoute from './auth/ProtectedRoute';
import BookListContainer from './components/container/BookListContainer';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DashBoard from './pages/DashBoard';
import WeeklyReport from './pages/WeeklyReport';
import CanvassingVehicle from './pages/CanvassingVehicle';
import CanvassingVehicleListContainer from './components/container/CanvassingVehicleListContainer';
import BookState from './context/states/BookState';
import VehicleState from './context/states/VehicleState';
import UserState from './context/states/UserState';
import StockerRoomState from './context/states/StockerRoomState';
import StockerRoom from './pages/StockerRoom';
import StockerRoomComponent from './components/container/StockerRoomComponent';
import BooksReportContainer from './components/container/BooksReportContainer';

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
            <Route element={<ProtectedRoute/>}>
              <Route exact path='/dashboard' element={<DashBoard/>}></Route>
              <Route exact path='/weeklyreport' element={<WeeklyReport/>}></Route>
              <Route exact path='/canvassingVehicle' element={<CanvassingVehicle/>}></Route>
              <Route exact path='/editvehicle' element={<CanvassingVehicleListContainer/>}></Route>
              <Route exact path='/stockerroom' element={<StockerRoom/>}></Route>
              <Route exact path='/editroom' element={<StockerRoomComponent/>}></Route>
              <Route exact path='/weeklyreport/report' element={<BooksReportContainer/>}></Route>

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
