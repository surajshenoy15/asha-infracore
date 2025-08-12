import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ConstructionAttachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/attachments');
        const filtered = res.data.filter(a =>
          a.category?.toLowerCase().replace(/[\s&]+/g, '-') === 'construction-and-demolition'
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
    <div className="min-h-screen bg-white text-gray-800">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/categories/construction.png"
          alt="Construction Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
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
            CONSTRUCTION & DEMOLITION
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-10 border-b">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Construction Attachments</h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">Home</Link>
            <span className="mx-3 text-gray-400">/</span>
            <Link to="/attachments" className="text-gray-800 hover:text-red-600 transition">Attachments</Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Construction</span>
          </nav>
        </div>
      </div>

      {/* Attachments Grid */}
      <div className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          {currentAttachments.length === 0 ? (
            <p className="text-center text-gray-500">No attachments found for Construction.</p>
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
      {/* Ultra-Modern Pagination with Advanced Layout */}
{totalPages > 1 && (
  <div className="flex flex-col items-center space-y-6 pb-16">
    {/* Page Info Display */}
    <div className="text-center">
      <p className="text-sm text-gray-500 font-medium">
        Showing page <span className="text-[#ff3600] font-bold">{currentPage}</span> of{' '}
        <span className="text-gray-700 font-bold">{totalPages}</span>
      </p>
    </div>

    {/* Main Pagination Container */}
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-2">
      <div className="flex items-center space-x-1">
        
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`group relative flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform overflow-hidden ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed bg-gray-50 scale-95'
              : 'text-gray-600 hover:text-white bg-gray-50 hover:bg-[#ff3600] shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff3600] to-[#ff5722] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          <svg className={`w-4 h-4 mr-2 transition-transform duration-300 relative z-10 ${currentPage !== 1 ? 'group-hover:-translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="relative z-10">Prev</span>
        </button>

        {/* Separator */}
        <div className="w-px h-8 bg-gray-200 mx-2"></div>

        {/* Page Numbers Container */}
        <div className="flex items-center space-x-1">
          {(() => {
            let startPage = Math.max(1, currentPage - 1);
            let endPage = Math.min(totalPages, startPage + 2);
            
            if (endPage - startPage < 2) {
              startPage = Math.max(1, endPage - 2);
            }

            const pages = [];
            
            // First page with special styling
            if (startPage > 1) {
              pages.push(
                <button
                  key={1}
                  onClick={() => handlePageChange(1)}
                  className="relative w-12 h-12 text-sm font-bold rounded-xl transition-all duration-300 transform bg-gray-50 text-gray-600 hover:bg-[#ff3600] hover:text-white shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1 active:scale-95 overflow-hidden group"
                >
                  <span className="relative z-10">1</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600] to-[#ff5722] transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </button>
              );
              
              if (startPage > 2) {
                pages.push(
                  <div key="ellipsis1" className="px-3 py-3 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                );
              }
            }

            // Current range pages
            for (let i = startPage; i <= endPage; i++) {
              pages.push(
                <button
                  key={i}
                  onClick={() => handlePageChange(i)}
                  className={`relative w-12 h-12 text-sm font-bold rounded-xl transition-all duration-300 transform overflow-hidden group ${
                    currentPage === i
                      ? 'bg-[#ff3600] text-white shadow-xl scale-110 ring-4 ring-[#ff3600] ring-opacity-20'
                      : 'bg-gray-50 text-gray-600 hover:bg-[#ff3600] hover:text-white shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1 active:scale-95'
                  }`}
                >
                  <span className="relative z-10">{i}</span>
                  
                  {/* Active page gradient background */}
                  {currentPage === i && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600] via-[#ff5722] to-[#ff3600] animate-gradient-x"></div>
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-xl opacity-75 blur-sm animate-pulse"></div>
                    </>
                  )}
                  
                  {/* Hover effect for non-active pages */}
                  {currentPage !== i && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600] to-[#ff5722] transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                  )}
                </button>
              );
            }

            // Last page
            if (endPage < totalPages) {
              if (endPage < totalPages - 1) {
                pages.push(
                  <div key="ellipsis2" className="px-3 py-3 text-gray-400">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                );
              }
              
              pages.push(
                <button
                  key={totalPages}
                  onClick={() => handlePageChange(totalPages)}
                  className="relative w-12 h-12 text-sm font-bold rounded-xl transition-all duration-300 transform bg-gray-50 text-gray-600 hover:bg-[#ff3600] hover:text-white shadow-sm hover:shadow-lg hover:scale-110 hover:-translate-y-1 active:scale-95 overflow-hidden group"
                >
                  <span className="relative z-10">{totalPages}</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600] to-[#ff5722] transform scale-0 group-hover:scale-100 transition-transform duration-300 rounded-xl"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </button>
              );
            }

            return pages;
          })()}
        </div>

        {/* Separator */}
        <div className="w-px h-8 bg-gray-200 mx-2"></div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`group relative flex items-center px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform overflow-hidden ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed bg-gray-50 scale-95'
              : 'text-gray-600 hover:text-white bg-gray-50 hover:bg-[#ff3600] shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-0.5 active:scale-95'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#ff3600] to-[#ff5722] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
          <span className="relative z-10">Next</span>
          <svg className={`w-4 h-4 ml-2 transition-transform duration-300 relative z-10 ${currentPage !== totalPages ? 'group-hover:translate-x-1' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    {/* Progress Indicator */}
    <div className="w-full max-w-xs">
      <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-full transition-all duration-500 ease-out"
          style={{width: `${(currentPage / totalPages) * 100}%`}}
        ></div>
      </div>
    </div>

    {/* Quick Jump (for large page counts) */}
    {totalPages > 10 && (
      <div className="flex items-center space-x-3 text-sm">
        <span className="text-gray-500">Quick jump:</span>
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 text-xs font-medium text-[#ff3600] hover:text-white hover:bg-[#ff3600] border border-[#ff3600] rounded-lg transition-all duration-200"
        >
          First
        </button>
        <button
          onClick={() => handlePageChange(Math.ceil(totalPages / 2))}
          className="px-3 py-1 text-xs font-medium text-[#ff3600] hover:text-white hover:bg-[#ff3600] border border-[#ff3600] rounded-lg transition-all duration-200"
        >
          Middle
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 text-xs font-medium text-[#ff3600] hover:text-white hover:bg-[#ff3600] border border-[#ff3600] rounded-lg transition-all duration-200"
        >
          Last
        </button>
      </div>
    )}
  </div>
)}

{/* Enhanced Custom CSS */}
<style jsx>{`
  @keyframes gradient-x {
    0%, 100% {
      background-size: 200% 200%;
      background-position: left center;
    }
    50% {
      background-size: 200% 200%;
      background-position: right center;
    }
  }
  
  .animate-gradient-x {
    animation: gradient-x 3s ease infinite;
    background-size: 200% 200%;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-2px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 5px rgba(255, 54, 0, 0.5);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 54, 0, 0.8), 0 0 30px rgba(255, 54, 0, 0.6);
    }
  }
  
  .animate-glow {
    animation: glow 2s ease-in-out infinite;
  }
`}</style>

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

export default ConstructionAttachments;
