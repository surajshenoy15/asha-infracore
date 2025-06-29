import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Machinery from './pages/Machinery';
import GetQuote from './pages/GetQuote';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

import Loaders from './pages/Loaders';
import SkidSteerLoaders from './pages/loaders/SkidSteerLoaders';
import CompactTrackLoaders from './pages/loaders/CompactTrackLoaders';
import BackhoeLoaders from './pages/loaders/BackhoeLoaders';

import MiniExcavators from './pages/MiniExcavators';
import ZeroToThreeT from './pages/mini-excavators/ZeroToThreeT';
import ThreeToSixT from './pages/mini-excavators/ThreeToSixT';

import Attachments from './pages/Attachments';
import AgricultureAttachments from './pages/AgricultureAttachments';
import ConstructionAndDemolitionAttachments from './pages/ConstructionAndDemolitionAttachments';
import ForestryAttachments from './pages/ForestryAttachments';
import LandscapingAttachments from './pages/LandscapingAttachments';
import RoadworkAttachments from './pages/RoadWorkAttachments.jsx';
import SnowRemovalAttachments from './pages/SnowRemovalAttachments';
import GradingAndLevelingAttachments from './pages/GradingAndLevelingAttachments';
import LiftingAndHandlingAttachments from './pages/LiftingAndHandlingAttachments';

import ContactUs from './pages/ContactUs'; // ✅ New Import

// Product Detail Pages
import S70SkidSteerLoader from './pages/loaders/products/S70SkidSteerLoader';
import S450SkidSteerLoader from './pages/loaders/products/S450SkidSteerLoader';
import S770SkidSteerLoader from './pages/loaders/products/S770SkidSteerLoader';

// Components
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
            <Route path="/loaders/skid-steer-loaders" element={<SkidSteerLoaders />} />
            <Route path="/loaders/compact-track-loaders" element={<CompactTrackLoaders />} />
            <Route path="/loaders/backhoe-loaders" element={<BackhoeLoaders />} />

            <Route path="/mini-excavators" element={<MiniExcavators />} />
            <Route path="/mini-excavators/0-3t-mini-excavators" element={<ZeroToThreeT />} />
            <Route path="/mini-excavators/3-6t-mini-excavators" element={<ThreeToSixT />} />

            <Route path="/attachments" element={<Attachments />} />
            <Route path="/attachments/agriculture" element={<AgricultureAttachments />} />
            <Route path="/attachments/construction-demolition" element={<ConstructionAndDemolitionAttachments />} />
            <Route path="/attachments/forestry" element={<ForestryAttachments />} />
            <Route path="/attachments/landscaping" element={<LandscapingAttachments />} />
            <Route path="/attachments/roadwork" element={<RoadworkAttachments />} />
            <Route path="/attachments/snow-removal" element={<SnowRemovalAttachments />} />
            <Route path="/attachments/grading-and-leveling" element={<GradingAndLevelingAttachments />} />
            <Route path="/attachments/lifting-and-handling" element={<LiftingAndHandlingAttachments />} />

            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/contact-us" element={<ContactUs />} /> {/* ✅ Added Contact Route */}
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Product Detail Pages */}
            <Route path="/loaders/skid-steer-loaders/s70-skid-steer-loader" element={<S70SkidSteerLoader />} />
            <Route path="/loaders/skid-steer-loaders/s450-skid-steer-loader" element={<S450SkidSteerLoader />} />
            <Route path="/loaders/skid-steer-loaders/s770-skid-steer-loader" element={<S770SkidSteerLoader />} />

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
