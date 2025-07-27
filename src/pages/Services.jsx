import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AshaInfracoreServices = () => {
  const [activeService, setActiveService] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  const services = [
    {
      id: 3,
      title: "Reliable Warranty Coverage",
      description:
        "No matter where the job takes you, your Bobcat machine is backed by a dependable warranty. Most models come with a 12-month or 2,000-hour standard warranty (whichever comes first). For Bobcat Telescopic machines, enjoy extended coverage of 3 years or 3,000 hours for added peace of mind.",
      equipment: "",
      image: "/warranty.jpg", // ✅ ensure image is in public folder
      link: "/warranty",       // ✅ link to WarrantyServiceSection
    },
  ];

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/services.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 text-center animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent animate-slide-up">
            Reliable. Day In, Day Out.
          </h1>
          <div className="w-32 h-1 bg-[#FF3600] mx-auto mb-6 animate-expand"></div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto animate-slide-up-delay">
            Professional equipment services you can trust
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <div
            id="services-header"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible['services-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#FF3600] mb-6 relative">
              Services Overview
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#FF3600] rounded-full"></div>
            </h2>
            <div className="text-gray-600 mb-8 text-lg">
              <Link to="/" className="hover:text-[#d12e00] transition-colors duration-300">Home</Link>
              <span className="mx-2">/</span>
              <Link to="/services" className="hover:text-[#d12e00] transition-colors duration-300">Services</Link>
              <span className="mx-2 text-[#FF3600]">/</span>
              <span className="text-[#FF3600] font-semibold">Services Overview</span>
            </div>
          </div>

          {/* Intro */}
          <div
            id="services-intro"
            data-animate
            className={`max-w-4xl mx-auto text-center mb-20 transition-all duration-1000 delay-300 ${
              isVisible['services-intro'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-xl text-[#393432] leading-relaxed bg-white p-8 rounded-2xl shadow-lg border-l-4 border-[#FF3600]">
              When your equipment is down, so is your progress. That's why Bobcat offers the tools, resources, and support you need to keep your machine performing at its best. Backed by a network of 200+ dealerships and highly trained service technicians, you'll get expert help exactly when and where you need it—so you can stay focused on the job.
            </p>
          </div>

          {/* Service Cards */}
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={service.id}
                id={`service-${service.id}`}
                data-animate
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`service-${service.id}`]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div
                  className={`group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 flex items-center gap-12 ${
                    index % 2 === 1 ? 'flex-row-reverse' : ''
                  } max-md:flex-col max-md:text-center border border-gray-100`}
                >
                  {/* Image block */}
                  <div className="flex-shrink-0">
                    <div className="relative w-80 h-64 rounded-2xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={service.image}
                        alt={service.equipment}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex-1">
                    <h3 className="text-4xl font-bold text-[#FF3600] mb-6 group-hover:text-[#d12e00] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-[#393432] text-lg leading-relaxed mb-8 text-justify">
                      {service.description}
                    </p>

                    {/* ✅ Link to Warranty page */}
                    {service.link && (
                      <Link
                        to={service.link}
                        className="group/btn inline-flex items-center gap-2 bg-[#FF3600] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#d12e00] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        More Info
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up-delay {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }

        .animate-slide-up-delay {
          animation: slide-up-delay 1s ease-out 1s both;
        }

        .animate-expand {
          animation: expand 1s ease-out 1.5s both;
        }
      `}</style>
    </div>
  );
};

export default AshaInfracoreServices;
