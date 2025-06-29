import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GradingAndLevelingAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/attachments');
        const filtered = res.data.filter(
          (a) => a.category.toLowerCase() === 'grading and leveling'
        );
        setAttachments(filtered);
      } catch (err) {
        console.error('Error fetching attachments:', err);
      }
    };

    fetchAttachments();
  }, []);

  const totalPages = Math.ceil(attachments.length / itemsPerPage);
  const currentAttachments = attachments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#f5f5f5] text-gray-800 min-h-screen">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/categories/grading-leveling.png"
          alt="Grading & Leveling Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-white text-[48px] md:text-[64px] lg:text-[80px] font-extrabold tracking-wider text-center"
            style={{ fontFamily: "'Triumvirate CG Inserat', Impact, sans-serif" }}
          >
            GRADING & LEVELING
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            Grading & Leveling Attachments
          </h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">Home</Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link to="/attachments" className="text-gray-800 hover:text-red-600 transition">Attachments</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Grading & Leveling</span>
          </nav>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {currentAttachments.length === 0 ? (
            <p className="text-center text-gray-500">No attachments found for Grading & Leveling.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4"
                >
                  <img
                    src={attachment.image || '/placeholder.png'}
                    alt={attachment.name}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{attachment.name}</h3>
                  <p className="text-gray-600 text-sm">{attachment.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pb-12">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 border text-sm font-medium rounded transition ${
                currentPage === page
                  ? 'bg-red-600 text-white border-red-600'
                  : 'hover:bg-red-100 hover:text-red-600'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* You Might Also Like */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: 'Bobcat Tracks and Tires',
              image: '/tires.png',
              desc: 'Bobcat tracks and tires offer strong grip and durability for smooth, reliable performance on any terrain.',
            }, {
              title: 'Bobcat Bacteries',
              image: '/battery.png',
              desc: 'Bobcat batteries deliver dependable starting power and long-lasting performance in all working conditions.',
            }, {
              title: 'Bobcat Fluids and Lubricants',
              image: '/fluid.png',
              desc: 'Bobcat fluids and lubricants are specially formulated to protect your equipment and maximize performance.',
            }].map((item) => (
              <div key={item.title} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow border border-gray-100">
                <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-lg">
                  <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">{item.desc}</p>
                <a href="#" className="text-red-600 font-semibold hover:text-red-700 text-sm">More Info →</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Links */}
      <div className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12 text-center">Related Links</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">Parts & Services</h3>
              <ul className="space-y-3 text-gray-700">
                {['Parts Overview', 'Service Overview', 'Maintenance Video', 'Service Schedules', 'Warranty Plans'].map((text) => (
                  <li key={text} className="flex items-center">
                    <span className="text-red-600 mr-3 font-bold">•</span>
                    <a href="#" className="hover:text-red-600 transition text-sm md:text-base">{text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">Need Assistance?</h3>
              <ul className="space-y-3 text-gray-700">
                {['Get a Quote', 'FAQ'].map((text) => (
                  <li key={text} className="flex items-center">
                    <span className="text-red-600 mr-3 font-bold">•</span>
                    <a href="#" className="hover:text-red-600 transition text-sm md:text-base">{text}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">Find Tools</h3>
              <ul className="space-y-3 text-gray-700">
                {[{ name: 'Attachments', path: '/attachments' }, { name: 'Equipments', path: '/equipments' }].map((link) => (
                  <li key={link.name} className="flex items-center">
                    <span className="text-red-600 mr-3 font-bold">•</span>
                    <Link to={link.path} className="hover:text-red-600 transition text-sm md:text-base">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradingAndLevelingAttachments;
    