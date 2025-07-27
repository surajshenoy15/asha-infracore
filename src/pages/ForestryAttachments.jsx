import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ForestryAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/attachments');
        const filtered = res.data.filter((a) => a.category.toLowerCase() === 'forestry');
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

  const handleLearnMore = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/attachments/${slug}`);
  };

  return (
    <div className="bg-[#f5f5f5] text-gray-800 min-h-screen">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/categories/forestry.png"
          alt="Forestry Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
          <h1
            className="text-white text-[48px] md:text-[64px] lg:text-[80px] font-black tracking-wider text-center"
            style={{
              fontFamily: "'Triumvirate CG Inserat', Impact, sans-serif",
              textShadow: `
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000`
            }}
          >
            FORESTRY
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Forestry Attachments</h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">Home</Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link to="/attachments" className="text-gray-800 hover:text-red-600 transition">Attachments</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Forestry</span>
          </nav>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {currentAttachments.length === 0 ? (
            <p className="text-center text-gray-500">No attachments found for Forestry.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentAttachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition duration-300 group overflow-hidden"
                >
                  <div className="h-48 bg-gray-50 flex items-center justify-center">
                    <img
                      src={attachment.image || '/placeholder.png'}
                      alt={attachment.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition">
                      {attachment.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{attachment.description}</p>
                    <button
                      onClick={() => handleLearnMore(attachment.name)}
                      className="mt-4 inline-flex items-center text-red-600 hover:text-red-800 text-sm font-semibold transition"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
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

export default ForestryAttachments;
