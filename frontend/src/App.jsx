import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";


function App() {

  
  return (
   
      <Routes>

        {/* PUBLIC LANDING PAGE */}
        <Route path="/" element={<LandingPage />} />

        {/* PUBLIC AUTH PAGE */}
        <Route path="/auth" element={<Auth />} />

        {/* PROTECTED ROUTE */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h1>Page Not Found</h1>} />

      </Routes>

  
  );
}

export default App;