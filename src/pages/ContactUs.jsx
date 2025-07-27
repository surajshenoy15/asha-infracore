import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt, FaBuilding, FaCrown, FaExpand, FaDirections } from "react-icons/fa";

// Branch Data
const branches = [
  {
    name: "BENGALURU",
    type: "Head Office",
    image: "/Bengaluru.png",
    address:
      "No.17, 4th Main Road, Vyalikaval, Hcbs Nagawara Village, Opp Manyata Tech Park, Bengaluru, Karnataka 560045",
    mapSrc:
      "https://www.google.com/maps?q=No.17,+4th+Main+Road,+Vyalikaval,+Bangalore&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=No.17,+4th+Main+Road,+Vyalikaval,+Bangalore",
  },
  {
    name: "SHIVAMOGGA",
    image: "/Shivamogga.png",
    address:
      "Auto Complex, 1st Cross, Sagar Road, KIADB Auto Complex, Vinoba Nagara, Shivamogga, Karnataka 577204",
    mapSrc:
      "https://www.google.com/maps?q=KIADB+Auto+Complex,+Shivamogga&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=KIADB+Auto+Complex,+Shivamogga",
  },
  {
    name: "MANGALURU",
    image: "/Mangaluru.png",
    address:
      "Door no. 6-109/2, Ground Floor, Saraswathi Building, Village Kavoor, Mangaluru, Karnataka 575015",
    mapSrc: "https://www.google.com/maps?q=Village+Kavoor,+Mangaluru&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Village+Kavoor,+Mangaluru",
  },
];

