import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Download, Plus, Minus, Shield, Zap, Star, Check } from 'lucide-react';

const AttachmentDetail = () => {
  const { attachmentId } = useParams();
  const [attachment, setAttachment] = useState(null);
  const [allAttachments, setAllAttachments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSimilarIndex, setCurrentSimilarIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [parsedFeatures, setParsedFeatures] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('https://asha-infracore-backend.onrender.com/api/attachments')
      .then(res => res.json())
      .then(data => {
        setAllAttachments(data);
        const found = data.find(
          a => a.name.toLowerCase().replace(/\s+/g, '-') === attachmentId
        );
        console.log("Fetched attachment:", found);
        setAttachment(found);
        if (found) {
          // Use the first available image, similar to ProductDetail
          const firstImage = [found.image1, found.image2, found.image3, found.image4, found.image].find(Boolean);
          setSelectedImage(firstImage || '/placeholder.jpg');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching attachment:', err);
        setLoading(false);
      });
  }, [attachmentId]);

  // Create thumbnails array similar to ProductDetail
  const thumbnails = [attachment?.image1, attachment?.image2, attachment?.image3, attachment?.image4, attachment?.image].filter(Boolean);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!attachment) return;

    try {
      let parsed = [];
      
      // Handle different data types for features
      if (!attachment.features) {
        parsed = [];
      } else if (typeof attachment.features === 'string') {
        // Check if it's invalid JSON like "[object Object]"
        if (attachment.features === '[object Object]' || attachment.features.includes('[object Object]')) {
          console.warn('Invalid features data detected:', attachment.features);
          parsed = [];
        } else {
          parsed = JSON.parse(attachment.features);
        }
      } else if (Array.isArray(attachment.features)) {
        // Already an array (from Supabase JSONB)
        parsed = attachment.features;
      } else if (typeof attachment.features === 'object') {
        // Single object, wrap in array
        parsed = [attachment.features];
      } else {
        parsed = [];
      }

      // Ensure we have valid feature objects
      parsed = parsed.filter(item => 
        item && 
        typeof item === 'object' && 
        item.title && 
        typeof item.title === 'string'
      );

      // Fill up to 4 features
      while (parsed.length < 4) {
        parsed.push({
          title: 'Feature Coming Soon',
          description: 'Stay tuned for more updates.'
        });
      }

      setParsedFeatures(parsed.slice(0, 4));
    } catch (err) {
      console.error('Error parsing features:', err);
      setParsedFeatures([
        { title: 'Feature Coming Soon', description: 'Stay tuned for more updates.' },
        { title: 'Feature Coming Soon', description: 'Stay tuned for more updates.' },
        { title: 'Feature Coming Soon', description: 'Stay tuned for more updates.' },
        { title: 'Feature Coming Soon', description: 'Stay tuned for more updates.' }
      ]);
    }
  }, [attachment]);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomLevel(2);
    } else {
      setZoomLevel(1);
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1.5) {
      setImagePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (zoomLevel > 1) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * -100;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -100;
      setImagePosition({ x, y });
    }
  };

  const similarAttachments = allAttachments.filter(
    (a) => a.category === attachment?.category && a.id !== attachment?.id
  );

  const visibleSimilar = similarAttachments.slice(currentSimilarIndex, currentSimilarIndex + 3);

  const getFeatureIcon = (index) => {
    const icons = [Shield, Zap, Star, Check];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#FF3600] border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 text-lg">Loading attachment details...</p>
        </div>
      </div>
    );
  }

  if (!attachment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Attachment Not Found</h2>
          <Link to="/" className="text-[#FF3600] hover:text-[#e84200] text-lg font-semibold transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image Gallery - Updated like ProductDetail */}
            <div className="space-y-6">
              <div className="relative group">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-2xl bg-white cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onClick={handleZoomToggle}
                >
                  <img 
                    src={selectedImage} 
                    alt="Main Attachment" 
                    className="w-full h-96 object-contain transition-transform duration-300 ease-out"
                    style={{
                      transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`
                    }}
                  />
                  
                  {/* Zoom Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                      className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                      className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                  
                  {/* Zoom Indicator */}
                  {zoomLevel > 1 && (
                    <div className="absolute bottom-4 left-4 bg-black/75 text-white px-3 py-1 rounded-full text-sm">
                      {Math.round(zoomLevel * 100)}%
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Grid - New addition like ProductDetail */}
                {thumbnails.length > 1 && (
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {thumbnails.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => handleImageClick(img)}
                        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                          selectedImage === img 
                            ? 'ring-4 ring-[#FF3600] shadow-lg scale-105' 
                            : 'ring-2 ring-gray-200 hover:ring-gray-300 hover:scale-102'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-20 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Attachment Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                  {attachment.name}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {attachment.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
               <Link
  to={`/get-quote?product=${encodeURIComponent(attachment?.name || '')}`}
  className="flex-1 bg-[#FF3600] text-white font-bold py-4 px-8 rounded-xl hover:bg-[#e84200] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
>
  Request a Quote
</Link>
                {attachment.pdf_url ? (
                  <a
                    href={attachment.pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-3 text-[#FF3600] font-bold py-4 px-8 rounded-xl border-2 border-[#FF3600] hover:bg-[#FF3600] hover:text-white transition-all duration-300"
                  >
                    <Download className="w-5 h-5" />
                    Download Leaflet
                  </a>
                ) : (
                  <button
                    disabled
                    className="flex-1 inline-flex items-center justify-center gap-3 text-gray-400 font-bold py-4 px-8 rounded-xl border-2 border-gray-300 cursor-not-allowed"
                  >
                    <Download className="w-5 h-5" />
                    No Leaflet Available
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modernized Features Section */}
      {parsedFeatures.length > 0 && (
        <div className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#FF3600] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FF3600] rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-[#FF3600]/10 px-6 py-3 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#FF3600] rounded-full animate-pulse"></div>
                <span className="text-[#FF3600] font-bold text-sm uppercase tracking-wider">Key Features</span>
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
                Why Choose the <span className="text-[#FF3600]">{attachment.name}</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the advanced features that make this attachment the perfect choice for your projects
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {parsedFeatures.map((item, idx) => {
                const title = item?.title?.trim?.() || 'Coming Soon';
                const description = item?.description?.trim?.() || 'More exciting features will be available soon.';

                return (
                  <div
                    key={idx}
                    className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 hover:border-[#FF3600]/20"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FF3600]/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon */}
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-[#FF3600] to-[#e84200] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <div className="text-white">
                          {getFeatureIcon(idx)}
                        </div>
                      </div>
                      {/* Number indicator */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {idx + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-black text-xl mb-4 text-gray-900 group-hover:text-[#FF3600] transition-colors duration-300">
                        {title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-sm">
                        {description}
                      </p>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF3600] to-transparent rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Specifications Section - Updated like ProductDetail */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-[#FF3600] mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-[#FF3600] rounded-lg"></div>
              {attachment.name} Specifications
            </h2>
            
            {attachment.spec_pdf_url ? (
              <a
                href={attachment.spec_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-[#FF3600] to-[#e84200] rounded-2xl p-6 text-white transition-all duration-300 hover:brightness-110 hover:shadow-lg transform hover:scale-105"
              >
                <p className="text-lg font-semibold flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  Download {attachment.name} Specifications PDF
                </p>
              </a>
            ) : (
              <div className="block bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl p-6 text-white opacity-60 cursor-not-allowed">
                <p className="text-lg font-semibold flex items-center gap-3">
                  <Download className="w-6 h-6" />
                  Specifications PDF not available for this attachment
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Attachments Section - Updated like ProductDetail */}
      {similarAttachments.length > 0 && (
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Similar Attachments</h2>
                <div className="w-24 h-1 bg-[#FF3600] rounded-full"></div>
              </div>
              <Link 
                to="/attachments" 
                className="text-[#FF3600] hover:text-[#e84200] font-bold text-lg transition-colors flex items-center gap-2"
              >
                View all
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <div className="flex items-center gap-6">
                {/* Left Arrow */}
                <button
                  onClick={() => setCurrentSimilarIndex(i => Math.max(i - 3, 0))}
                  disabled={currentSimilarIndex === 0}
                  className="flex-shrink-0 p-4 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-[#FF3600]" />
                </button>

                {/* Visible Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1">
                  {visibleSimilar.map(similar => (
                    <Link
                      key={similar.id}
                      to={`/attachments/${similar.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={similar.image1 || similar.image || '/placeholder.jpg'}
                          alt={similar.name}
                          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300 p-4"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF3600] transition-colors">
                          {similar.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {similar.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={() => setCurrentSimilarIndex(i => {
                    const nextIndex = i + 3;
                    const maxIndex = Math.max(0, Math.floor((similarAttachments.length - 1) / 3) * 3);
                    return Math.min(nextIndex, maxIndex);
                  })}
                  disabled={currentSimilarIndex + 3 >= similarAttachments.length}
                  className="flex-shrink-0 p-4 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-[#FF3600]" />
                </button>
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: Math.ceil(similarAttachments.length / 3) }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSimilarIndex(idx * 3)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      Math.floor(currentSimilarIndex / 3) === idx
                        ? 'bg-[#FF3600] scale-125'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentDetail;