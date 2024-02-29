import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./normalize.css";
import "./App.css";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/not_found/NotFound";
import MyTasks from "./pages/my_tasks/MyTasks";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import TaskDetails from "./pages/task_details/TaskDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import MainWrapper from "./components/MainWrapper";
import Contact from "./pages/contact/Contact";

const App = () => {
  return (
    <>
      <Navbar />
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/tasks" element={<Home />} />
          <Route path="/mytasks/" element={<MyTasks />} />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />
          <Route path="/contact/" element={<Contact/>} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainWrapper>
    </>
  );
};

export default App;
