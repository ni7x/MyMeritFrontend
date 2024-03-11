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
import ProtectedRoute from "./components/ProtectedRoute";
import MainWrapper from "./components/MainWrapper";
import Contact from "./pages/contact/Contact";
import Rewards from "./pages/rewards/Rewards";
import {useAuth} from "./hooks/useAuth";

const App = () => {
    const {token} = useAuth();
    console.log(token)
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

export default App
