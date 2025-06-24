import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FF3600] text-white">
      {/* Call to Action Section */}
      <div className="flex justify-center items-center h-3 ">
  <div className="bg-black text-white text-center px-30 py-4  rounded-xl border-2 border-white shadow-md">
    <h2 className="text-2xl md:text-3xl font-bold leading-tight">
      Ready to power your next project?
    </h2>
  </div>
</div>


      {/* Main Footer Content */}
      <div className="px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-start justify-between gap-8">
            
            {/* Company Info */}
            <div className="flex-shrink-0">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/logo asha.png" alt="Asha Infracore Logo" className="w-full h-full object-contain" />
                </div>

              <img src="/logo text.png" alt="Asha Infracore" className="h-5 w-auto" />
              </div>
              <div className="text-s leading-relaxed mb-4 ml-3 max-w-xs">
                <p>No.17, 4th Main Road, Vyalikaval,</p>
                <p>HCBS Hesarghatta Village Opposite</p>
                <p>Manyata Tech Park, Nagavara,</p>
                <p>Bengaluru- 560032 Karnataka, India</p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
   className="w-8 h-8  flex items-center justify-center hover:bg-gray-100 transition-colors">
  <img src="/Instagram 1.png" alt="Instagram" className="w-6 h-6 object-contain" />
</a>

<a href="mailto:info@ashainfracore.com"
   className="w-8 h-8  flex items-center justify-center hover:bg-gray-100 transition-colors">
  <img src="/Gmail 1.png" alt="Email" className="w-6 h-6 object-contain" />
</a>

<a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
   className="w-8 h-8  flex items-center justify-center hover:bg-gray-100 transition-colors">
  <img src="/Facebook 1.png" alt="Facebook" className="w-6 h-6 object-contain" />
</a>

              </div>
            </div>

            {/* Quick Links */}
            <div className="flex-shrink-0">
              <h3 className="text-lg font-semibold mb-3 pt-5">Quick Links</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-gray-200 transition-colors">Machinery</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Attachment</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Parts</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">About us</a></li>
              </ul>
            </div>

            {/* Our Branches */}
            <div className="flex-shrink-0">
              <h3 className="text-lg font-semibold mb-3 pt-5">Our Branches</h3>
              <ul className="space-y-1 text-sm">
                <li><a href="#" className="hover:text-gray-200 transition-colors">Bengaluru (Head Office)</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Mangaluru</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Shivamogga</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Kolar</a></li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex-shrink-0">
              <h3 className="text-lg font-semibold mb-3 ml-16 pt-5">Contact Us</h3>
              <div className="text-sm mb-3">
<input
  type="email"
  placeholder="Enter Your Email Address"
  className="w-60 px-5 py-2 bg-white rounded mb-2 outline-none placeholder-gray-500 text-black"
/>

</div>

              <button className="bg-white text-red-600 ml-16 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors text-sm">
                Notify Me
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="bg-red-700 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>&copy; 2024 Asha Infracore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;