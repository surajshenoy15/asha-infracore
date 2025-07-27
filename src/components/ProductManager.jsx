import React, { useEffect, useState } from 'react';
import { Upload, X, Edit, Trash2, Eye, Package, Settings, Camera, ExternalLink, Image } from 'lucide-react';

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [imageModal, setImageModal] = useState({ isOpen: false, imageUrl: '', title: '' });
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
  features: [{ title: '', description: '' }],
  specifications: '',
  image1: null,
  image2: null,
  image3: null,
  image4: null,
  pdfFile: null,
  specPdfFile: null, // Add this line
});

  const [imagePreview, setImagePreview] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  // Category display mapping
  const categoryLabels = {
    'skid-steer-loaders': 'Skid-Steer Loaders',
    'compact-track-loaders': 'Compact Track Loaders',
    'backhoe-loaders': 'Backhoe Loaders',
    'attachments': 'Attachments',
    '0-3t-mini-excavators': '0–3t Mini Excavators',
    '3-6t-mini-excavators': '3–6t Mini Excavators',
  };

  const getCategoryColor = (category) => {
    const colors = {
      'skid-steer-loaders': 'bg-blue-100 text-blue-800',
      'compact-track-loaders': 'bg-green-100 text-green-800',
      'backhoe-loaders': 'bg-purple-100 text-purple-800',
      'attachments': 'bg-yellow-100 text-yellow-800',
      '0-3t-mini-excavators': 'bg-pink-100 text-pink-800',
      '3-6t-mini-excavators': 'bg-indigo-100 text-indigo-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://asha-infracore-backend.onrender.com/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name.startsWith('image') || name === 'pdfFile' || name === 'specPdfFile') {
    const file = files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));

    if (name.startsWith('image')) {
      const previewUrl = file ? URL.createObjectURL(file) : null;
      setImagePreview((prev) => ({ ...prev, [name]: previewUrl }));
    }
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};


  const handleFeatureChange = (index, field, value) => {
    const updated = [...formData.features];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }],
    }));
  };

  const removeFeature = (index) => {
    const updated = [...formData.features];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    if (key !== 'id' && value !== null && value !== '') {
      if (key === 'features' && Array.isArray(value)) {
        data.append('features', JSON.stringify(value));
      } else {
        data.append(key, typeof value === 'string' ? value.trim() : value);
      }
    }
  });

  try {
    const url = formData.id
      ? `https://asha-infracore-backend.onrender.com/api/products/${formData.id}`
      : 'https://asha-infracore-backend.onrender.com/api/products'; // Remove '/upload'
    const method = formData.id ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      body: data,
    });

    alert(formData.id ? 'Product updated successfully!' : 'Product added successfully!');
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
    features: [{ title: '', description: '' }],
    specifications: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    pdfFile: null,
    specPdfFile: null, // Add this line
  });

  setImagePreview({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
};

  const handleEdit = (product) => {
  let parsedFeatures = [];

  try {
    if (typeof product.features === 'string') {
      parsedFeatures = JSON.parse(product.features);
    } else if (Array.isArray(product.features)) {
      parsedFeatures = product.features;
    } else {
      parsedFeatures = [{ title: '', description: '' }];
    }

    // Ensure it's an array of feature objects
    if (!Array.isArray(parsedFeatures)) {
      parsedFeatures = [{ title: '', description: '' }];
    }
  } catch (e) {
    console.error('Invalid features JSON:', e);
    parsedFeatures = [{ title: '', description: '' }];
  }

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
    features: parsedFeatures,
    specifications: product.specifications || '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  setImagePreview({
    image1: product.image1 || null,
    image2: product.image2 || null,
    image3: product.image3 || null,
    image4: product.image4 || null,
  });
};


  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`https://asha-infracore-backend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
      console.error('Delete error:', err);
    }
  };

  const removeImage = (field) => {
    setFormData((prev) => ({ ...prev, [field]: null }));
    setImagePreview((prev) => ({ ...prev, [field]: null }));
  };

  const openImageModal = (imageUrl, title) => {
    setImageModal({ isOpen: true, imageUrl, title });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, imageUrl: '', title: '' });
  };

  const renderImageInput = (label, field, isPrimary = false) => (
    <div className="relative group">
      <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-[#FF3600] transition-all duration-300">
        {imagePreview[field] ? (
          <div className="relative w-full h-full">
            <img
              src={imagePreview[field]}
              alt={`${field} preview`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button
                  type="button"
                  onClick={() => removeImage(field)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                >
                  <X size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => openImageModal(imagePreview[field], `${label} Preview`)}
                  className="p-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full transition-colors"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-[#FF3600] transition-colors">
            <Camera size={24} className="mb-2" />
            <span className="text-xs font-medium">{label}</span>
            {isPrimary && <span className="text-xs text-[#FF3600]">Required</span>}
          </div>
        )}
      </div>
      <input
        type="file"
        name={field}
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#FF3600] rounded-xl">
              <Package className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Product Manager</h1>
              <p className="text-gray-600">Manage your product catalog efficiently</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="text-[#FF3600]" size={20} />
                <h2 className="text-xl font-bold text-gray-800">
                  {formData.id ? 'Edit Product' : 'Add New Product'}
                </h2>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
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
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Product description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                />
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horsepower</label>
                  <input
                    type="number"
                    name="horsepower"
                    placeholder="HP"
                    value={formData.horsepower}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rated Capacity</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="rated_operating_capacity"
                      placeholder="Capacity"
                      value={formData.rated_operating_capacity}
                      onChange={handleChange}
                      className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                    />
                    <select
                      name="rated_operating_capacity_unit"
                      value={formData.rated_operating_capacity_unit}
                      onChange={handleChange}
                      className="px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                    >
                      <option value="kg">kg</option>
                      <option value="m³">m³</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.category?.includes('mini-excavators') ? 'Dig Depth (mm)' : 'Operating Weight (kg)'}
                  </label>
                  {formData.category?.includes('mini-excavators') ? (
                    <input
                      type="number"
                      name="dig_depth"
                      placeholder="Depth"
                      value={formData.dig_depth}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                    />
                  ) : (
                    <input
                      type="number"
                      name="operating_weight"
                      placeholder="Weight"
                      value={formData.operating_weight}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                    />
                  )}
                </div>
              </div>

              {/* PDF Upload */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">Product PDF (optional)</label>
  <input
    type="file"
    name="pdfFile"
    accept="application/pdf"
    onChange={handleChange}
    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF3600] file:text-white hover:file:bg-[#FF4500] transition-all"
  />
  {formData.pdfFile && (
    <p className="text-sm mt-2 text-gray-600">
      Selected: <strong>{formData.pdfFile.name}</strong>
    </p>
  )}
</div>


              {/* Features */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Key Features</label>
                <div className="space-y-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                      <div>
                        <label className="text-xs text-gray-600">Title</label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                          placeholder={`Feature ${index + 1} Title`}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600]"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Description</label>
                        <input
                          type="text"
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                          placeholder={`Feature ${index + 1} Description`}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addFeature}
                    className="mt-2 text-sm text-[#FF3600] hover:underline"
                  >
                    + Add Another Feature
                  </button>
                </div>
              </div>

              {/* Specifications */}
              {/* Specifications PDF Upload */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-1">Specifications PDF (optional)</label>
  <input
    type="file"
    name="specPdfFile"
    accept="application/pdf"
    onChange={handleChange}
    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF3600] file:text-white hover:file:bg-[#FF4500] transition-all"
  />
  {formData.specPdfFile && (
    <p className="text-sm mt-2 text-gray-600">
      Selected: <strong>{formData.specPdfFile.name}</strong>
    </p>
  )}
</div>


              {/* Submit Button */}
              <button
  type="button"
  onClick={handleSubmit}
  className="w-full bg-gradient-to-r from-[#FF3600] to-[#FF4500] text-white py-3 px-6 rounded-xl font-medium hover:from-[#FF4500] hover:to-[#FF5500] transition-all duration-300 shadow-lg hover:shadow-xl"
>
  {formData.id ? 'Update Product' : 'Add Product'}
</button>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
              <div className="grid grid-cols-2 gap-3">
                {renderImageInput('Image 1', 'image1', true)}
                {renderImageInput('Image 2', 'image2')}
                {renderImageInput('Image 3', 'image3')}
                {renderImageInput('Image 4', 'image4')}
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* Product Catalog */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Catalog</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No products found. Add your first product above.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          {product.image1 ? (
                            <img
                              src={product.image1}
                              alt={product.name}
                              className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => openImageModal(product.image1, product.name)}
                            />
                          ) : (
                            <div className="text-gray-400 flex flex-col items-center justify-center">
                              <Image size={20} />
                              <span className="text-xs mt-1">No Image</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{product.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(product.category)}`}>
                          {categoryLabels[product.category] || product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs">HP:</span>
                            <span className="font-medium">{product.horsepower || '--'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 text-xs">Cap:</span>
                            <span className="font-medium">
                              {product.rated_operating_capacity
                                ? `${product.rated_operating_capacity} ${product.rated_operating_capacity_unit || 'kg'}`
                                : '--'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                          {product.image1 && (
                            <button
                              onClick={() => openImageModal(product.image1, product.name)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="View Image"
                            >
                              <Eye size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Image Modal */}
        {imageModal.isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{imageModal.title}</h3>
                <button
                  onClick={closeImageModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <img
                src={imageModal.imageUrl}
                alt={imageModal.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={closeImageModal}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <a
                  href={imageModal.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#FF3600] text-white rounded-lg hover:bg-[#FF4500] transition-colors"
                >
                  <ExternalLink size={16} />
                  Open in New Tab
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManager;