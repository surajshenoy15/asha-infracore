import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Fluids = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const alsoLike = [
    {
      title: 'Bobcat Tires',
      image: '/tire.png',
      desc: 'Traction and durability for all terrains.',
      link: '/parts/tires',
    },
    {
      title: 'Bobcat Tracks',
      image: '/tracks.png',
      desc: 'Engineered for rough jobs and lasting performance.',
      link: '/parts/tracks',
    },
    {
      title: 'Bobcat Batteries',
      image: '/battery.png',
      desc: 'Powerful and long-lasting for any conditions.',
      link: '/parts/batteries',
    },
  ];

  return (
    <div className="bg-[#f7f3f2] text-black overflow-hidden">
      {/* Banner */}
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src="/fluids-1.jpeg"
          alt="Bobcat Fluids and Lubricants"
          className="w-full h-full object-cover transform transition-transform duration-[10s] ease-out hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/1920x500/1f2937/ffffff?text=Bobcat+Fluids+Banner";
          }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className={`text-center text-white transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-pulse">Bobcat Fluids</h1>
            <p className="text-xl md:text-2xl font-light transition-all duration-1000 delay-300">
              Engineered to protect and power your machines.
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <p className={`text-gray-700 text-lg transition-all duration-700 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'}`}>
          <Link to="/" className="hover:underline text-black hover:text-[#FF3600] font-medium">Home</Link> / 
          <Link to="/parts" className="hover:underline text-black ml-1 hover:text-[#FF3600] font-medium">Parts & Service</Link> / 
          <Link to="/parts" className="hover:underline text-black ml-1 hover:text-[#FF3600] font-medium">Parts</Link> / 
          <span className="text-[#FF3600] ml-1 font-semibold">Fluids</span>
        </p>
      </div>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        {/* Intro */}
        <div className={`text-center mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 hover:text-[#FF3600] transition-colors duration-500">
            Maximize Performance with Genuine Fluids
          </h2>
          <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
            Bobcat fluids and lubricants are specifically formulated to protect and optimize the performance of your machines.
          </p>
        </div>

        {/* Video */}
        <div className={`bg-white rounded-3xl shadow-xl p-12 mb-20 transition-all duration-1000 delay-1100 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold text-gray-800 mb-4 hover:text-[#FF3600] transition-colors duration-500">
              See Bobcat Fluids in Action
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Watch how Bobcat fluids ensure optimal engine and hydraulic performance under all working conditions.
            </p>
            <div
              className={`rounded-2xl overflow-hidden shadow-2xl bg-black group hover:shadow-3xl transition-all duration-500 transform ${videoHovered ? 'scale-105' : 'scale-100'}`}
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
            >
              <video className="w-full h-auto object-cover" controls preload="metadata" poster="/fluids-1.jpeg">
                <source src="/fluids.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <p className="text-gray-600 text-base leading-relaxed max-w-2xl mx-auto mt-8 transition-all duration-500 hover:text-gray-800">
              From engine oils to hydraulic fluids, trust Bobcat-approved solutions to keep your equipment running at its peak.
            </p>
          </div>
        </div>

        {/* Technical Specs */}
        <div className={`bg-gradient-to-r from-red-600 to-red-700 rounded-3xl shadow-xl p-12 mb-20 text-white transition-all duration-1000 delay-1300 hover:shadow-2xl hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-bold mb-6 hover:scale-105 transition-transform duration-300">
                Genuine Bobcat Fluids
              </h3>
              <div className="space-y-4">
                {[
                  "Formulated specifically for Bobcat engines and hydraulic systems.",
                  "Provide superior protection against wear, corrosion, and sludge.",
                  "Extend component life and reduce overall maintenance cost.",
                ].map((point, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="w-3 h-3 bg-white rounded-full mt-1.5 mr-4 group-hover:scale-125 group-hover:bg-yellow-300 transition-all duration-300"></div>
                    <p className="text-lg group-hover:translate-x-2 transition-all duration-300">{point}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="w-[500px] h-[350px] mx-auto">
                <img
                  src="/fluids-1.jpeg"
                  alt="Bobcat Fluids Showcase"
                  className="w-full h-full object-contain rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x350/cccccc/666666?text=Bobcat+Fluids";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You Might Also Like */}
      <section className="bg-white pt-24 px-4 pb-40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-16 text-center">
            You Might Also Like
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {alsoLike.map((item, i) => (
              <div
                key={i}
                className="bg-white/90 rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 border border-gray-200/40 group transform hover:-translate-y-1"
              >
                <div className="h-52 flex items-center justify-center mb-8 rounded-xl overflow-hidden group-hover:from-red-50 group-hover:to-red-100 transition-all duration-300">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/200x128/cccccc/666666?text=${encodeURIComponent(item.title.split(' ')[1] || 'Part')}`;
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
      </section>
    </div>
  );
};

export default Fluids;
