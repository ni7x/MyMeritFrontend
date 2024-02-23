import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./normalize.css";
import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/not_found/NotFound";
import MyTasks from "./pages/my_tasks/MyTasks";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import TaskDetails from "./pages/task_details/TaskDetails";

const App = () => {
  const location = useLocation();

  const isLoginPage = (): boolean => {
    return location.pathname === "/login" || location.pathname === "/register";
  };

  const renderNavbar = () => (!isLoginPage() ? <Navbar /> : null);

  return (
    <>
      {renderNavbar()}
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mytasks/" element={<MyTasks />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
