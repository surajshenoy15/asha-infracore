import React from 'react';
import { Link } from 'react-router-dom';

const miniExcavatorTypes = [
  {
    name: '0–3t Mini Excavators',
    slug: '0-3t-mini-excavators',
    image: './home-mini.png',
    description: 'Compact and powerful mini excavators perfect for tight job sites.',
  },
  {
    name: '3–6t Mini Excavators',
    slug: '3-6t-mini-excavators',
    image: './home-mini-2.png',
    description: 'Mid-range excavators offering strength and stability.',
  },
];

const MiniExcavators = () => {
  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#FF3600]">Mini Excavators</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {miniExcavatorTypes.map((type) => (
          <div
            key={type.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img src={type.image} alt={type.name} className="w-full object-contain bg-gray-200" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#FF3600] mb-4">{type.name}</h2>
              <p className="text-gray-600 mb-4">{type.description}</p>
              <Link
                to={`/mini-excavators/${type.slug}`}
                className="text-[#FF3600] font-semibold hover:underline"
              >
                View Models →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniExcavators;
