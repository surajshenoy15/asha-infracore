// src/pages/Attachments.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Attachments = () => {
  const [attachments, setAttachments] = useState([]);

  useEffect(() => {
    const fetchAttachments = async () => {
      try {
        const res = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
        const filtered = res.data.filter(
          (p) => p.category.toLowerCase() === 'attachments'
        );
        setAttachments(filtered);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchAttachments();
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="bg-cover bg-center h-[60vh] flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundImage: `url('/banner-attachments.jpg')` }}>
        Attachments
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {attachments.map((item) => (
            <div key={item.id} className="bg-white rounded shadow p-4 text-center hover:shadow-lg transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-40 object-contain mb-4" />
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="mt-2 text-red-600 font-semibold cursor-pointer hover:underline">More Info →</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attachments;
