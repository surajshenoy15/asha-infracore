  import React, { useEffect, useState } from 'react';
  import { Cookie, Shield, Settings, X } from 'lucide-react';

  const CookieConsent = () => {
    const [showPopup, setShowPopup] = useState(true); // Always show for demo
    const [showDetails, setShowDetails] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleAccept = () => {
      setIsAnimating(true);
      setTimeout(() => {
        // In a real app: localStorage.setItem('cookie_consent', 'true');
        setShowPopup(false);
      }, 300);
    };

    const handleDecline = () => {
      setIsAnimating(true);
      setTimeout(() => {
        // In a real app: localStorage.setItem('cookie_consent', 'false');
        setShowPopup(false);
      }, 300);
    };

    const handleCustomize = () => {
      setShowDetails(!showDetails);
    };

    if (!showPopup) return null;

    return (
      <div className={`fixed top-6 left-6 right-6 md:left-8 md:right-auto z-50 max-w-md transition-all duration-300 ${isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 shadow-2xl rounded-2xl overflow-hidden">
          {/* Header with gradient accent */}
          <div className="h-1 bg-gradient-to-r from-orange-500 via-red-500 to-red-600" style={{background: 'linear-gradient(90deg, #ff3600, #ff6b35)'}}></div>
          
          <div className="p-6">
            {/* Icon and title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl" style={{backgroundColor: 'rgba(255, 54, 0, 0.1)'}}>
                <Cookie className="w-5 h-5" style={{color: '#ff3600'}} />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg">Cookie Preferences</h3>
            </div>

            {/* Main content */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                {!showDetails && (
                  <button 
                    onClick={handleCustomize}
                    className="underline underline-offset-2 ml-1 transition-colors hover:opacity-80"
                    style={{color: '#ff3600'}}
                  >
                    Learn more
                  </button>
                )}
              </p>

              {/* Expandable details */}
              <div className={`overflow-hidden transition-all duration-300 ${showDetails ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="pt-2 space-y-3 border-t border-gray-200">
                  <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-gray-900 font-medium text-sm">Essential Cookies</h4>
                      <p className="text-gray-600 text-xs mt-1">Required for basic site functionality</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Settings className="w-4 h-4 mt-0.5 flex-shrink-0" style={{color: '#ff3600'}} />
                    <div>
                      <h4 className="text-gray-900 font-medium text-sm">Analytics Cookies</h4>
                      <p className="text-gray-600 text-xs mt-1">Help us understand how you use our site</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleDecline}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Decline All
                </button>
                
                {showDetails && (
                  <button
                    onClick={handleCustomize}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                    style={{backgroundColor: 'rgba(255, 54, 0, 0.1)', color: '#ff3600', border: '1px solid rgba(255, 54, 0, 0.3)'}}
                  >
                    Customize
                  </button>
                )}
                
                <button
                  onClick={handleAccept}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:opacity-90"
                  style={{backgroundColor: '#ff3600', boxShadow: '0 10px 25px rgba(255, 54, 0, 0.25)'}}
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDecline}
            className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Backdrop blur effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-200/20 to-transparent rounded-2xl"></div>
      </div>
    );
  };

  export default CookieConsent;