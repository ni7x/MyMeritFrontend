import React, {useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import "./normalize.css";
import './App.css'
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/not_found/NotFound";
import MyTasks from "./pages/my_tasks/MyTasks";
import Login from "./pages/login/Login";
import TaskDetails from "./pages/task_details/TaskDetails";

const isLoginPage = () => window.location.pathname === "/login";
const renderNavbar = () => !isLoginPage() ? <Navbar/> : null;



const App = () => {
    return (
          <>
              <Router>
                  {renderNavbar()}
                  <div className="wrapper">
                      <Routes>
                          <Route path="/" element={<Navigate to="/tasks" />} />
                          <Route exact path="/tasks" element={<Home />}  />
                          <Route exact path="/mytasks/" element={<MyTasks />}  />
                          <Route path="/tasks/:id" element={<TaskDetails />}/>
                          <Route exact path="/login/" element={<Login />}  />
                          <Route exact path="*"  element={<NotFound />} />
                      </Routes>
                  </div>
              </Router>
          </>
  )
}

export default App
