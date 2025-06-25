import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    horsepower: '',
    rated_operating_capacity: '',
    operating_weight: '',
    category: '',
    image: null,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          data.append(key, value);
        }
      });

      await axios.post('http://localhost:5000/api/products/upload', data);
      fetchProducts();
    } catch (err) {
      console.error('Submit failed:', err);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name" onChange={handleChange} required className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
        <input name="horsepower" type="number" placeholder="Horsepower" onChange={handleChange} className="border p-2 w-full" />
        <input name="rated_operating_capacity" type="number" placeholder="Rated Capacity" onChange={handleChange} className="border p-2 w-full" />
        <input name="operating_weight" type="number" placeholder="Operating Weight" onChange={handleChange} className="border p-2 w-full" />
        <select name="category" onChange={handleChange} required className="border p-2 w-full">
          <option value="">Select Category</option>
          <option value="loaders">Loaders</option>
          <option value="attachments">Attachments</option>
          <option value="mini excavators">Mini Excavators</option>
        </select>
        <input type="file" name="image" onChange={handleChange} required className="border p-2 w-full" />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Add Product</button>
      </form>

      <div className="mt-6">
        <h2 className="text-xl font-bold">Uploaded Products</h2>
        <ul>
          {products.map(p => (
            <li key={p.id}>{p.name} - {p.category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductManager;
