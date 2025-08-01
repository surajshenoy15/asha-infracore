import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ZeroToThreeT = () => {
  const [excavators, setExcavators] = useState([]);

  useEffect(() => {
    const fetchExcavators = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
        const filtered = res.data.filter(
          (p) => p.category?.toLowerCase().replace(/\s+/g, '-') === '0-3t-mini-excavators'
        );
        setExcavators(filtered);
      } catch (err) {
        console.error('Error fetching 0–3t Mini Excavators:', err);
      }
    };

    fetchExcavators();
  }, []);

  const toSlug = (str) =>
    str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        0–3t Mini Excavators
      </h1>

      <div className="text-sm text-center mb-6">
        <Link to="/" className="text-[#3F3E41] hover:underline">Home</Link> /{' '}
        <Link to="/machinery" className="text-[#3F3E41] hover:underline">Machinery</Link> /{' '}
        <Link to="/mini-excavators" className="text-[#3F3E41] hover:underline">Mini Excavators</Link> /{' '}
        <span className="text-red-500 font-bold">0–3t</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {excavators.map((item) => {
          const slug = toSlug(item.name);
          const imageSrc = item.image1 || item.image || item.image_url || '/default-image.jpg';

          return (
            <Link
              to={`/mini-excavators/0-3t-mini-excavators/${slug}`}
              key={item.id}
              className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <img
                src={imageSrc}
                alt={item.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700 text-sm mb-3">{item.description}</p>
              <div className="text-sm text-left text-gray-800 space-y-1">
                <div className="flex justify-between">
                  <span className="font-semibold">Horsepower:</span>
                  <span>{item.horsepower} hp</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Rated Capacity:</span>
                  <span>{item.rated_operating_capacity} {item.rated_operating_capacity_unit || 'kg'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Dig Depth:</span>
                  <span>{item.dig_depth ? `${item.dig_depth} mm` : '—'}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ZeroToThreeT;
