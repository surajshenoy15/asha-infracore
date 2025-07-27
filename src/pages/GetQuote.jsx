import React, { useState } from "react";
import {
  User, Mail, Phone, Building, MapPin,
  Globe, MessageSquare, Home, Send, CheckCircle
} from "lucide-react";

export default function GetQuote() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    street: "",
    city: "",
    zip: "",
    country: "",
    state: "",
    comments: ""
  });
  const [selectedInterest, setSelectedInterest] = useState("Backhoe Loaders");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const interests = [
    "Backhoe Loaders",
    "Skid-Steer Loaders",
    "Compact Track Loaders",
    "Compact Excavators",
    "Attachments"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone.replace(/\D/g, ''));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      setSubmitting(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch("https://asha-infracore-backend.onrender.com/api/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, productInterest: selectedInterest })
      });

      if (!res.ok) {
        throw new Error("Failed to submit quote.");
      }

      setSubmitted(true);

      // Reset form after success animation
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          street: "",
          city: "",
          zip: "",
          country: "",
          state: "",
          comments: ""
        });
        setSelectedInterest("Backhoe Loaders");
        setSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a problem submitting the form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md mx-auto transform animate-pulse">
          <div className="w-20 h-20 bg-gradient-to-r from-[#ff3600] to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Success!</h2>
          <p className="text-gray-600 text-lg">Your quote request has been submitted successfully. Our dealer will contact you soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#ff3600]/10 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-100/30 to-[#ff3600]/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#ff3600] to-orange-500 rounded-2xl mb-6 shadow-lg">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
              Get Your Price Quote
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Complete the form below and our expert dealers will reach out to discuss your equipment needs and provide a personalized quote.
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="space-y-8">
                {/* Product Interests */}
                <div className="space-y-4">
                  <label className="block text-gray-800 text-lg font-semibold">
                    Product Interests*
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => (
                      <label
                        key={interest}
                        className={`cursor-pointer px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                          selectedInterest === interest
                            ? "bg-gradient-to-r from-[#ff3600] to-orange-500 text-white shadow-lg shadow-orange-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-[#ff3600] hover:to-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-200 border-2 border-transparent hover:border-orange-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="product_interest"
                          value={interest}
                          checked={selectedInterest === interest}
                          onChange={() => setSelectedInterest(interest)}
                          className="sr-only"
                        />
                        {interest}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-800 text-sm font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                  />
                </div>

                {/* Phone & Company */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <Building className="w-4 h-4 text-white" />
                      </div>
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Street Address */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-800 text-sm font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                      <Home className="w-4 h-4 text-white" />
                    </div>
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                  />
                </div>

                {/* City & Zip */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      Zip Code*
                    </label>
                    <input
                      type="text"
                      name="zip"
                      required
                      value={formData.zip}
                      onChange={handleChange}
                      placeholder="12345"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Country & State */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <Globe className="w-4 h-4 text-white" />
                      </div>
                      Country*
                    </label>
                    <input
                      type="text"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Your country"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center text-gray-800 text-sm font-semibold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      State*
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Your state"
                      className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div className="space-y-3">
                  <label className="flex items-center text-gray-800 text-sm font-semibold">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#ff3600] to-orange-500 flex items-center justify-center mr-3">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    Additional Comments
                  </label>
                  <textarea
                    name="comments"
                    rows={5}
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Tell us about your specific needs, timeline, or any questions you have..."
                    className="w-full px-4 py-4 bg-gray-50/80 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:border-[#ff3600] focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-[#ff3600] to-orange-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-5 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-200 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:transform-none disabled:shadow-none flex items-center justify-center space-x-3 text-lg"
                  >
                    {submitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Quote Request</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}