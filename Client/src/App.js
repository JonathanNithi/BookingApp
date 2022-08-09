import React from "react";
import {BrowserRouter as Router,Switch,Route,Link, BrowserRouter, Routes} from "react-router-dom";
import Home from "./pages/home/Home"
import Hotels from "./pages/hotels/Hotels";
import Hotel from "./pages/hotels/hotel/Hotel";
import Login from "./pages/login/Login";


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<Hotels/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
    
    </BrowserRouter>
    
  );
}

export default App;
