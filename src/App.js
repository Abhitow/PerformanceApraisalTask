import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ManagerHome from './pages/ManagerHome';
import MngEmployeeDetails from './pages/MngEmployeeDetails'
import HomeNew from './pages/HomeNew';
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index  element={ <Login />  } ></Route>
          {/* <Route path='/home' element={<Home /> }/> */}
          {/* <Route path='*' element={<Home />}/> */}
          <Route path='/homenew' element={<HomeNew />}/>
          <Route path='/managerhome' element={ <ManagerHome />} />
          <Route path='/mngemployeedetails' element={ <MngEmployeeDetails />} />
          {/* <Route path="/" exact component={!isLoggedIn ? <Login /> : <Login />} />
          <Route path="/home" exact component={isLoggedIn ? <Home /> : <Login />} /> */}
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
