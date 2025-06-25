import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Machinery from './pages/Machinery';
import GetQuote from './pages/GetQuote';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import Loaders from './pages/Loaders';
import Attachments from './pages/Attachments';
import MiniExcavators from './pages/MiniExcavators';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col justify-between">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/loaders" element={<Loaders />} />
            <Route path="/attachments" element={<Attachments />} />
            <Route path="/mini-excavators" element={<MiniExcavators />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Admin Protected Routes */}
            <Route
              path="/admin-dashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
