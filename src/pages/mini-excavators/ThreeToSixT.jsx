import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ThreeToSixT = () => {
  const [excavators, setExcavators] = useState([]);

  useEffect(() => {
    const fetchExcavators = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
        const filtered = res.data.filter(
          (p) => p.category === '3-6t-mini-excavators'
        );
        setExcavators(filtered);
      } catch (err) {
        console.error('Error fetching 3–6t Mini Excavators:', err);
      }
    };

    fetchExcavators();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        3–6t Mini Excavators
      </h1>

      <div className="text-sm text-center mb-6">
        <Link to="/" className="text-[#3F3E41] hover:underline">Home</Link> /{' '}
        <Link to="/machinery" className="text-[#3F3E41] hover:underline">Machinery</Link> /{' '}
        <Link to="/mini-excavators" className="text-[#3F3E41] hover:underline">Mini Excavators</Link> /{' '}
        <span className="text-red-500 font-bold">3–6t</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {excavators.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200"
          >
            <img
              src={item.image}
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
                <span>
                  {item.rated_operating_capacity} {item.rated_operating_capacity_unit || 'kg'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Dig Depth:</span>
                <span>{item.dig_depth ? `${item.dig_depth} mm` : '—'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreeToSixT;
