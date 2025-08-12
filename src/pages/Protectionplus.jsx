import React, { useEffect, useState } from 'react';
import { Search, Menu, MapPin, Users, Phone, ChevronDown, ChevronRight, Shield, DollarSign, AlertTriangle } from 'lucide-react';

const ProtectionPlus = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      

      {/* Modern Breadcrumb */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-[#ff3600] transition-colors">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="/parts-service" className="hover:text-[#ff3600] transition-colors">Parts & Service</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="/service" className="hover:text-[#ff3600] transition-colors">Service</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="/warranty" className="hover:text-[#ff3600] transition-colors">Warranty</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-[#ff3600] font-medium">Protection Plus Extended Warranty</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div
          id="hero-section"
          data-animate
          className={`relative py-20 text-center transition-all duration-1200 ${
            isVisible['hero-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600]/5 via-white to-[#ff3600]/3 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-[#ff3600]/10 text-[#ff3600] rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Extended Warranty Protection
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
              Rely on Your
              <span className="block bg-gradient-to-r from-[#ff3600] to-[#ff5722] bg-clip-text text-transparent">
                Protection Plus Extended Warranty
              </span>
            </h1>
            
            <div className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light space-y-4">
              <p>
                Your Bobcat® compact equipment is essential to your business. It completes difficult tasks. It keeps your schedule moving. And most importantly, it generates income. Safeguarding your business-critical machines with a Protection Plus® extended warranty from Bobcat is an important part of that strategy.
              </p>
              <p>
                <strong>For full details on coverage, pricing, and benefits, contact the .</strong>
                <span className="text-[#ff3600] font-semibold">Asha Infracore Office</span>
              </p>
            </div>
            
            {/* Animated underline */}
            <div className="flex justify-center mt-10">
              <div className="relative">
                <div className="w-32 h-1 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-full"></div>
                <div className="absolute -top-1 left-0 w-8 h-3 bg-[#ff3600]/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 space-y-8">
          {/* Extended Coverage */}
          <div
            id="extended-coverage"
            data-animate
            className={`group transition-all duration-1000 ${
              isVisible['extended-coverage'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-3xl border border-gray-100 hover:border-[#ff3600]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff3600]/10 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-2xl shadow-lg">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <Shield className="w-8 h-8 text-[#ff3600]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Protection Plus Extended Warranty Benefits
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      A Protection Plus extended warranty plan from Bobcat provides additional coverage to minimize repair costs. If machine issues do occur, you know in advance that you are covered – to help you avoid unplanned expenses. It gives you an extended sense of security and also makes good business sense.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Higher Resale Value */}
          <div
            id="resale-value"
            data-animate
            className={`group transition-all duration-1000 delay-200 ${
              isVisible['resale-value'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-3xl border border-gray-100 hover:border-[#ff3600]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff3600]/10 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-2xl shadow-lg">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <DollarSign className="w-8 h-8 text-[#ff3600]" />
                      </div>
                    </div>
                    <div className="flex justify-center mt-4">
                      <svg width="40" height="20" viewBox="0 0 40 20" className="animate-pulse">
                        {/* <path d="M5 10 L15 5 M25 15 L35 10" stroke="#ff3600" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" markerStart="url(#arrowhead)"/> */}
                        {/* <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#ff3600" />
                          </marker>
                        </defs> */}
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Higher Resale Value
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      If you decide to sell your equipment, any remaining Protection Plus extended warranty coverage can be transferred to the next owner. The extended warranty also tells a prospective buyer that your machine received superior care and maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Management */}
          <div
            id="risk-management"
            data-animate
            className={`group transition-all duration-1000 delay-400 ${
              isVisible['risk-management'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white rounded-3xl border border-gray-100 hover:border-[#ff3600]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff3600]/10 overflow-hidden">
              <div className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-2xl shadow-lg">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 text-[#ff3600]" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Risk Management
                    </h3>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      By providing a comfortable shield of protection against repairs due to failures in materials or workmanship, an extended warranty greatly decreases your exposure to financial risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        
      </main>

      {/* Footer */}
      

      {/* Footer Accent */}
      <div className="h-2 bg-gradient-to-r from-[#ff3600] via-[#ff5722] to-[#ff3600]"></div>
    </div>
  );
};

export default ProtectionPlus;