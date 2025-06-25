// src/pages/MiniExcavators.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MiniExcavators = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchMiniExcavators = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const filtered = res.data.filter(
          (p) => p.category.toLowerCase() === 'mini excavators'
        );
        setProducts(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchMiniExcavators();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="bg-cover bg-center h-[60vh] flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundImage: `url('/banner-mini-excavators.jpg')` }}>
        Mini Excavators
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <p className="text-center text-gray-700 mb-8">
          Compact, powerful, and easy to operate—Bobcat mini excavators range from nimble 0–3t models to robust 3–6t machines, delivering performance and comfort for every job site.
        </p>

        {['0-3t', '3-6t'].map((range, index) => {
          const group = products.filter(p =>
            p.name.toLowerCase().includes(range)
          );
          return (
            <div key={index} className="bg-white p-6 rounded-md shadow-md mb-6">
              <h2 className="text-2xl font-bold text-red-600 mb-4">{range} Mini Excavators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.map((item) => (
                  <div key={item.id} className="border rounded shadow p-4 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-40 h-32 object-contain" />
                    <div>
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">More Info →</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniExcavators;
