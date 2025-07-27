import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Phone, Mail, Clock, Star, Navigation, ExternalLink, Zap, Globe } from 'lucide-react';

export default function OurBranches() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const branches = [
    {
      name: "BENGALURU",
      subtitle: "Head Office",
      image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isHeadOffice: true,
      address: "No.17, 4th Main Road, Vyalikaval, HCBS Nagawara Village Opposite Manyata Tech Park, Nagawara, Bengaluru- 560078, Karnataka, India",
      phone: "+91 80 1234 5678",
      email: "bangalore@ashainfracore.com",
      coordinates: { lat: 13.0475, lng: 77.6186 },
      accent: "#FF3600"
    },
    {
      name: "SHIVAMOGGA",
      subtitle: "Branch Office",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      address: "Auto Complex, 1st Cross, Sagar Road, KIADB Auto Complex, Vinoba Nagara, Shivamogga, Karnataka 577204",
      phone: "+91 81 8345 6789",
      email: "shivamogga@ashainfracore.com",
      coordinates: { lat: 13.9299, lng: 75.5681 },
      accent: "#FF3600"
    },
    {
      name: "MANGALURU",
      subtitle: "Branch Office",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      address: "Door No.6-109/12, Ground Floor, Saraswathi Building, Near Kavoor Police Station, Kavoor-575015",
      phone: "+91 82 4567 8901",
      email: "mangaluru@ashainfracore.com",
      coordinates: { lat: 12.8406, lng: 74.8956 },
      accent: "#FF3600"
    }
  ];

  const openGoogleMaps = (branch) => {
    const encodedAddress = encodeURIComponent(branch.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const getDirections = (branch) => {
    const encodedAddress = encodeURIComponent(branch.address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
  };

  const MapModal = ({ branch, onClose }) => {
    if (!branch) return null;

    const handleBackdropClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleCloseClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };

    return (
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={handleBackdropClick}
      >
        <div 
          className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200/30 shadow-2xl animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative p-6 border-b border-gray-200/50">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF3600]/5 to-transparent animate-shimmer"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#FF3600] mb-1 animate-slide-right tracking-wide">{branch.name}</h3>
                <p className="text-gray-600 animate-slide-right delay-100">{branch.subtitle}</p>
              </div>
              <button
                onClick={handleCloseClick}
                className="text-gray-500 hover:text-[#FF3600] text-2xl transition-all duration-300 hover:rotate-90 hover:scale-110 p-2 rounded-full hover:bg-gray-100"
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-start space-x-3 mb-4 animate-slide-up">
                <MapPin className="w-5 h-5 text-[#FF3600] mt-0.5 flex-shrink-0 animate-bounce" />
                <p className="text-gray-600 text-sm leading-relaxed">{branch.address}</p>
              </div>

              <div className="flex flex-wrap gap-3 mb-6 animate-slide-up delay-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openGoogleMaps(branch);
                  }}
                  className="group flex items-center space-x-2 bg-gradient-to-r from-[#FF3600] to-[#FF5722] text-white px-6 py-3 rounded-2xl hover:from-[#FF5722] hover:to-[#FF3600] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform font-semibold"
                  type="button"
                >
                  <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>View on Google Maps</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getDirections(branch);
                  }}
                  className="group flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-2xl hover:from-[#FF3600] hover:to-[#FF5722] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform font-semibold"
                  type="button"
                >
                  <Navigation className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 text-center overflow-hidden animate-slide-up delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF3600]/10 to-transparent animate-shimmer"></div>
              <div className="relative">
                <Globe className="w-8 h-8 text-[#FF3600] mx-auto mb-3 animate-spin-slow" />
                <p className="text-gray-600 mb-2 font-semibold">Interactive Map</p>
                <p className="text-sm text-gray-500 mb-4">
                  Click the buttons above to view the location on Google Maps or get directions
                </p>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200/50 shadow-inner">
                  <div className="relative">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FF3600]/20 to-[#FF3600]/10 rounded-full blur-3xl animate-pulse"></div>
                  </div>
                  <p className="text-gray-500 font-semibold">Map will open in a new tab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,54,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* Animated Mesh Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_24%,rgba(255,255,255,0.05)_25%,rgba(255,255,255,0.05)_26%,transparent_27%,transparent_74%,rgba(255,255,255,0.05)_75%,rgba(255,255,255,0.05)_76%,transparent_77%)] bg-[length:60px_60px] animate-drift"></div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF3600]/20 to-[#FF3600]/10 rounded-full blur-xl" />
            </div>
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-7xl md:text-8xl font-bold mb-6 tracking-wide drop-shadow-2xl">
            OUR BRANCHES
          </h1>
          <p className="text-white/95 text-xl md:text-2xl font-light leading-relaxed">
            Strategically located across Karnataka to serve you better
          </p>
        </div>
      </section>

      {/* Branches Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Branches</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#FF3600] to-[#e14a0d] mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our multiple locations and get in touch with our expert team
            </p>
          </div>

          <div className="space-y-12">
            {branches.map((branch, index) => (
              <div 
                key={index} 
                className={`group transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-500 bg-white backdrop-blur-xl border border-gray-100 hover:border-[#FF3600]/30 group-hover:scale-[1.02] transform hover:shadow-[0_20px_60px_rgba(255,54,0,0.1)]">
                  {/* Animated Border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF3600]/20 to-transparent animate-border-flow opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex flex-col lg:flex-row relative z-10">
                    {/* Left: Image */}
                    <div className="relative lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                      <img
                        src={branch.image}
                        alt={branch.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3600]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white text-4xl font-bold tracking-wide mb-2 transform transition-all duration-500 group-hover:scale-105 drop-shadow-lg">
                          {branch.name}
                        </h3>
                        <div className="flex items-center">
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm transition-all duration-300 ${
                            branch.isHeadOffice 
                              ? 'bg-gradient-to-r from-[#FF3600] to-[#FF5722] text-white shadow-lg' 
                              : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                          }`}>
                            {branch.subtitle}
                          </span>
                          {branch.isHeadOffice && (
                            <Star className="w-6 h-6 text-yellow-400 ml-3 animate-pulse" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right: Content */}
                    <div className="lg:w-1/2 p-8 flex flex-col justify-between">
                      <div className="space-y-6 mb-8">
                        <div className="flex items-start space-x-4 group/item hover:transform hover:scale-105 transition-transform duration-300">
                          <div className="bg-[#FF3600] p-3 rounded-full">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-2">Address</h4>
                            <p className="text-gray-600 text-base leading-relaxed">{branch.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 group/item hover:transform hover:scale-105 transition-transform duration-300">
                          <div className="bg-[#FF3600] p-3 rounded-full">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-1">Phone</h4>
                            <a href={`tel:${branch.phone}`} className="text-gray-600 hover:text-[#FF3600] transition-colors duration-300 font-medium">
                              {branch.phone}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 group/item hover:transform hover:scale-105 transition-transform duration-300">
                          <div className="bg-[#FF3600] p-3 rounded-full">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-1">Email</h4>
                            <a href={`mailto:${branch.email}`} className="text-gray-600 hover:text-[#FF3600] transition-colors duration-300 font-medium">
                              {branch.email}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 group/item hover:transform hover:scale-105 transition-transform duration-300">
                          <div className="bg-[#FF3600] p-3 rounded-full">
                            <Clock className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="text-gray-900 font-bold text-lg mb-1">Hours</h4>
                            <span className="text-gray-600 font-medium">Mon - Sat: 9:00 AM - 6:00 PM</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <button
                          onClick={() => setSelectedBranch(branch)}
                          className="group/btn w-full bg-gradient-to-r from-[#FF3600] to-[#e14a0d] text-white py-4 px-8 rounded-xl font-bold hover:from-[#e14a0d] hover:to-[#cc2e00] transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-3 hover:scale-105 transform"
                          type="button"
                        >
                          <MapPin className="w-6 h-6 group-hover/btn:animate-bounce" />
                          <span className="text-lg">View Location & Directions</span>
                        </button>

                        <div className="flex space-x-3">
                          <button
                            onClick={() => openGoogleMaps(branch)}
                            className="group/btn flex-1 bg-white border-2 border-[#FF3600] text-[#FF3600] py-3 px-6 rounded-xl font-bold hover:bg-[#FF3600] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform"
                            type="button"
                          >
                            <ExternalLink className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                            <span>View on Maps</span>
                          </button>
                          <button
                            onClick={() => getDirections(branch)}
                            className="group/btn flex-1 bg-gray-100 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-[#FF3600] hover:border-[#FF3600] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 transform"
                            type="button"
                          >
                            <Navigation className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                            <span>Directions</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-20 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>

      {/* Modal */}
      {selectedBranch && (
        <MapModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes border-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(60px); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-right {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s ease-in-out infinite; }
        .animate-border-flow { animation: border-flow 2s ease-in-out infinite; }
        .animate-drift { animation: drift 20s linear infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-slide-right { animation: slide-right 0.6s ease-out; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
}