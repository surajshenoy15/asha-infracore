import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import OurBranches from './OurBranches'; // Import the OurBranches component

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBranches, setShowBranches] = useState(false); // State to control branches modal/section

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // First, try to fetch featured products
      let { data: featuredData, error: featuredError } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (featuredError) {
        throw featuredError;
      }

      // If we have fewer than 3 featured products, fetch additional recent products
      if (!featuredData || featuredData.length < 3) {
        const { data: recentData, error: recentError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (recentError) {
          throw recentError;
        }

        // Combine featured and recent products, removing duplicates
        const allProducts = [...(featuredData || [])];
        const featuredIds = new Set(featuredData?.map(p => p.id) || []);
        
        const additionalProducts = (recentData || [])
          .filter(product => !featuredIds.has(product.id))
          .slice(0, 3 - (featuredData?.length || 0));

        allProducts.push(...additionalProducts);
        setProducts(allProducts); // Limit to 3 products max
      } else {
        setProducts(featuredData.slice(0, 3)); // Limit to 3 products max
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load featured products');
      
      // Fallback: try to fetch any products if featured query fails
      try {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!fallbackError && fallbackData) {
          setProducts(fallbackData);
          setError(null);
        }
      } catch (fallbackError) {
        console.error('Fallback query also failed:', fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to generate product URL slug
  const generateProductSlug = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")                      // Remove accents/diacritics
    .replace(/[\u0300-\u036f]/g, '')      // Strip combining marks
    .replace(/[^a-z0-9\s-]/g, '')         // Remove special characters
    .trim()
    .replace(/\s+/g, '-')                 // Replace spaces with hyphens
    .replace(/-+/g, '-');                 // Collapse multiple hyphens

  // Function to handle showing branches
  const handleShowBranches = () => {
    setShowBranches(true);
  };

  // Function to close branches modal/section
  const handleCloseBranches = () => {
    setShowBranches(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
  className="relative bg-cover bg-center bg-no-repeat text-white py-24"
  style={{
    backgroundImage: "url('/categories/landscaping-1.png')", // ✅ Place this image in /public/
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 "></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
    <div className="text-left">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">
        EXPERIENCE THE STRENGTH<br />
        <span className="text-[#FF3600]">OF BOBCAT LOADERS</span>
      </h1>
      <p className="text-xl mb-8 max-w-3xl drop-shadow-md">
        Dedicated to Community Empowerment and Eco-Conscious Growth.<br />
        Doosan Bobcat remains firmly committed to driving sustainable progress.
      </p>
      
      <div className="space-x-4">
  <Link to="/get-quote">
    <button className="bg-[#FF3600] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
      GET QUOTE
    </button>
  </Link>

  <Link
    to="/contact"
    className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors"
  >
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
            {/* Loaders */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gray-300">
                <img src="./quality loader.png" alt="Loaders" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Loaders</h3>
                <Link
                  to="/loaders"
                  className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-block transition-colors"
                >
                  See More
                </Link>
              </div>
            </div>

            {/* Attachments */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gray-300">
                <img src="./quality attachment.png" alt="Attachments" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Attachments</h3>
                <Link
                  to="/attachments"
                  className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-block transition-colors"
                >
                  See More
                </Link>
              </div>
            </div>

            {/* Mini Excavators */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gray-300">
                <img src="./quality mini.png" alt="Mini Excavators" className="w-full h-full object-cover" />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2">Mini Excavators</h3>
                <Link
                  to="/mini-excavators"
                  className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg inline-block transition-colors"
                >
                  See More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
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
    ) : error ? (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 font-semibold mb-2">Error Loading Products</p>
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter(product => product.name !== 'E37 Mini Excavators') // Exclude E37
          .sort((a, b) => {
            if (a.name.includes('T450')) return -1;
            if (b.name.includes('T450')) return 1;
            return 0;
          })
          .slice(0, 3)
          .map(product => {
            const isT450 = product.name.toLowerCase().includes('t450');
            const productUrl = isT450
              ? '/loaders/compact-track-loaders/t450-compact-track-loaders'
              : `/loaders/${product.category.toLowerCase().replace(/\s+/g, '-')}/${generateProductSlug(product.name)}`;

            return (
              <Link
                key={product.id}
                to={productUrl}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              >
                <div className="h-48 bg-gray-300 flex items-center justify-center overflow-hidden relative">
                  {product.image1 ? (
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div
                    className="w-full h-full flex items-center justify-center text-gray-600 font-semibold"
                    style={{ display: product.image1 ? 'none' : 'flex' }}
                  >
                    {product.name}
                  </div>
                  {product.featured && (
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {product.description || 'High-quality construction equipment for your needs.'}
                  </p>
                  <div className="flex justify-center items-center">
                    <button className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors w-full">
                      Learn More
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    )}
  </div>
</section>



      {/* About Section */}
      <section className="relative py-40 text-white overflow-hidden">
  {/* Background Image as img tag */}
  <img
    src="/categories/road-work.png" // ✅ Replace with your actual image path
    alt="Asha Infracore Background"
    className="absolute inset-0 w-full h-120 object-cover z-0"
  />
  {/* Overlay */}
  <div className="absolute inset-0  z-0"></div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
          Asha Infracore: <span className="text-[#FF3600]">Tough Machines,</span><br />
          Trusted Performance.
        </h2>
        <p className="text-lg mb-8 text-gray-200 drop-shadow-sm">
          For over a decade, Asha Infracore has been at the forefront of delivering
          high-performance construction and industrial machinery across Karnataka.
        </p>
        <Link
          to="/contact"
          className="bg-[#FF3600] hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition duration-300"
        >
          Contact Us
        </Link>
      </div>

      {/* Optional: Inline image on the right */}
      <div className="hidden md:block">
        {/* <img
          // src="/about-bg.png" // Optional branding or machine image
          alt="Machine Detail"
          className="h-90 w-full object-cover rounded-lg shadow-lg border border-white/10"
        /> */}
      </div>
    </div>
  </div>
</section>


      {/* Why Choose Us */}
      {/* Why Choose Us */}
{/* Why Choose Us */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why <span className="text-red-600">Asha Infracore?</span>
      </h2>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Branches */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
        <img src="./home-branches.png" alt="Branches" className="rounded-lg mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-bold mb-2">Our Branches</h3>
        <p className="text-gray-600 mb-4">We serve customers through 4 branches across Karnataka.</p>
        <Link
          to="/branches"
          className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
        >
          See More
        </Link>
      </div>

      {/* Warranty Services */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
        <img src="./home-warranty.png" alt="Warranty" className="rounded-lg mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-bold mb-2">Warranty Services</h3>
        <p className="text-gray-600 mb-4">Maximize your equipment's performance with our warranty plans.</p>
        <Link
          to="/services" // Make sure this route exists
          className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
        >
          See More
        </Link>
      </div>

      {/* About Us */}
      <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
        <img src="./home-about.png" alt="About Us" className="rounded-lg mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-bold mb-2">About Us</h3>
        <p className="text-gray-600 mb-4">Delivering top-tier construction and industrial solutions.</p>
        <Link
          to="/about-us"
          className="bg-[#FF3600] hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors inline-block"
        >
          See More
        </Link>
      </div>
    </div>
  </div>
</section>



      {/* OurBranches Modal/Section */}
      
    </div>
  );
};

export default Home;