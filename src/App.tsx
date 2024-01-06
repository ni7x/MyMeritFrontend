import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./normalize.css";
import './App.css'
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/not_found/NotFound";

const App = () => {
    return (
          <>
              <Router>
                  <Navbar/>
                  <div className="wrapper">
                      <Routes>
                          <Route exact path="/" element={<Home />}  />


                          <Route exact path="*"  element={<NotFound />} />
                      </Routes>
                  </div>
              </Router>
          </>
  )
}

export default App
