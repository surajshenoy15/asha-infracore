// pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(6);
      
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              EXPERIENCE THE STRENGTH<br />
              <span className="text-red-500">OF BOBCAT LOADERS</span>
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Dedicated to Community Empowerment and Eco-Conscious Growth. 
              Doosan Bobcat remains firmly committed to driving sustainable progress.
            </p>
            <div className="space-x-4">
              <button className="bg-[#FF3600] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                GET QUOTE
              </button>
              <Link to="/contact" className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
                CONTACT US
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Quality You Can Trust, <span className="text-red-600">Always</span>
            </h2>
            <p className="text-xl text-gray-600">Bobcat Equipment Product Range</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Loader Image</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Loaders</h3>
                <Link to="/loaders" className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-block transition-colors">
                  See More
                </Link>
              </div>
            </div>


            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Attachment Image</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Attachments</h3>
                <Link to="/attachments" className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-block transition-colors">
                  See More
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600">Mini Excavator Image</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Mini Excavators</h3>
                <button className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured <span className="text-red-600">Products</span>
            </h2>
            <Link to="/loaders" className="text-red-600 hover:text-red-700 font-semibold">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-300 flex items-center justify-center">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-600">{product.name}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-red-600">
                        ₹{product.price?.toLocaleString()}
                      </span>
                      <button className="bg-[#FF3600] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Asha Infracore: <span className="text-red-500">Tough Machines,</span><br />
                Trusted Performance.
              </h2>
              <p className="text-lg mb-8 text-gray-300">
                For over a decade, Asha Infracore has been at the forefront of delivering 
                high-performance construction and industrial machinery across Karnataka. 
                Built for strength, efficiency, and reliability — our machines and implements 
                are engineered to handle every challenge on the field.
              </p>
              <Link to="/contact" className="bg-[#FF3600] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Machine Image</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-red-600">Asha Infracore?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="h-32 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-600">Branches</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Our Branches</h3>
              <p className="text-gray-600 mb-4">
                Asha Infracore proudly serves customers through four strategically located branches across Karnataka.
              </p>
              <button className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                See More
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="h-32 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-600">Warranty</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Warranty Services</h3>
              <p className="text-gray-600 mb-4">
                Asha Infracore offers robust warranty options designed to maximize your equipment's performance.
              </p>
              <button className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                See More
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="h-32 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-gray-600">About Us</span>
              </div>
              <h3 className="text-xl font-bold mb-2">About us</h3>
              <p className="text-gray-600 mb-4">
                Asha Infracore is committed to delivering top-tier construction and industrial solutions.
              </p>
              <button className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                See More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      
    </div>
  );
};

export default Home;