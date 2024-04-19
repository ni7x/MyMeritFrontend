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
import JobOfferSolutionDetails from "./pages/job_offer_solution_details/JobOfferSolutionDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import MainWrapper from "./components/MainWrapper";
import Contact from "./pages/contact/Contact";
import Rewards from "./pages/rewards/Rewards";
import UserProfile from "./pages/user_profile/UserProfile";
import JobOfferDetails from "./pages/job_offer_details/JobOfferDetails";
import OAuth2 from "./pages/OAuth2/OAuth2";

const App = () => {
  return (
    <>
      <Navbar />
      <MainWrapper>
        <Routes>
          <Route path="/" element={<Navigate to="/jobs" />} />
          <Route path="/jobs" element={<Home />} />
          <Route path="/mytasks/" element={<MyTasks />} />
          <Route
            path="/job/:id"
            element={
              <ProtectedRoute>
                <JobOfferDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/job/:id/solution"
            element={
              <ProtectedRoute>
                <JobOfferSolutionDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile/"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/rewards/"
            element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            }
          />

          <Route path="/contact/" element={<Contact />} />
          <Route path="/login/" element={<Login />} />
          <Route path="/register/" element={<Register />} />
          <Route path="/oauth2/redirect" element={<OAuth2 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainWrapper>
    </>
  );
};

export default App;
