import React, { useEffect, useState } from 'react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    horsepower: '',
    rated_operating_capacity: '',
    rated_operating_capacity_unit: 'kg',
    operating_weight: '',
    dig_depth: '',
    category: '',
    image: null,
  });

  const fetchProducts = async () => {
  try {
    const response = await axios.get('https://asha-infracore-backend.onrender.com/api/products');
    setProducts(response.data);
  } catch (err) {
    alert('Failed to fetch products');
    console.error('Fetch error:', err);
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('🧠 Submitting Form Data:', {
      category: formData.category,
      dig_depth: formData.dig_depth,
      operating_weight: formData.operating_weight,
    });

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && key !== 'id') {
        data.append(key, value);
      }
    });

      await axios.post('https://asha-infracore-backend.onrender.com/api/products/upload', data);
    try {
      if (formData.id) {
        await fetch(`https://asha-infracore-backend.onrender.com/api/products/${formData.id}`, {
          method: 'PUT',
          body: data
        });
        alert('Product updated successfully!');
      } else {
        await fetch('https://asha-infracore-backend.onrender.com/api/products/upload', {
          method: 'POST',
          body: data
        });
        alert('Product added successfully!');
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Submit failed');
      console.error('Submit failed:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      horsepower: '',
      rated_operating_capacity: '',
      rated_operating_capacity_unit: 'kg',
      operating_weight: '',
      dig_depth: '',
      category: '',
      image: null,
    });
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id || null,
      name: product.name || '',
      description: product.description || '',
      horsepower: product.horsepower || '',
      rated_operating_capacity: product.rated_operating_capacity || '',
      rated_operating_capacity_unit: product.rated_operating_capacity_unit || 'kg',
      operating_weight: product.operating_weight || '',
      dig_depth: product.dig_depth || '',
      category: product.category || '',
      image: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`https://asha-infracore-backend.onrender.com/api/products/${id}`, {
        method: 'DELETE'
      });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
      console.error('Delete Error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-800">{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Name</label>
              <input 
                name="name" 
                value={formData.name} 
                placeholder="Enter product name" 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Category</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
              >
                <option value="">Select Category</option>
                <option value="skid-steer-loaders">Skid-Steer Loaders</option>
                <option value="compact-track-loaders">Compact Track Loaders</option>
                <option value="backhoe-loaders">Backhoe Loaders</option>
                <option value="attachments">Attachments</option>
                <option value="0-3t-mini-excavators">0–3t Mini Excavators</option>
                <option value="3-6t-mini-excavators">3–6t Mini Excavators</option>
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                placeholder="Enter product description" 
                onChange={handleChange} 
                rows="3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Horsepower</label>
              <input 
                name="horsepower" 
                type="number" 
                value={formData.horsepower} 
                placeholder="Enter horsepower" 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Rated Operating Capacity</label>
              <div className="flex gap-3">
                <input 
                  name="rated_operating_capacity" 
                  type="number" 
                  value={formData.rated_operating_capacity} 
                  placeholder="Enter capacity" 
                  onChange={handleChange} 
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
                <select 
                  name="rated_operating_capacity_unit" 
                  value={formData.rated_operating_capacity_unit} 
                  onChange={handleChange} 
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                >
                  <option value="kg">kg</option>
                  <option value="m³">m³</option>
                </select>
              </div>
            </div>

            {formData.category.includes('mini-excavators') ? (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Dig Depth (mm)</label>
                <input 
                  name="dig_depth" 
                  type="number" 
                  value={formData.dig_depth} 
                  placeholder="Enter dig depth" 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Operating Weight (kg)</label>
                <input 
                  name="operating_weight" 
                  type="number" 
                  value={formData.operating_weight} 
                  placeholder="Enter operating weight" 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white"
                />
              </div>
            )}

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Product Image</label>
              <div className="relative">
                <input 
                  type="file" 
                  name="image" 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-300 bg-gray-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button 
              type="submit" 
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-red-600 hover:to-red-700 focus:ring-4 focus:ring-red-200"
            >
              {formData.id ? '✓ Update Product' : '+ Add Product'}
            </button>
          </div>
        </form>

        {/* PRODUCT DISPLAY */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-800">Product Catalog</h2>
            <div className="ml-auto bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              {products.length} Products
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative overflow-hidden bg-gray-50 h-48">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-red-600 shadow-lg">
                    {p.category?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{p.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Horsepower</span>
                      <span className="font-bold text-gray-800">{p.horsepower} hp</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Rated Capacity</span>
                      <span className="font-bold text-gray-800">{p.rated_operating_capacity} {p.rated_operating_capacity_unit || 'kg'}</span>
                    </div>
                    {p.category.includes('mini-excavators') ? (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dig Depth</span>
                        <span className="font-bold text-gray-800">{p.dig_depth ? `${p.dig_depth} mm` : '—'}</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between py-2">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Operating Weight</span>
                        <span className="font-bold text-gray-800">{p.operating_weight ? `${p.operating_weight} kg` : '—'}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleEdit(p)} 
                      className="flex-1 px-4 py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transform hover:scale-105 transition-all duration-200 border border-blue-200"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      className="flex-1 px-4 py-2.5 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transform hover:scale-105 transition-all duration-200 border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Add your first product using the form above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;