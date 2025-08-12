import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Machinery from './pages/Machinery';
import GetQuote from './pages/GetQuote';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Parts from './pages/Parts';
import Tracks from './pages/Tracks';
import Tires from './pages/Tires';
import Batteries from './pages/Batteries';
import Fluids from './pages/Fluids';
import AboutUs from './pages/Aboutus';
import AshaInfracoreServices from './pages/Services';

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
import RoadworkAttachments from './pages/RoadworkAttachments';
import SnowRemovalAttachments from './pages/SnowRemovalAttachments';
import GradingAndLevelingAttachments from './pages/GradingAndLevelingAttachments';
import LiftingAndHandlingAttachments from './pages/LiftingAndHandlingAttachments';

import ContactUs from './pages/ContactUs';
import OurBranches from './pages/OurBranches';

import ProductDetail from './pages/loaders/ProductDetail';
import AttachmentDetail from './pages/loaders/AttachmentDetail';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminRoute from './components/AdminRoute';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

import WarrantyServiceSection from './pages/WarrantyServiceSection';
import WarrantyStdPage from './pages/warrantystd'; 
import ProtectionPlus from './pages/Protectionplus';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(char => char.charCodeAt(0)));
}

function App() {
  useEffect(() => {
    const registerPushNotifications = async () => {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('🔕 Push notifications not supported in this browser');
        return;
      }

      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey || vapidPublicKey.trim().length === 0) {
        console.error('❌ VAPID public key missing in .env (VITE_VAPID_PUBLIC_KEY)');
        return;
      }

      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          console.warn('🚫 Notification permission not granted');
          return;
        }

        const registration = await navigator.serviceWorker.register('/service-worker.js');
        console.log('✅ Service Worker registered:', registration);

        let subscription = await registration.pushManager.getSubscription();

        if (!subscription) {
          const convertedKey = urlBase64ToUint8Array(vapidPublicKey);
          subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedKey,
          });
          console.log('✅ New push subscription created');
        } else {
          console.log('ℹ️ Existing push subscription found');
        }

        const res = await fetch('https://asha-infracore-backend.onrender.com/api/notifications/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(subscription),
        });

        if (res.ok) {
          console.log('📬 Subscription sent to server');
        } else {
          console.error('❌ Failed to register subscription on server');
        }
      } catch (error) {
        console.error('❌ Error setting up push notifications:', error);
      }
    };

    registerPushNotifications();
  }, []);

  return (
    <Router>
      <div className="App min-h-screen flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/services" element={<AshaInfracoreServices />} />
            <Route path="/warranty" element={<WarrantyServiceSection />} />
            <Route path="/warranty/standard" element={<WarrantyStdPage />} />
            <Route path="/warranty/protection-plus" element={<ProtectionPlus />} />
            <Route path="/machinery" element={<Machinery />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/parts/tracks" element={<Tracks />} />
            <Route path="/parts/tires" element={<Tires />} />
            <Route path="/parts/batteries" element={<Batteries />} />
            <Route path="/parts/fluids" element={<Fluids />} />
            <Route path="/get-quote" element={<GetQuote />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/branches" element={<OurBranches />} />

            {/* Loaders */}
            <Route path="/loaders" element={<Loaders />} />
            <Route path="/loaders/skid-steer-loaders" element={<SkidSteerLoaders />} />
            <Route path="/loaders/compact-track-loaders" element={<CompactTrackLoaders />} />
            <Route path="/loaders/backhoe-loaders" element={<BackhoeLoaders />} />
            <Route path="/loaders/skid-steer-loaders/:productId" element={<ProductDetail />} />
            <Route path="/loaders/compact-track-loaders/:productId" element={<ProductDetail />} />
            <Route path="/loaders/backhoe-loaders/:productId" element={<ProductDetail />} />

            {/* Mini Excavators */}
            <Route path="/mini-excavators" element={<MiniExcavators />} />
            <Route path="/mini-excavators/0-3t-mini-excavators" element={<ZeroToThreeT />} />
            <Route path="/mini-excavators/3-6t-mini-excavators" element={<ThreeToSixT />} />
            <Route path="/mini-excavators/0-3t-mini-excavators/:productId" element={<ProductDetail />} />
            <Route path="/mini-excavators/3-6t-mini-excavators/:productId" element={<ProductDetail />} />

            {/* Attachments */}
            <Route path="/attachments" element={<Attachments />} />
            <Route path="/attachments/agriculture" element={<AgricultureAttachments />} />
            <Route path="/attachments/construction-demolition" element={<ConstructionAndDemolitionAttachments />} />
            <Route path="/attachments/forestry" element={<ForestryAttachments />} />
            <Route path="/attachments/landscaping" element={<LandscapingAttachments />} />
            <Route path="/attachments/road-work" element={<RoadworkAttachments />} />
            <Route path="/attachments/snow-removal" element={<SnowRemovalAttachments />} />
            <Route path="/attachments/grading-leveling" element={<GradingAndLevelingAttachments />} />
            <Route path="/attachments/lifting-handling" element={<LiftingAndHandlingAttachments />} />
            <Route path="/attachments/:attachmentId" element={<AttachmentDetail />} />

            {/* Admin */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </main>
        <WhatsAppButton />
        <CookieConsent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
