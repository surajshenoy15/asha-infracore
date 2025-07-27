import React, { useState } from 'react';
import {
  ChevronDown,
  Play,
  Download,
  Globe,
  Mail,
  Phone,
  MessageCircle,
  Users,
  Award,
  Target,
  CheckCircle
} from 'lucide-react';

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState(null);

  const stats = [
    { number: "20+", label: "Years Experience", icon: Award },
    { number: "500+", label: "Projects Completed", icon: Target },
    { number: "50+", label: "Global Partners", icon: Globe },
    { number: "1000+", label: "Happy Clients", icon: Users }
  ];

  const factsheetData = [
    { label: 'Nature of Business', value: 'Service Provider and Others' },
    { label: 'Additional Business', value: 'Recipient of Goods or Services' },
    { label: 'Company CEO', value: 'K. K. Shetty' },
    { label: 'Registered Address', value: 'No.17, 4th Main Road, Vyalikaval, HCBS Nagawara Village Opposite Manyata Tech Park, Nagawara, Bengaluru-560078, Karnataka' },
    { label: 'Employees', value: '26 to 50 People' },
    { label: 'GST Registration Date', value: '01-07-2017' },
    { label: 'Legal Status of Firm', value: 'Proprietorship' },
    { label: 'Annual Turnover', value: '₹5 - 25 Cr' },
    { label: 'GST Partner Name', value: 'Kamalaksha Karunakara Shetty' }
  ];

  const statutoryData = [
    { label: 'Tax No.', value: 'BLNPS**' },
    { label: 'Banker', value: 'KARNATAKA BANK' },
    { label: 'GST No.', value: '29AAHCS8361N2P' }
  ];

  const paymentMethods = ['Cash', 'Credit Card', 'Cheque', 'Bank Transfer', 'DD'];

  return (
    <div className="font-sans text-[#393432] bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section
  className="relative w-full h-[500px] flex items-center justify-start pl-10 sm:pl-16 md:pl-24 lg:pl-32 overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: "url('/about.png')" }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 opacity-10" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

  {/* Animated background elements */}
  <div className="absolute inset-0 opacity-10">
    <div className="absolute top-20 left-20 w-32 h-32 bg-white/20 rounded-full blur-3xl animate-pulse" />
    <div
      className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse"
      style={{ animationDelay: '2s' }}
    />
  </div>

  <div className="relative z-20 text-left">
    <h1 className="text-white text-7xl font-bold mb-4 tracking-tight">
      ABOUT US
    </h1>
    <div className="w-24 h-1 bg-[#FF3600] rounded-full mt-2" />
  </div>
</section>




      {/* Company Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-[#FF3600] text-6xl font-bold mb-8 tracking-tight">
            Asha Infracore
          </h2>
          <p className="text-[#393432] text-xl max-w-5xl mx-auto leading-relaxed opacity-90">
            Established in 2010 in Bangalore, we are the leading trader and authorized distributor of Doosan Infracore India Pvt. Ltd. 
            Specializing in earth service equipment including Hydraulic Excavators, Air Compressors, Crusher Buckets, Wheel Loaders, 
            Earthmoving Attachments, Water Well Compressors, and Angle Broom Attachments.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100 hover:border-[#FF3600]/20">
                <div className="w-16 h-16 bg-[#FF3600]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FF3600]/20 transition-colors">
                  <stat.icon className="w-8 h-8 text-[#FF3600]" />
                </div>
                <div className="text-[#FF3600] text-5xl font-bold mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-[#393432] font-semibold text-lg">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <button className="group bg-[#FF3600] text-white px-10 py-4 rounded-full hover:bg-[#e6531a] transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105">
            <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Watch Our Story
          </button>
          <button className="group bg-white text-[#FF3600] border-2 border-[#FF3600] px-10 py-4 rounded-full hover:bg-[#FF3600] hover:text-white transition-all duration-300 font-semibold flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105">
            <Download className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
            Download Brochure
          </button>
        </div>
      </section>

      {/* Our Team Section */}
     {/* Founder & CEO Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[#FF3600] text-5xl font-bold mb-4">
              Our Visionary Leader
            </h2>
            <div className="w-24 h-1 bg-[#FF3600] mx-auto rounded-full mb-6" />
            <p className="text-[#393432] text-xl opacity-80 max-w-3xl mx-auto">
              Meet the driving force behind Asha Infracore's success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* CEO Photo */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3600]/20 to-blue-600/20 rounded-3xl blur-3xl opacity-40 scale-105" />
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="K.K. Shetty - Founder & CEO"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-[#FF3600] text-white p-4 rounded-2xl shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* CEO Information */}
            <div className="text-[#393432] space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-[#393432]">
                  K.K. Shetty
                </h3>
                <div className="text-xl font-semibold text-[#FF3600]">
                  Founder & CEO
                </div>
                <div className="w-16 h-1 bg-[#FF3600] rounded-full" />
              </div>

              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  With over two decades of experience in the construction equipment industry, 
                  K.K. Shetty has been the cornerstone of Asha Infracore's remarkable journey 
                  since its establishment in 2010.
                </p>
                <p>
                  Under his visionary leadership, the company has grown from a small venture 
                  to become a leading authorized distributor of Doosan Infracore India Pvt. Ltd., 
                  serving clients across the nation with premium quality earth service equipment.
                </p>
                <p>
                  His commitment to excellence and customer satisfaction has established 
                  Asha Infracore as a trusted name in the industry, with a proven track record 
                  of delivering innovative solutions and maintaining long-term partnerships.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-[#FF3600] mb-2">15+</div>
                  <div className="text-sm font-semibold text-[#393432]">Years in Leadership</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
                  <div className="text-3xl font-bold text-[#FF3600] mb-2">500+</div>
                  <div className="text-sm font-semibold text-[#393432]">Projects Delivered</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {['Visionary', 'Experienced', 'Customer-Focused', 'Industry Expert'].map((tag, index) => (
                  <span key={index} className="bg-white text-[#FF3600] px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#FF3600] text-5xl font-bold mb-12 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-[#393432] text-lg leading-relaxed space-y-6">
              <p className="text-xl font-medium text-[#FF3600] mb-4">
                Excellence Through Expertise
              </p>
              <p>
                Our team of skilled professionals drives our success through dedication and expertise. 
                Each member brings valuable experience and specialized skills to meet our organizational goals 
                and deliver premium quality products to our clients.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                {['Experienced', 'Dedicated', 'Skilled', 'Professional'].map((tag, index) => (
                  <span key={index} className="bg-[#FF3600]/10 text-[#FF3600] px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF3600]/20 to-blue-600/20 rounded-2xl blur-3xl opacity-30 scale-105" />
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Our Team"
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vendor Network Section */}
   <section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-[#FF3600] text-5xl font-bold mb-12 text-center">
      Our Trusted Vendor Network
    </h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      {/* Image Column */}
      <div className="flex justify-center">
        <img
          src="/bobcat.png" // Make sure the image is in public folder and path is correct
          alt="Bobcat Vendor"
          className="w-full max-w-sm rounded-3xl shadow-xl object-contain"
        />
      </div>

      {/* Text Content */}
      <div className="text-[#393432] text-lg leading-relaxed space-y-6">
        <p className="text-xl font-medium text-[#FF3600] mb-4">
          Quality Through Partnership
        </p>
        <p>
          Our extensive vendor network enables us to deliver excellence consistently. 
          We partner with renowned manufacturers known for superior quality products, 
          ensuring we meet both bulk and urgent client requirements efficiently.
        </p>
        <div className="flex items-center space-x-3 mt-6">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="font-semibold">Quality Assured Products</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <span className="font-semibold">Reliable Supply Chain</span>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* Company Factsheet Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-[#FF3600] text-5xl font-bold mb-12 text-center">
            Company Factsheet
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
                <h3 className="text-[#393432] text-2xl font-bold">Basic Information</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {factsheetData.map(({ label, value }, idx) => (
                  <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="text-sm font-bold text-[#FF3600] mb-2">{label}</div>
                    <div className="text-[#393432] font-medium">{value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Company USP */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6">
                  <h3 className="text-[#393432] text-2xl font-bold">Company USP</h3>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <div>
                      <div className="font-bold text-[#393432]">Quality Machinery & Testing Facilities</div>
                      <div className="text-green-600 font-medium">Available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statutory Profile */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6">
                  <h3 className="text-[#393432] text-2xl font-bold">Statutory Profile</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {statutoryData.map(({ label, value }, idx) => (
                    <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="text-sm font-bold text-[#FF3600] mb-2">{label}</div>
                      <div className="text-[#393432] font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Shipment */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6">
                  <h3 className="text-[#393432] text-2xl font-bold">Payment & Shipment</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="font-bold text-[#FF3600] mb-3">Payment Methods</div>
                    <div className="flex flex-wrap gap-2">
                      {paymentMethods.map((method, idx) => (
                        <span key={idx} className="bg-[#FF3600]/10 text-[#FF3600] px-3 py-1 rounded-full text-sm font-medium">
                          {method}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-[#FF3600] mb-2">Banking Partner</div>
                    <div className="text-[#393432] font-medium">Karnataka Bank</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
