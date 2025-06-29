import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const S70SkidSteerLoader = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);

  const thumbnails = [
    "/s70-skid-steer-1.png",
    "/s70-1.png",
    "/s70-2.png",
    "/s70-3.png"
  ];

  const features = [
    {
      title: 'Uptime Protection',
      desc: 'Bobcat loaders are built for reliability along with minimal maintenance. Features like machine shutdown protection, extended maintenance intervals, cold weather protection, and a maintenance-free chaincase help maximize uptime and protect your productivity.'
    },
    {
      title: 'Tire Options',
      desc: 'A wide range of factory-installed tire options allows customization to suit specific job requirements and terrain.'
    },
    {
      title: 'Performance',
      desc: 'Optimized design, weight balance, and power distribution deliver strong breakout forces. Improved cycle times, reduced fuel use, and extends component life.'
    },
    {
      title: 'Attachment Versatility',
      desc: 'Bobcat loaders support a broad range of attachments, with features like quick couplers and control kits for added power—enhancing global fleet flexibility and efficiency.'
    }
  ];

  const similarModels = [
    {
      name: 'S70',
      title: 'S70 Skid-Steer Loader',
      subtitle: 'The Bobcat S70 Skid-Steer Loader is the machine for compact spaces',
      image: '/s70-skid-steer-1.png',
      horsepower: '23.5',
      capacity: '343',
      weight: '1268'
    },
    {
      name: 'S450',
      title: 'S450 Skid-Steer Loader',
      subtitle: 'The Bobcat S450 is the machine for loading, cleaning and carrying jobs.',
      image: '/s450-skid-steer-2.png',
      horsepower: '48.9',
      capacity: '608',
      weight: '2365'
    },
    {
      name: 'S770',
      title: 'S770 Skid-Steer Loader',
      subtitle: 'The Bobcat S770 Skid-Steer Loader is for big and powerful jobs.',
      image: '/s770-skid-steer-loader-1.png',
      horsepower: '93.3',
      capacity: '1520',
      weight: '4225'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/machinery" className="hover:underline">Machinery</Link>
            <span className="mx-2">/</span>
            <Link to="/loaders" className="hover:underline">Loaders</Link>
            <span className="mx-2">/</span>
            <Link to="/loaders/skid-steer-loaders" className="hover:underline">Skid-Steer Loaders</Link>
            <span className="mx-2">/</span>
            <span className="text-red-600 font-semibold">S70 Skid-Steer Loader</span>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image Preview */}
          <div>
            <div className="bg-white rounded-lg p-4 mb-4">
              <img
                src={thumbnails[selectedThumbnail]}
                alt={`Thumbnail ${selectedThumbnail + 1}`}
                className="w-full h-80 object-contain"
              />
            </div>
            <div className="flex gap-2">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedThumbnail(index)}
                  className={`w-20 h-20 border-2 rounded ${selectedThumbnail === index ? 'border-red-600' : 'border-gray-300'}`}
                >
                  <img src={thumb} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover rounded" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">S70 Skid-Steer Loader</h1>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              The Bobcat S70 skid-steer loader is compact, powerful, and built for tight spaces. Standing just 6 feet tall and 3 feet wide, it easily navigates through narrow openings like doorways, hallways, alleys, and gates.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded mb-4 transition-colors">
              Request a Quote
            </button>
            <br />
            <a href="/pdfs/s70-brochure.pdf" download className="text-red-600 hover:text-red-700 underline font-semibold inline-flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Leaflet
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Bobcat S70 Features</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="font-bold text-lg mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Models */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Similar Models</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {similarModels.map((model, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-6 text-center">
                  <img src={model.image} alt={model.title} className="w-full h-48 object-contain mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{model.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{model.subtitle}</p>
                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="font-semibold">Horsepower</span>
                      <span>{model.horsepower} hp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Rated Capacity</span>
                      <span>{model.capacity} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold">Operating Weight</span>
                      <span>{model.weight} kg</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="bg-black text-white text-center py-8 rounded-lg mt-16">
          <h2 className="text-3xl font-bold mb-2">Ready to power your next project?</h2>
          <p className="text-lg">Contact us today to get a personalized quote.</p>
        </div> */}
      </div>
    </div>
  );
};

export default S70SkidSteerLoader;
