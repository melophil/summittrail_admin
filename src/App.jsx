import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Treks from './pages/Treks';
import TrekForm from './pages/TrekForm';
import Bookings from './pages/Bookings';
import Leads from './pages/Leads';
import LeadForm from './pages/LeadForm';

import api, { setToken } from './api';

// NEW IMPORTS (Your admin pages)
import HikeList from './pages/HikeList';
import HikeForm from './pages/HikeForm';

import ExpeditionList from './pages/ExpeditionList';
import ExpeditionForm from './pages/ExpeditionForm';

function App(){
  const [token, setLocalToken] = useState(localStorage.getItem('adminToken'));

  useEffect(() => {
    if (token) setToken(token);
  }, [token]);

  return (
    <Routes>

      <Route path="/dashboard" element={ token ? <Dashboard /> : <Navigate to="/login" /> } />
      <Route path="/login" element={<Login onLogin={(t)=>{ setLocalToken(t); localStorage.setItem('adminToken', t); setToken(t); }} />} />
      <Route path="/" element={ token ? <Dashboard /> : <Navigate to="/login" /> } />

      {/* Treks */}
      <Route path="/treks" element={ token ? <Treks /> : <Navigate to="/login" /> } />
      <Route path="/treks/new" element={ token ? <TrekForm /> : <Navigate to="/login" /> } />
      <Route path="/treks/edit/:id" element={ token ? <TrekForm /> : <Navigate to="/login" /> } />

      {/* Hikes */}
      <Route path="/hikes" element={ token ? <HikeList /> : <Navigate to="/login" /> } />
      <Route path="/hikes/new" element={ token ? <HikeForm /> : <Navigate to="/login" /> } />
      <Route path="/hikes/edit/:id" element={ token ? <HikeForm /> : <Navigate to="/login" /> } />

      {/* Expeditions */}
      <Route path="/expeditions" element={ token ? <ExpeditionList /> : <Navigate to="/login" /> } />
      <Route path="/expeditions/new" element={ token ? <ExpeditionForm /> : <Navigate to="/login" /> } />
      <Route path="/expeditions/edit/:id" element={ token ? <ExpeditionForm /> : <Navigate to="/login" /> } />

      {/* Bookings */}
      <Route path="/bookings" element={ token ? <Bookings /> : <Navigate to="/login" /> } />

      {/* Leads */}
      <Route path="/lead" element={ token ? <Leads /> : <Navigate to="/login" /> } />
      <Route path="/lead/:id" element={ token ? <LeadForm /> : <Navigate to="/login" /> } />

    </Routes>
  );
}

export default App;
