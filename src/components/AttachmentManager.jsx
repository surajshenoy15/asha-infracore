import React, { useEffect, useState } from 'react';
import {
  Upload, X, Edit, Trash2, Eye, Camera, ExternalLink,
  Image, Settings, Package, Search, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success': return 'bg-green-50 text-green-800 border-green-200';
      case 'error': return 'bg-red-50 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      default: return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle size={20} className="text-green-600" />;
      case 'error': return <XCircle size={20} className="text-red-600" />;
      case 'warning': return <AlertCircle size={20} className="text-yellow-600" />;
      default: return <AlertCircle size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl border shadow-lg transition-all duration-300 ${getToastStyles()}`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const AttachmentManager = () => {
  const [attachments, setAttachments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'info') => {
    console.log('showToast called:', message, type);
  setToast({ message, type });
};

const closeToast = () => {
  setToast(null);
};
const [filteredAttachments, setFilteredAttachments] = useState([]);
  const [imageModal, setImageModal] = useState({ isOpen: false, imageUrl: '', title: '' });
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    features: [{ title: '', description: '' }],
    specifications: '',
    image: null,
    pdfFile: null,
    specPdfFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

const categoryOptions = [
  { label: 'Construction & Demolition', value: 'construction-and-demolition' },
  { label: 'Grading & Leveling', value: 'grading-and-leveling' },
  { label: 'Lifting & Handling', value: 'lifting-and-handling' },
  { label: 'Agriculture', value: 'agriculture' },
  { label: 'Forestry', value: 'forestry' },
  { label: 'Landscaping', value: 'landscaping' },
  { label: 'Roadwork', value: 'roadwork' },
  { label: 'Snow Removal', value: 'snow-removal' },
];



 const getCategoryColor = (category) => {
  const colors = {
    'agriculture': 'bg-green-100 text-green-800',
    'construction-and-demolition': 'bg-blue-100 text-blue-800',
    'forestry': 'bg-emerald-100 text-emerald-800',
    'grading-and-leveling': 'bg-yellow-100 text-yellow-800',
    'landscaping': 'bg-lime-100 text-lime-800',
    'lifting-and-handling': 'bg-purple-100 text-purple-800',
    'roadwork': 'bg-gray-100 text-gray-800',
    'snow-removal': 'bg-cyan-100 text-cyan-800',
  };

  return colors[category] || 'bg-gray-100 text-gray-800';
};


useEffect(() => {
  fetchAttachments();
  return () => {
    // Clean up blob URLs on unmount
    if (imagePreview?.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);

useEffect(() => {
  // Search filtering logic
  if (!searchTerm.trim()) {
    setFilteredAttachments(attachments);
  } else {
    const filtered = attachments.filter(attachment => 
      attachment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attachment.specifications?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAttachments(filtered);
  }
}, [attachments, searchTerm]);


  const fetchAttachments = async () => {
    try {
      const res = await fetch('https://asha-infracore-backend.onrender.com/api/attachments');
      const data = await res.json();
      setAttachments(data);
    } catch (err) {
      console.error('Failed to fetch attachments:', err);
     showToast('Failed to fetch attachments', 'error');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' || name === 'pdfFile' || name === 'specPdfFile') {
      const file = files[0];
      if (!file) return;
      
      // Validate file type based on input
      if (name === 'image') {
        if (!file.type.startsWith('image/')) {
          showToast('Please select a valid image file', 'error');
          return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
          showToast('Image file size must be less than 5MB', 'error');
          return;
        }
        
        // Clean up previous blob URL if exists
        if (imagePreview && imagePreview.startsWith('blob:')) {
          URL.revokeObjectURL(imagePreview);
        }
        
        // Create new blob URL for preview
        const newPreviewUrl = URL.createObjectURL(file);
        setImagePreview(newPreviewUrl);
        setFormData(prev => ({ ...prev, image: file }));
      } else if (name === 'pdfFile' || name === 'specPdfFile') {
        if (file.type !== 'application/pdf') {
          showToast('Please select a valid PDF file', 'error');
          return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
          showToast('PDF file size must be less than 10MB', 'error');
          return;
        }
        
        setFormData(prev => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (i, field, value) => {
    const updated = [...formData.features];
    updated[i][field] = value;
    setFormData(prev => ({ ...prev, features: updated }));
  };

  const addFeature = () => {
    if (formData.features.length >= 4) return;
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { title: '', description: '' }],
    }));
  };

  const removeFeature = (i) => {
    const updated = [...formData.features];
    updated.splice(i, 1);
    setFormData(prev => ({ ...prev, features: updated }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) {
      showToast('Please fill in all required fields (Name and Category)', 'warning');
      return;
    }

    if (!formData.image && !formData.id) {
      showToast('Please upload an image for the attachment', 'warning');
      return;
    }

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('category', formData.category);
    form.append('features', JSON.stringify(formData.features || []));
    form.append('specifications', formData.specifications || '');
    
    if (formData.image) form.append('image', formData.image);
    if (formData.pdfFile) form.append('pdfFile', formData.pdfFile);
    if (formData.specPdfFile) form.append('specPdfFile', formData.specPdfFile);

    const url = formData.id
      ? `https://asha-infracore-backend.onrender.com/api/attachments/${formData.id}`
      : `https://asha-infracore-backend.onrender.com/api/attachments/upload`;

    const method = formData.id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, { method, body: form });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
     showToast(`Attachment ${formData.id ? 'updated' : 'added'} successfully!`, 'success');
      resetForm();
      fetchAttachments();
    } catch (err) {
      console.error('Submit error:', err);
      showToast('Failed to submit attachment. Please try again.', 'error');
    }
  };

  const handleEdit = (item) => {
    let parsedFeatures = [];
    try {
      parsedFeatures = typeof item.features === 'string'
        ? JSON.parse(item.features)
        : item.features;
      if (!Array.isArray(parsedFeatures)) parsedFeatures = [{ title: '', description: '' }];
    } catch {
      parsedFeatures = [{ title: '', description: '' }];
    }

    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      features: parsedFeatures,
      specifications: item.specifications || '',
      image: null,
      pdfFile: null,
      specPdfFile: null,
    });
    
    // Set the existing image URL as preview (don't create blob URL for existing images)
    setImagePreview(item.image);
  };
