import React from "react";

import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import useGetCurrentUser from "../hooks/useGetCurrentUser";


const App = () => {
  // useGetCurrentUser();

  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={true ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={true ? <SignIn /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