export default function ContactUs() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);
  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  comments: "",
  branch: branches[0].name, // ✅ add default selected branch
});


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://asha-infracore-backend.onrender.com/api/contact/send', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          comments: "",
        });
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };

  // Function to handle directions navigation
  const handleGetDirections = (branch) => {
    window.open(branch.directionsUrl, '_blank');
  };

  // Function to handle map expansion (optional enhancement)
  const handleExpandMap = (branch) => {
    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(branch.address)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img
          src="/contact.png"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-white text-7xl md:text-8xl font-bold mb-6 tracking-wide drop-shadow-2xl">
            CONTACT US
          </h1>
          <p className="text-white/95 text-xl md:text-2xl font-light leading-relaxed">
            Connect with our team across multiple locations and let us help you achieve your goals
          </p>
        </div>
      </section>

      {/* Branch Selector */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">Our Branches</h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-[#FF3600] to-[#e14a0d] mx-auto mb-8 rounded-full"></div>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Choose your preferred location to view details and get in touch with our expert team
            </p>
          </div>

          {/* Branch Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {branches.map((branch) => (
              <div
                key={branch.name}
                onClick={() => {
  setSelectedBranch(branch);
  setFormData((prev) => ({ ...prev, branch: branch.name }));
}}

                className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  selectedBranch.name === branch.name
                    ? "shadow-2xl shadow-[#FF3600]/20 ring-4 ring-[#FF3600]/30"
                    : "shadow-xl hover:shadow-2xl"
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={branch.image}
                    alt={`${branch.name} Office`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Branch Type Badge */}
                  {branch.type === "Head Office" && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <FaCrown className="text-xs" />
                      HQ
                    </div>
                  )}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{branch.name}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <FaBuilding className="text-[#FF3600]" />
                    <span>{branch.type || "Branch Office"}</span>
                  </div>
                </div>
                
                {/* Selection Indicator */}
                {selectedBranch.name === branch.name && (
                  <div className="absolute inset-0 border-4 border-[#FF3600] rounded-2xl pointer-events-none">
                    <div className="absolute top-2 left-2 w-6 h-6 bg-[#FF3600] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Selected Branch Details */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="relative h-[300px]">
              <img
                src={selectedBranch.image}
                alt={`${selectedBranch.name} Detail`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-5xl font-bold text-white drop-shadow-lg">
                    {selectedBranch.name}
                  </h3>
                  {selectedBranch.type === "Head Office" && (
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                      <FaCrown />
                      HEAD OFFICE
                    </div>
                  )}
                </div>
                
                <div className="flex items-start gap-4 bg-black/40 backdrop-blur-sm rounded-2xl p-6 max-w-4xl">
                  <div className="bg-[#FF3600] p-3 rounded-full">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg mb-2">Address</h4>
                    <p className="text-white/90 text-lg leading-relaxed">
                      {selectedBranch.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
              <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF3600] to-[#e14a0d] mb-6 rounded-full"></div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Our friendly team would love to hear from you! Fill out the form and we'll get back to you within 24 hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "First Name", name: "firstName", type: "text" },
                    { label: "Last Name", name: "lastName", type: "text" },
                  ].map((field) => (
                    <div key={field.name} className="space-y-3">
                      <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                        <FaUser className="text-[#FF3600]" />
                        {field.label}*
                      </label>
                      <input
                        required
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3600] focus:border-[#FF3600] transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Branch Dropdown */}
<div className="space-y-3">
  <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
    <FaBuilding className="text-[#FF3600]" />
    Branch*
  </label>
  <select
    required
    name="branch"
    value={formData.branch}
    onChange={handleChange}
    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3600] focus:border-[#FF3600] bg-gray-50 focus:bg-white transition-all duration-300"
  >
    {branches.map((branch) => (
      <option key={branch.name} value={branch.name}>
        {branch.name}
      </option>
    ))}
  </select>
</div>


                {/* Email and Phone */}
                {[
                  { label: "Email Address", icon: <FaEnvelope />, name: "email", type: "email" },
                  { label: "Phone Number", icon: <FaPhone />, name: "phone", type: "tel" },
                ].map((field) => (
                  <div key={field.name} className="space-y-3">
                    <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                      <span className="text-[#FF3600]">{field.icon}</span>
                      {field.label}*
                    </label>
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3600] focus:border-[#FF3600] transition-all duration-300 bg-gray-50 focus:bg-white"
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}

                {/* Comments */}
                <div className="space-y-3">
                  <label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                    <FaComment className="text-[#FF3600]" />
                    Comments*
                  </label>
                  <textarea
                    required
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    rows="5"
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF3600] focus:border-[#FF3600] transition-all duration-300 bg-gray-50 focus:bg-white resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF3600] to-[#e14a0d] text-white font-bold py-4 px-6 rounded-xl hover:from-[#e14a0d] hover:to-[#cc2e00] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Modern Map Section */}
            <div className="space-y-8">
              {/* Location Header */}
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-gradient-to-r from-[#FF3600] to-[#e14a0d] p-4 rounded-2xl shadow-lg">
                      <FaMapMarkerAlt className="text-white text-2xl" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900">
                        {selectedBranch.name}
                      </h3>
                      <p className="text-gray-500 text-lg">{selectedBranch.type || "Branch Office"}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleExpandMap(selectedBranch)}
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-xl transition-all duration-300 group"
                      title="View on Google Maps"
                    >
                      <FaExpand className="text-gray-600 group-hover:text-[#FF3600] transition-colors" />
                    </button>
                    <button 
                      onClick={() => handleGetDirections(selectedBranch)}
                      className="bg-gradient-to-r from-[#FF3600] to-[#e14a0d] hover:from-[#e14a0d] hover:to-[#cc2e00] p-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                      title="Get Directions"
                    >
                      <FaDirections className="text-white" />
                    </button>
                  </div>
                </div>
                
                <div className="w-20 h-1.5 bg-gradient-to-r from-[#FF3600] to-[#e14a0d] mb-6 rounded-full"></div>
                
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FF3600] p-3 rounded-full shadow-lg">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">Office Address</h4>
                      <p className="text-gray-700 leading-relaxed text-base">
                        {selectedBranch.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Interactive Map Container */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-700 font-semibold">Live Location</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <div className="w-2 h-2 bg-[#FF3600] rounded-full"></div>
                      <span>Interactive Map</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <iframe
                    src={selectedBranch.mapSrc}
                    width="100%"
                    height="400"
                    allowFullScreen=""
                    loading="lazy"
                    title={`${selectedBranch.name} Interactive Map`}
                    className="w-full transition-all duration-300 group-hover:brightness-110"
                    style={{
                      border: 'none',
                      borderRadius: '0 0 1.5rem 1.5rem'
                    }}
                  ></iframe>
                  
                  {/* Map Overlay Info */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#FF3600] rounded-full flex items-center justify-center">
                          <FaMapMarkerAlt className="text-white text-sm" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm">{selectedBranch.name}</h4>
                          <p className="text-gray-600 text-xs">{selectedBranch.type || "Branch Office"}</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleGetDirections(selectedBranch)}
                        className="bg-[#FF3600] hover:bg-[#e14a0d] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-300"
                      >
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toast Container */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}