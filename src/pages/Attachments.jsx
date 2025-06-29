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
    { name: 'CONSTRUCTION & DEMOLITION', image: '/categories/construction.png' },
    { name: 'FORESTRY', image: '/categories/forestry.png' },
    { name: 'GRADING & LEVELING', image: '/categories/grading.png' },
    { name: 'LANDSCAPING', image: '/categories/landscaping.png' },
    { name: 'LIFTING & HANDLING', image: '/categories/lifting.png' },
    { name: 'ROAD WORK', image: '/categories/road work.png' },
    { name: 'SNOW REMOVAL', image: '/categories/snow-removal.png' },
  ];

  return (
    <div className="bg-[#f5f5f5] text-gray-800 min-h-screen">
      {/* Banner */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/categories/attachment.png"
          alt="Attachments Banner"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            console.log('Image failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-black text-[48px] md:text-[64px] lg:text-[80px] font-extrabold tracking-wider text-center"
            style={{ fontFamily: "'Triumvirate CG Inserat', Impact, sans-serif" }}
          >
            ATTACHMENTS
          </h1>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">Attachments</h2>
          <nav className="text-lg text-gray-600">
            <Link to="/" className="text-gray-800 hover:text-red-600 transition">
              Home
            </Link>
            <span className="mx-3 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">Attachments</span>
          </nav>
        </div>
      </div>

      {/* Category Grid */}
      <div className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const path = `/attachments/${cat.name
                .toLowerCase()
                .replace(/ & /g, '-')
                .replace(/\s+/g, '-')}`;

              return (
                <Link
                  key={cat.name}
                  to={path}
                  className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white block"
                >
                  <div className="aspect-[4/3] relative bg-gray-200">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/666666/ffffff?text=${encodeURIComponent(cat.name)}`;
                      }}
                    />
                    <div className="absolute bottom-0 w-full bg-black text-white text-center py-2">
                      <h3 className="text-sm md:text-base font-bold uppercase">{cat.name}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* You Might Also Like */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12 text-center">
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
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="h-32 flex items-center justify-center mb-6 bg-gray-50 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x128/cccccc/666666?text=${encodeURIComponent(
                        item.title.split(' ')[1] || 'Product'
                      )}`;
                    }}
                  />
                </div>
                <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 text-sm md:text-base leading-relaxed">{item.desc}</p>
                <a href={item.link} className="text-red-600 font-semibold hover:text-red-700 transition text-sm md:text-base">
                  More Info →
                </a>
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
                    <a href="#" className="hover:text-red-600 transition text-sm md:text-base">
                      {text}
                    </a>
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
                    <a href="#" className="hover:text-red-600 transition text-sm md:text-base">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold text-red-600 mb-6">Find Tools</h3>
              <ul className="space-y-3 text-gray-700">
                {[
                  { name: 'Attachments', path: '/attachments' },
                  { name: 'Equipments', path: '/equipments' },
                ].map((link) => (
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

export default Attachments;
