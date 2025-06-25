import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AttachmentTable() {
  const [attachments, setAttachments] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', image: null });

  const fetchAttachments = async () => {
    const res = await axios.get('http://localhost:5000/api/attachments');
    setAttachments(res.data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleAdd = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    await axios.post('http://localhost:5000/api/attachments/upload', data);
    setForm({ name: '', description: '', image: null });
    fetchAttachments();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/attachments/${id}`);
    fetchAttachments();
  };

  useEffect(() => {
    fetchAttachments();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />
        <input type="file" name="image" onChange={handleChange} className="border p-2 rounded" />
      </div>
      <button onClick={handleAdd} className="bg-[#FF3600] text-white px-4 py-2 rounded">Add Attachment</button>

      <ul className="mt-6 divide-y">
        {attachments.map(a => (
          <li key={a.id} className="flex justify-between items-center py-2">
            <div>
              <strong>{a.name}</strong><br />
              <span className="text-sm">{a.description}</span>
            </div>
            <div className="flex items-center gap-4">
              <img src={a.image_url} alt="attachment" className="w-16 h-16 object-cover rounded" />
              <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
