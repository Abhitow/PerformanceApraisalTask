import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ManagerHome from './pages/ManagerHome';
import MngEmployeeDetails from './pages/MngEmployeeDetails'
import HomeNew from './pages/HomeNew';
import EmployeeDetails
 from './pages/EmployeeDetails';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index exact path='/' element={ <Login />  } ></Route>
          <Route exact path='/homenew' element={<HomeNew />}/>
          <Route exact path='/managerhome' element={ <ManagerHome />} />
          <Route exact path='/employeedetails' element={ <EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
