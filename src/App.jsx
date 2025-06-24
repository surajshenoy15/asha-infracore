import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Machinery from './pages/Machinery';
import GetQuote from './pages/GetQuote';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddProductForm from './components/AddProductForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/machinery" element={<Machinery />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProductForm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
