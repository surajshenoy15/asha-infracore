import React, { useEffect, useState } from 'react';

const categoryOptions = [
  "Agriculture",
  "Construction and Demolition",
  "Forestry",
  "Grading and Leveling",
  "Landscaping",
  "Lifting and Handling",
  "Road Work",
   "Snow Removal",
];

const AttachmentManager = () => {
  const [attachments, setAttachments] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    image: null,
  });

  const fetchAttachments = async () => {
    try {
      const res = await fetch('https://asha-infracore-backend.onrender.com/api/attachments');
      const data = await res.json();
      setAttachments(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'image' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Only append fields if they have a value
    if (formData.name) data.append('name', formData.name);
    if (formData.description) data.append('description', formData.description);
    if (formData.category) data.append('category', formData.category);
    if (formData.image) data.append('image', formData.image);

    try {
      if (formData.id) {
        const res = await fetch(`https://asha-infracore-backend.onrender.com/api/attachments/${formData.id}`, {
          method: 'PUT',
          body: data,
        });
        if (!res.ok) throw new Error('Update failed');
        alert('Attachment updated successfully!');
      } else {
        const res = await fetch('https://asha-infracore-backend.onrender.com/api/attachments/upload', {
          method: 'POST',
          body: data,
        });
        if (!res.ok) throw new Error('Upload failed');
        alert('Attachment added successfully!');
      }

      resetForm();
      fetchAttachments();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Failed to submit: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      description: '',
      category: '',
      image: null,
    });
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      image: null, // don’t prefill file input
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this attachment?')) return;

    try {
      await fetch(`https://asha-infracore-backend.onrender.com/api/attachments/${id}`, {
        method: 'DELETE',
      });
      fetchAttachments();
    } catch (err) {
      alert('Delete failed');
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-12 transition-all duration-300 hover:shadow-2xl"
        >
          <div className="flex items-center mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-800">
              {formData.id ? 'Edit Attachment' : 'Add New Attachment'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Equipment Name</label>
              <input
                name="name"
                value={formData.name}
                placeholder="Enter equipment name"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 bg-gray-50 hover:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 bg-gray-50 hover:bg-white"
              >
                <option value="">Select Category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Enter description"
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 bg-gray-50 hover:bg-white resize-none"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Attachment Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl file:bg-red-50 file:text-red-700 file:rounded-lg file:border-0 hover:file:bg-red-100 bg-gray-50"
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              {formData.id ? '✓ Update Attachment' : '+ Add Attachment'}
            </button>
          </div>
        </form>

        {/* ATTACHMENT DISPLAY */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-red-600 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-gray-800">Attachment Catalog</h2>
            <div className="ml-auto bg-red-50 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">
              {attachments.length} Attachments
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {attachments.map((a) => (
              <div
                key={a.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden bg-gray-50 h-48">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-red-600 shadow-lg">
                    {a.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-800 mb-2 line-clamp-2">{a.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{a.description}</p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(a)}
                      className="flex-1 px-4 py-2.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transform hover:scale-105 transition-all duration-200 border border-blue-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="flex-1 px-4 py-2.5 bg-red-50 text-red-700 font-semibold rounded-lg hover:bg-red-100 transform hover:scale-105 transition-all duration-200 border border-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {attachments.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No attachments found</h3>
              <p className="text-gray-500">Add your first attachment using the form above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttachmentManager;
