import React from 'react';
import { Link } from 'react-router-dom';

const Loaders = () => {
  const categories = [
    {
      name: 'Skid-Steer Loaders',
      slug: 'skid-steer-loaders',
      image: './s450 skid-steer 2.png',
      description:
        'Discover Bobcat — the global leader in skid-steer loaders.',
    },
    {
      name: 'Compact Track Loaders',
      slug: 'compact-track-loaders',
      image: './s70 skid steer 1.png',
      description:
        'Designed for terrain flexibility and top-tier performance.',
    },
    {
      name: 'Backhoe Loaders',
      slug: 'backhoe-loaders',
      image: './backhoe-m06 4.png',
      description:
        'Engineered for power, digging, and versatile performance.',
    },
  ];

  return (
    <div className="p-15 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#FF3600]">Loaders</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow "
          >
            <img src={cat.image} alt={cat.name} className="w-full  object-contain bg-gray-200" />
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#FF3600] mb-4">{cat.name}</h2>
              <p className="text-gray-600 mb-4">{cat.description}</p>
              <Link
                to={`/loaders/${cat.slug}`}
                className="text-[#FF3600] font-semibold hover:underline"
              >
                More Info →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loaders;
