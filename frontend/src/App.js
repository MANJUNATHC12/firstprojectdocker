
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {  Routes, Route,  Navigate } from "react-router-dom";

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Navigate to="/Register" />} />
       <Route path='/Home' element={<Home />} />
      <Route path='/Register' element={<Register />}/>
      <Route path='/Login' element={<Login />} />
     
    </Routes>
    

    
    </>
  );
}

export default App;


