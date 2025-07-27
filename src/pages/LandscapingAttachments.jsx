import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandscapingAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        setLoading(true);
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/attachments');
        const filtered = res.data.filter((a) => a.category.toLowerCase() === 'landscaping');
        setAttachments(filtered);
      } catch (err) {
        console.error('Error fetching attachments:', err);
      } finally {
        setLoading(false);
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
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/categories/landscaping.png"
          alt="Landscaping Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-white text-[48px] md:text-[64px] lg:text-[80px] font-extrabold tracking-wider text-center"
            style={{
              fontFamily: "'Triumvirate CG Inserat', Impact, sans-serif",
              textShadow: `
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                0px 2px 0 #000,
                2px 0px 0 #000,
                0px -2px 0 #000,
                -2px 0px 0 #000`
            }}
          >
            LANDSCAPING
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Landscaping Attachments</h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">Home</Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link to="/attachments" className="text-gray-800 hover:text-red-600 transition">Attachments</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Landscaping</span>
          </nav>
        </div>
      </div>

      {/* Grid */}
      <div className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : currentAttachments.length === 0 ? (
            <p className="text-center text-gray-500">No attachments found for Landscaping.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentAttachments.map((attachment) => (
                <Link
                  key={attachment.id}
                  to={`/attachments/${attachment.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100"
                >
                  <img
                    src={attachment.image || '/placeholder.png'}
                    alt={attachment.name}
                    className="w-full h-48 object-contain p-4"
                  />
                  <div className="px-6 pb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{attachment.name}</h3>
                    <p className="text-gray-600 text-sm">{attachment.description}</p>
                  </div>
                </Link>
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
      <div className="bg-white py-16 px-4 border-t">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12 text-center">
      You Might Also Like
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: 'Bobcat Tracks and Tires',
          image: '/tires.png',
          desc: 'Bobcat tracks and tires offer strong grip and durability for smooth, reliable performance on any terrain.',
          link: '/parts/tires',
        },
        {
          title: 'Bobcat Batteries',
          image: '/battery.png',
          desc: 'Bobcat batteries deliver dependable starting power and long-lasting performance in all working conditions.',
          link: '/parts/batteries',
        },
        {
          title: 'Bobcat Fluids and Lubricants',
          image: '/fluid.png',
          desc: 'Bobcat fluids and lubricants are specially formulated to protect your equipment and maximize performance.',
          link: '/parts/fluids',
        },
      ].map((item) => (
        <Link
          key={item.title}
          to={item.link}
          className="bg-white border border-gray-100 hover:border-[#FF3600] rounded-xl shadow-md hover:shadow-xl transition-all p-6 text-center"
        >
          <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-lg">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.desc}</p>
          <span className="text-[#FF3600] hover:text-red-700 text-sm font-semibold">More Info →</span>
        </Link>
      ))}
    </div>
  </div>
</div>

      {/* Related Links */}
      
    </div>
  );
};

export default LandscapingAttachments;
