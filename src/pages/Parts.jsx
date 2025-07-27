import React from 'react';
import { Link } from 'react-router-dom';

const Parts = () => {
  const tiresAndTracks = [
    {
      name: 'Bobcat Tires',
      image: '/tire.png',
      description:
        'Bobcat tires are built for reliability, delivering peak performance in any condition, every time.',
      slug: 'tires',
    },
    {
      name: 'Bobcat Tracks',
      image: '/tracks.png',
      description:
        'Bobcat tracks are engineered for durability and optimized traction across rough terrains and heavy-duty jobs.',
      slug: 'tracks',
    },
  ];

  const alsoLike = [
    {
      title: 'Bobcat Tracks and Tires',
      image: '/tires.png',
      desc: 'Bobcat tracks and tires offer strong performance and reliable traction performance on any terrain.',
      link: '/parts/tracks', // ✅ active
    },
    {
      title: 'Bobcat Batteries',
      image: '/battery.png',
      desc: 'Bobcat batteries provide dependable starting power and long-lasting performance in all working conditions.',
      link: '/parts/batteries', // ✅ active
    },
    {
      title: 'Bobcat Fluids and Lubricants',
      image: '/fluid.png',
      desc: 'Bobcat fluids and lubricants are specifically formulated to protect your equipment and maximize performance.',
      link: '/parts/fluids', // ✅ Add this page if it doesn't exist
    },
  ];

  return (
    <div className="bg-[#f7f3f2] text-black">
      {/* Banner */}
      <div className="relative h-[450px] w-full">
        <img
          src="/parts-bg-3.png"
          alt="Bobcat Parts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl font-extrabold">Bobcat Parts</h1>
        </div>
      </div>

      {/* Tires & Tracks Section */}
      <section className="max-w-7xl mx-auto py-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#FF3600] mb-2">Bobcat Tires and Tracks</h2>
          <p className="text-gray-700 text-sm">
            <Link to="/" className="hover:underline text-black">Home</Link> / <span className="text-[#FF3600]">Parts</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {tiresAndTracks.map((item) => (
            <div
              key={item.slug}
              className="bg-white/90 rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/40 group transform hover:-translate-y-1"
            >
              <div className="h-52 flex items-center justify-center mb-8 rounded-xl overflow-hidden group-hover:from-red-50 group-hover:to-red-100 transition-all duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x128/cccccc/666666?text=${encodeURIComponent(
                      item.name.split(' ')[1] || 'Part'
                    )}`;
                  }}
                />
              </div>
              <h3 className="font-bold text-2xl text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                {item.description}
              </p>
              <Link
                to={`/parts/${item.slug}`}
                className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group-hover:gap-2 gap-1 text-base"
              >
                More Info
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* You Might Also Like Section */}
      <div className="bg-white pt-24 px-4 pb-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-16 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {alsoLike.map((item) => (
              <div
                key={item.title}
                className="bg-white/90 rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/40 group transform hover:-translate-y-1"
              >
                <div className="h-52 flex items-center justify-center mb-8 rounded-xl overflow-hidden group-hover:from-red-50 group-hover:to-red-100 transition-all duration-300">
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
                <h3 className="font-bold text-2xl text-gray-800 mb-4 group-hover:text-red-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-base leading-relaxed">
                  {item.desc}
                </p>
                <Link
                  to={item.link}
                  className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300 group-hover:gap-2 gap-1 text-base"
                >
                  More Info
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parts;
