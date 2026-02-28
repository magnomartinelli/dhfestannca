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
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ReloadPrompt from './components/ReloadPrompt';
import AdminNewClient from './admin/NewClient';
import AdminEditClient from './admin/EditClient';
import AdminEditParty from './admin/EditParty';
import AdminSettings from './admin/Settings';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ReloadPrompt />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/clients" element={<AdminClients />} />
        <Route path="/admin/new-client" element={<AdminNewClient />} />
        <Route path="/admin/edit-client/:id" element={<AdminEditClient />} />
        <Route path="/admin/client-details/:id" element={<AdminClientDetails />} />
        <Route path="/admin/parties" element={<AdminParties />} />
        <Route path="/admin/finance" element={<AdminFinance />} />
        <Route path="/admin/new-party" element={<AdminNewParty />} />
        <Route path="/admin/edit-party/:id" element={<AdminEditParty />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;