import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Attachments = () => {
  const [attachments, setAttachments] = useState([]);
  const [bannerError, setBannerError] = useState(false);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
        const filtered = res.data.filter(
          (p) => p.category.toLowerCase() === 'attachments'
        );
        setAttachments(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchAttachments();
  }, []);

  const categories = [
    { name: 'AGRICULTURE', image: '/categories/agriculture.png' },
    { name: 'CONSTRUCTION & DEMOLITION', image: '/categories/construction-bg.png' },
    { name: 'FORESTRY', image: '/categories/forestry.png' },
    { name: 'GRADING & LEVELING', image: '/categories/grading.png' },
    { name: 'LANDSCAPING', image: '/categories/landscaping.png' },
    { name: 'LIFTING & HANDLING', image: '/categories/lifting.png' },
    { name: 'ROAD WORK', image: '/categories/road-work.png' },
    { name: 'SNOW REMOVAL', image: '/categories/snow-removal.png' },  
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800 min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
        <img
          src="/categories/attachment.png"
          alt="Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          onError={(e) => {
            console.log('Image failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-black tracking-wider mb-4 drop-shadow-2xl">
              ATTACHMENTS
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto rounded-full"></div>
          </div>
        </div>
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-12 h-12 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-8 h-8 bg-blue-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>

      {/* Breadcrumb Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 py-16 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-6">
            Attachments
          </h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors duration-300 font-medium">
              Home
            </Link>
            <span className="mx-4 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Attachments</span>
          </nav>
        </div>
      </div>

      {/* Modern Category Grid */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((cat, index) => {
              const path = `/attachments/${cat.name
                .toLowerCase()
                .replace(/ & /g, '-')
                .replace(/\s+/g, '-')}`;

              return (
                <Link
                  key={cat.name}
                  to={path}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border border-gray-200/50 transform hover:-translate-y-2"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/666666/ffffff?text=${encodeURIComponent(cat.name)}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 w-full bg-gradient-to-r from-slate-900 to-slate-800 text-white text-center py-4 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-sm md:text-base font-bold uppercase tracking-wide">
                        {cat.name}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* You Might Also Like - Modern Cards */}
      <div className="bg-white/60 backdrop-blur-sm py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-16 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Bobcat Tracks and Tires',
                image: '/tires.png',
                desc: 'Bobcat tracks and tires offer strong performance and reliable traction performance on any terrain.',
                link: '#',
              },
              {
                title: 'Bobcat Batteries',
                image: '/battery.png',
                desc: 'Bobcat batteries provide dependable starting power and long-lasting performance in all working conditions.',
                link: '#',
              },
              {
                title: 'Bobcat Fluids and Lubricants',
                image: '/fluid.png',
                desc: 'Bobcat fluids and lubricants are specifically formulated to protect your equipment and maximize performance.',
                link: '#',
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/50 group transform hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div className="h-40 flex items-center justify-center mb-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden group-hover:from-red-50 group-hover:to-red-100 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x128/cccccc/666666?text=${encodeURIComponent(
                        item.title.split(' ')[1] || 'Product'
                      )}`;
                    }}
                  />
                </div>
                <h3 className="font-bold text-xl md:text-2xl text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {item.desc}
                </p>
                <a 
                  href={item.link} 
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group-hover:gap-2 gap-1"
                >
                  More Info
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Attachments;