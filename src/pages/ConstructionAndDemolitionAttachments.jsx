import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConstructionAndDemolitionAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/attachments');
        const filtered = res.data.filter((a) =>
          ['construction', 'demolition'].includes(a.category.toLowerCase())
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
          src="/categories/construction.png"
          alt="Construction and Demolition Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-white text-[48px] md:text-[64px] lg:text-[80px] font-extrabold tracking-wider text-center"
            style={{ fontFamily: "'Triumvirate CG Inserat', Impact, sans-serif" }}
          >
            CONSTRUCTION & DEMOLITION
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Construction & Demolition Attachments</h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">Home</Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link to="/attachments" className="text-gray-800 hover:text-red-600 transition">Attachments</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Construction & Demolition</span>
          </nav>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {currentAttachments.length === 0 ? (
            <p className="text-center text-gray-500">No attachments found for Construction & Demolition.</p>
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
    </div>
  );
};

export default ConstructionAndDemolitionAttachments;