const handleDuplicate = (item) => {
  let parsedFeatures = [];
  try {
    parsedFeatures = typeof item.features === 'string'
      ? JSON.parse(item.features)
      : item.features;
    if (!Array.isArray(parsedFeatures)) parsedFeatures = [{ title: '', description: '' }];
  } catch {
    parsedFeatures = [{ title: '', description: '' }];
  }

  setFormData({
    id: null, // Set to null to create a new item
    name: `${item.name} (Copy)`, // Add "Copy" to distinguish
    description: item.description,
    category: item.category,
    features: parsedFeatures,
    specifications: item.specifications || '',
    image: null, // Reset image so user needs to upload new one
    pdfFile: null,
    specPdfFile: null,
  });
  
  // Clear image preview since it's a new item
  setImagePreview(null);
};

  const resetForm = () => {
    // Clean up blob URL if it exists
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    
    setFormData({
      id: null,
      name: '',
      description: '',
      category: '',
      features: [{ title: '', description: '' }],
      specifications: '',
      image: null,
      pdfFile: null,
      specPdfFile: null,
    });
    setImagePreview(null);
    
    // Clear the file inputs
    const imageInput = document.querySelector('input[name="image"]');
    const pdfInput = document.querySelector('input[name="pdfFile"]');
    const specPdfInput = document.querySelector('input[name="specPdfFile"]');
    if (imageInput) imageInput.value = '';
    if (pdfInput) pdfInput.value = '';
    if (specPdfInput) specPdfInput.value = '';
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attachment?')) return;
    
    try {
      const response = await fetch(`https://asha-infracore-backend.onrender.com/api/attachments/${id}`, { 
        method: 'DELETE' 
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      showToast('Attachment deleted successfully!', 'success');
      fetchAttachments();
    } catch (err) {
      console.error('Delete error:', err);
      showToast('Failed to delete attachment', 'error');
    }
  };

  const removeImage = () => {
    if (imagePreview && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
    
    // Clear the file input
    const imageInput = document.querySelector('input[name="image"]');
    if (imageInput) imageInput.value = '';
  };

  const openImageModal = (url, title) => setImageModal({ isOpen: true, imageUrl: url, title });
  const closeImageModal = () => setImageModal({ isOpen: false, imageUrl: '', title: '' });

  const renderImageInput = () => (
    <div className="relative group">
      <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-[#FF3600] transition-all duration-300">
        {imagePreview ? (
          <div className="relative w-full h-full">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error('Image failed to load:', e);
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                <button
                  type="button"
                  onClick={removeImage}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
                  title="Remove Image"
                >
                  <X size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => openImageModal(imagePreview, 'Image Preview')}
                  className="p-2 bg-white hover:bg-gray-100 text-gray-800 rounded-full transition-colors"
                  title="View Full Size"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 group-hover:text-[#FF3600] transition-colors cursor-pointer">
            <Camera size={24} className="mb-2" />
            <span className="text-xs font-medium">Upload Image</span>
            <span className="text-xs text-[#FF3600]">Required</span>
          </div>
        )}
      </div>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        title="Choose image file"
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
              <h1 className="text-2xl font-bold text-gray-800">Attachment Manager</h1>
              <p className="text-gray-600">Manage your attachment catalog efficiently</p>
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
                  {formData.id ? 'Edit Attachment' : 'Add New Attachment'}
                </h2>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter attachment name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                  />
                </div>
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Category <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <select
      name="category"
      value={formData.category}
      onChange={handleChange}
      required
      className="w-full appearance-none px-4 py-2.5 bg-white text-gray-800 border border-[#FF3600] rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-[#FF3600] focus:border-[#FF3600] transition-all"
      style={{
        accentColor: '#FF3600', // applies to some browsers for selection highlight
      }}
    >
      <option value="" disabled>Select Category</option>
      {categoryOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>

    {/* Custom Chevron Icon */}
    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FF3600] text-sm">
      ▼
    </div>
  </div>


</div>

              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Attachment description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                />
              </div>

              {/* PDF Upload Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachment PDF (optional)</label>
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
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">Description</label>
                        <input
                          type="text"
                          value={feature.description}
                          onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                          placeholder={`Feature ${index + 1} Description`}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        {formData.features.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove Feature
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {formData.features.length < 4 && (
                    <button
                      type="button"
                      onClick={addFeature}
                      className="mt-2 text-sm text-[#FF3600] hover:underline"
                    >
                      + Add Another Feature
                    </button>
                  )}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Technical Specifications</label>
                <textarea
                  name="specifications"
                  placeholder="Dimensions, performance specs, etc."
                  value={formData.specifications}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all"
                />
              </div>

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
                {formData.id ? 'Update Attachment' : 'Add Attachment'}
              </button>
            </div>
          </div>

          {/* Image Upload Section */}
          <div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Attachment Image <span className="text-red-500">*</span>
              </h3>
              <div className="mb-4">
                {renderImageInput()}
              </div>
              <div className="text-xs text-gray-500 mb-4">
                • Max file size: 5MB<br/>
                • Supported formats: JPG, PNG, GIF, WebP<br/>
                • Recommended: Square aspect ratio
              </div>
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>

        {/* Attachment Catalog */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Attachment Catalog</h2>
          <p className="text-sm text-gray-500 mt-1">
        {searchTerm ? (
          <>Showing {filteredAttachments.length} of {attachments.length} attachments</>
        ) : (
          <>Total: {attachments.length} attachment{attachments.length !== 1 ? 's' : ''}</>
        )}
      </p>
          {/* Search Bar */}
<div className="mb-6">
  <div className="relative max-w-md">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Search className="h-5 w-5 text-gray-400" />
    </div>
    <input
      type="text"
      placeholder="Search attachments by name, description, category, or specs..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="block w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF3600] focus:border-transparent transition-all placeholder-gray-400"
    />
    {searchTerm && (
      <button
        onClick={() => setSearchTerm('')}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </button>
    )}
  </div>
  {searchTerm && (
    <p className="mt-2 text-sm text-gray-600">
      Found {filteredAttachments.length} attachment{filteredAttachments.length !== 1 ? 's' : ''} 
      {searchTerm && ` for "${searchTerm}"`}
    </p>
  )}
</div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Files</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttachments.length === 0 ? (
  <tr>
    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
      {searchTerm ? `No attachments found matching "${searchTerm}"` : 'No attachments found. Add your first attachment above.'}
    </td>
  </tr>
) : (
  filteredAttachments.map((attachment) => (
                    <tr key={attachment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          {attachment.image ? (
                            <img
                              src={attachment.image}
                              alt={attachment.name}
                              className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => openImageModal(attachment.image, attachment.name)}
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
                        <div className="font-medium text-gray-900">{attachment.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(attachment.category)}`}>
                          {attachment.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500 max-w-xs truncate">{attachment.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          {attachment.pdfFile && (
                            <a
                              href={attachment.pdfFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                            >
                              <ExternalLink size={12} />
                              Product PDF
                            </a>
                          )}
                          {attachment.specPdfFile && (
                            <a
                              href={attachment.specPdfFile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-green-600 hover:text-green-800 flex items-center gap-1"
                            >
                              <ExternalLink size={12} />
                              Specs PDF
                            </a>
                          )}
                          {!attachment.pdfFile && !attachment.specPdfFile && (
                            <span className="text-xs text-gray-400">No PDFs</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(attachment)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Attachment"
                          >
                            <Edit size={16} />
                          </button>
                          <button
      onClick={() => handleDuplicate(attachment)}
      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
      title="Duplicate Attachment"
    >
      <Upload size={16} />
    </button>
                          <button
                            onClick={() => handleDelete(attachment.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Attachment"
                          >
                            <Trash2 size={16} />
                          </button>
                          {attachment.image && (
                            <button
                              onClick={() => openImageModal(attachment.image, attachment.name)}
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
        {toast && (
  <Toast
    message={toast.message}
    type={toast.type}
    onClose={closeToast}
  />
)}
      </div>
    </div>
  );
};

export default AttachmentManager;