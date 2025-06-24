import { useState } from 'react';
import { supabase } from '../supabaseClient';

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    category: '',
    price: '',
    image_url: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([formData]);
    if (error) alert('Error adding product: ' + error.message);
    else {
      alert('Product added successfully');
      window.location.href = '/admin-dashboard';
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4 font-bold">Add Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        {['name','model','category','price','image_url','description'].map(field => (
          <input key={field} name={field} value={formData[field]} onChange={handleChange} placeholder={field} className="border p-2" required />
        ))}
        <button type="submit" className="bg-orange-600 text-white py-2 rounded">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductForm;
