import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Loaders = () => {
  const [loaders, setLoaders] = useState([]);

  useEffect(() => {
    const fetchLoaders = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
        const filtered = res.data.filter(p => p.category === 'loaders');
        setLoaders(filtered);
      } catch (err) {
        console.error('Error fetching loaders:', err);
      }
    };
    fetchLoaders();
  }, []);

  return (
    <div className="p-7">
      <h1 className="text-2xl font-bold mb-8">Loaders</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loaders.map(loader => (
          <div
            key={loader.id}
            className="bg-white rounded-xl shadow-lg p-8 max-w-sm mx-auto text-left h-120"
          >
            <div className="mb-5 flex items-center justify-center ">
              <img
                src={loader.image_url || loader.image}
                alt={loader.name}
                className="max-h-full object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">
              {loader.name}
            </h3>
            <p className="text-gray-600 text-s mb-4">
              {loader.description}
            </p>
            <div className="text-s space-y-2">
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Horsepower</span>
                <span className="font-normal">{loader.horsepower} hp</span>
              </div>


              <div className="flex justify-between font-semibold text-gray-800">
                <span>Operating Weight</span>
                <span className="font-normal">{loader.weight} kg</span>
              </div>

              <div className="flex justify-between font-semibold text-gray-800">
                <span>Dig Depth</span>
                <span className="font-normal">{loader.dig_depth} mm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loaders;
