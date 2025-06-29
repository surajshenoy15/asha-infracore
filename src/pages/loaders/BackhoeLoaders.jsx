import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BackhoeLoaders = () => {
  const [loaders, setLoaders] = useState([]);

  useEffect(() => {
    const fetchLoaders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const filtered = res.data.filter(
          (p) => p.category?.toLowerCase().replace(/\s+/g, '-') === 'backhoe-loaders'
        );
        setLoaders(filtered);
      } catch (err) {
        console.error('Error fetching backhoe loaders:', err);
      }
    };

    fetchLoaders();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        Bobcat Backhoe Loaders
      </h1>

      <div className="text-sm text-center mb-6">
        <Link to="/" className="text-[#3F3E41] hover:underline">Home</Link> /{' '}
        <Link to="/machinery" className="text-[#3F3E41] hover:underline">Machinery</Link> /{' '}
        <Link to="/loaders" className="text-[#3F3E41] hover:underline">Loaders</Link> /{' '}
        <span className="text-red-500 font-bold">Backhoe Loaders</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaders.map((loader) => (
          <div
            key={loader.id}
            className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200"
          >
            <img
              src={loader.image || loader.image_url}
              alt={loader.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-xl font-bold mb-2">{loader.name}</h2>
            <p className="text-gray-700 text-sm mb-3">{loader.description}</p>
            <div className="text-sm text-left text-gray-800 space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold">Horsepower:</span>
                <span>{loader.horsepower} hp</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Rated Capacity:</span>
                <span>{loader.rated_operating_capacity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Operating Weight:</span>
                <span>{loader.operating_weight} kg</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackhoeLoaders;
