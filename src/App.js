import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  var isLoggedIn = localStorage.getItem("token");
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index  element={ <Login />  } ></Route>
          <Route path='/home' element={<Home /> }/>
          <Route path='*' element={<Home />}/>
          {/* <Route path="/" exact component={!isLoggedIn ? <Login /> : <Login />} />
          <Route path="/home" exact component={isLoggedIn ? <Home /> : <Login />} /> */}
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
