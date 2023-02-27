import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
          <Route index path='/' element={<Login />}></Route>
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Home />}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
