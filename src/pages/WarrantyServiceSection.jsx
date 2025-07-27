import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChevronRight, Shield, Clock, Star, Zap, CheckCircle, ArrowRight } from 'lucide-react';

const WarrantyServiceSection = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const warrantyPlans = [
    {
      id: 1,
      title: 'Standard Warranty',
      subtitle: 'Essential Protection',
      description: 'Comprehensive coverage for your Bobcat machine up to 2 years or 2,000 hours. Perfect for skid-steer loaders, compact track loaders, and excavators.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Shield,
      features: ['2 Years Coverage', '2,000 Hours Protection', 'All Major Components', 'Parts & Labor Included'],
      price: 'Included',
      popular: false,
    },
    {
      id: 2,
      title: 'Protection Plus',
      subtitle: 'Extended Coverage',
      description: 'Premium extended warranty with flexible coverage options. Choose from powertrain, hydraulics, or comprehensive full machine protection plans.',
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      icon: Star,
      features: ['Extended Coverage Options', 'Flexible Payment Plans', '24/7 Premium Support', 'Custom Protection Levels'],
      price: 'From $299/mo',
      popular: true,
    },
  ];

  const stats = [
    { icon: Clock, value: '2+', label: 'Years Coverage', color: 'bg-blue-50 text-blue-600' },
    { icon: Zap, value: '2K+', label: 'Hours Protected', color: 'bg-green-50 text-green-600' },
    { icon: Star, value: '24/7', label: 'Support Available', color: 'bg-purple-50 text-purple-600' }
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
    <section className="bg-gray-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div
          id="warranty-header"
          data-animate
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible['warranty-header'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#ff3600] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-[#ff3600] font-semibold text-sm uppercase tracking-wider">Protection Plans</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Unrivaled Warranty
            <span className="block text-[#ff3600]">Options</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive protection plans designed to keep your equipment running smoothly and your business moving forward.
          </p>
        </div>

        {/* Stats Section */}
        <div
          id="stats-section"
          data-animate
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 transition-all duration-1000 delay-200 ${
            isVisible['stats-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className={`w-16 h-16 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Warranty Plans */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {warrantyPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={plan.id}
                id={`warranty-${plan.id}`}
                data-animate
                className={`relative transition-all duration-1000 delay-${index * 200} ${
                  isVisible[`warranty-${plan.id}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                onMouseEnter={() => setHoveredCard(plan.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group relative ${
                  plan.popular ? 'ring-2 ring-[#ff3600] ring-opacity-50' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute top-6 right-6 z-10">
                      <span className="bg-[#ff3600] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={plan.image} 
                      alt={plan.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-[#ff3600] rounded-xl flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
                        <p className="text-[#ff3600] font-semibold">{plan.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">{plan.description}</p>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                        {plan.price !== 'Included' && <span className="text-gray-500 ml-1">/month</span>}
                      </div>
                      <Link
  to={plan.title === 'Standard Warranty' ? '/warranty/standard' : '/warranty/protection-plus'}
  className="inline-flex items-center gap-2 bg-[#ff3600] text-white px-6 py-3 rounded-xl hover:bg-[#e62e00] transition-colors duration-300 font-semibold group"
>
  Learn More
  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
</Link>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
};

export default WarrantyServiceSection;