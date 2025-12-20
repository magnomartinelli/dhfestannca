import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminWelcome from './admin/Welcome';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/Dashboard';
import AdminClients from './admin/Clients';
import AdminClientDetails from './admin/ClientDetails';
import AdminParties from './admin/Parties';
import AdminFinance from './admin/Finance';
import AdminNewParty from './admin/NewParty';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminWelcome />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/client-details" element={<AdminClientDetails />} />
        <Route path="/admin/parties" element={<AdminParties />} />
        <Route path="/admin/finance" element={<AdminFinance />} />
        <Route path="/admin/new-party" element={<AdminNewParty />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;