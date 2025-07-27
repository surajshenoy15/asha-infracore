import React, { useEffect, useState } from 'react';
import { Download, ChevronRight, FileText, Shield, Users, Wrench, Clock } from 'lucide-react';



const WarrantyStdPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

 const documentSections = [
  {
    id: 'current-products',
    title: 'Current Products',
    icon: Shield,
    description: 'Warranty statements for products currently in production',
    documents: [
      { name: 'Skid-Steer Loader Warranty Statement (Purchased after January 1, 2016)', link: '/public//downloads/Current-Products/7412443enus-r-series-loader-warranty-02-20.pdf' },
      { name: 'Mini-Track Loader Warranty Statement (Purchased after January 1, 2016)', link: '/public/downloads/Current-Products/7345539enus-m2-series-loader-warranty-02-20.pdf' },
      { name: 'Electric Excavator Warranty Statement', link: '/public/downloads/Current-Products/7473116enus-bobcat-electric-mex-warranty-04-22.pdf' },
      { name: 'Excavator Warranty Statement (Purchased after January 1, 2016)', link: '/public/downloads/Current-Products/7345540enus-excavator-warranty.pdf' },
      { name: 'VersaHANDLER Warranty Statement (Purchased after January 1, 2016)', link: '/public/downloads/Current-Products/7345542enus-versahandler-warranty.pdf' },
      { name: 'Attachment Warranty Statement (Purchased after January 1, 2023)', link: '/public/downloads/Current-Products/7509413enus-attachment-warranty-11-22.pdf' },
      { name: 'Front Mount/Mid Mount PTO Driven Attachment Warranty Statement', link: '/public/downloads/Current-Products/6990619enus-attachment-with-PTO-warranty.pdf' },
      { name: 'Three-Point/PTO Driven Implements Warranty Statement (Purchased after January 1, 2020)', link: '/public/downloads/Current-Products/7510448enus-3pt-pto-implement-warranty-1-22.pdf' },
      { name: 'Max/Coastal Remote Operation Kit Warranty Statement', link: '/public/downloads/Current-Products/7481746enus-maxcontrol-remote-kit-warranty-03-22.pdf' },
    ],
  },
  {
    id: 'current-emissions',
    title: 'Emissions Warranty',
    icon: FileText,
    description: 'Engine emissions warranty for current production engines',
    documents: [
      { name: 'Bobcat Engine (D18, D24) Warranty Statement (MY20-MY25)', link: '/public/downloads/Emissions-Warranty/6990972enus-bobcat-engine-d18-d24-emissions-warranty-my23-my25.pdf' },
      { name: 'Bobcat Engine (D24 with EGR with SCR) Warranty Statement (MY23-MY26)', link: '/public/downloads/Emissions-Warranty/7280590enus-bobcat-engine-d34withscr-emissions-warranty-my23-my25.pdf' },
      { name: 'Bobcat Engine (D34 with EGR without SCR) Warranty Statement (MY22-MY25)', link: '/public/downloads/Emissions-Warranty/7309634enus-bobcat-engine-d34withoutscr-emissions-warranty-my23-my25.pdf' },
      { name: 'Bobcat Engine (D34 without EGR with SCR) Warranty Statement (MY23-MY25)', link: '/public/downloads/Emissions-Warranty/7280590enus-bobcat-engine-d34withscr-emissions-warranty-my23-my25 (1).pdf' },
      { name: 'Kubota Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/6990354enus-kubota-emissions-warranty-10-22.pdf' },
      { name: 'Yanmar Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/6990451enus-yanmar-engine-emissions-warranty-11-22.pdf' },
      { name: 'Perkins Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/6990738enus-polaris-engine-emissions-warranty-03-19.pdf' },
      { name: 'Perkins Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/7395377enus-perkins-engine-emissions-warranty-11-22.pdf' },
      { name: 'Bobcat Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/7396436enus-shibaura-engine-emissions-warranty-08-19.pdf' },
      { name: 'Bobcat Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/7464737enus-daedong-emissions-warranty-09-22.pdf' },
      { name: 'Doosan Compact Tractor Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/7392472enus-daedong-emissions-warranty-tractor-11-22.pdf' },
      { name: 'All High-Tech Corporation (HTC) Engine Warranty Statement', link: '/public/downloads/Emissions-Warranty/7396436enus-ihi-agri-tech-iat-corp-emissions-warranty-11-22.pdf' },
    ],
  },
  {
    id: 'non-current-products',
    title: 'Non-Current Warranty Statements',
    icon: FileText,
    description: 'Legacy product warranty statements for discontinued or older models',
    documents: [
      { name: 'Loader Warranty Statement - English (Purchased between January 1, 2014 - December 31, 2015)', link: '/public/downloads/Non-Current-Warranty/7345539enus-loader-warranty-jan18-dec18.pdf' },
      { name: 'Loader Warranty Statement - English (Purchased before January 1, 2016)', link: '/public/downloads/Non-Current-Warranty/6570162enus-loader-warranty-noncurrent.pdf' },
      { name: 'Excavator Warranty Statement - English (Purchased between January 1, 2014 - December 31, 2015)', link: '/public/downloads/Non-Current-Warranty/7345540enus-excavator-warranty-jan18-dec18.pdf' },
      { name: 'Excavator Warranty Statement - English (Purchased before January 1, 2014)', link: '/public/downloads/Non-Current-Warranty/6570375enus-excavator-warranty-noncurrent.pdf' },
      { name: 'VersaHANDLER Warranty Statement - English (Purchased before January 1, 2016)', link: '/public/downloads/Non-Current-Warranty/6987470enus-versahandler-warranty-noncurrent.pdf' },
      { name: 'Toolcat Utility Work Machine Warranty Statement - English (Purchased before January 1, 2016)', link: '/public/downloads/Non-Current-Warranty/6902334enus-utility-work-machine-warranty-noncurrent.pdf' },
      { name: 'Utility Vehicle MY13-MY14 Diesel Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/6990030enus-utility-vehicle-my13-my14-diesel-warranty-noncurrent.pdf' },
      { name: 'Utility Vehicle MY15-MY16 Gas Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/6990738enus-utility-vehicle-my13-my14-my15-gas-warranty-noncurrent.pdf' },
      { name: 'Utility Vehicle MY15-MY16 Diesel Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/7268904enus-utility-vehicle-my15-diesel-warranty-noncurrent.pdf' },
      { name: 'ZT2000, ZT3100, ZT3500 Mower - English', link: '/public/downloads/Non-Current-Warranty/4179354enus-zt6000-6100-7000-mower-warranty-statement-08-20-non-current.pdf' },
      { name: 'ZT6000 Mower - English', link: '/public/downloads/Non-Current-Warranty/4179362enus-zt3500-mower-warranty-statement-09-20-non-current.pdf' },
      { name: 'ZT7000 Mower - English', link: '/public/downloads/Non-Current-Warranty/4179361enus-zt3000-mower-warranty-statement-09-20-non-current.pdf' },
      { name: 'ZT8000 Mower - English', link: '/public/downloads/Non-Current-Warranty/4179363enus-zt2000-mower-warranty-statement-08-20-non-current.pdf' },
      { name: 'ZR2000 Mower - English', link: '/public/downloads/Non-Current-Warranty/4179360enus-zs4000-mower-warranty-statement-07-20-non-current.pdf' },
      { name: 'Attachment Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/6570124enus-attachment-warranty-noncurrent.pdf' },
      { name: 'Front Mount/Mid Mount PTO Driven Attachment Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/6990619-attachment-with-PTO-warranty-noncurrent.pdf' },
      { name: 'Three-Point/PTO Driven Implements Warranty Statement - English', link: '/public/downloads/Non-Current-Warranty/6990031enus-3pt-pto-implement-warranty-noncurrent.pdf' },
      { name: 'Attachment Warranty Statement (Purchased before January 1, 2023)', link: '/public/downloads/Non-Current-Warranty/6570124enus-attachment-warranty-noncurrent (1).pdf' },
    ],
  },
  {
  id: 'non-current-emissions',
  title: 'Non-Current Products (Emissions)',
  icon: Clock,
  description: 'Warranty statements for products no longer in production (Emissions-related)',
  documents: [
    { name: 'Skid-Steer Loaders Tier 4 Final', link: '/public/downloads/non-current-emissions/6990972enus-bobcat-engine-d18-d24-emissions-warranty-my20-my22.pdf' },
    { name: 'Compact Track Loaders Tier 4 Final', link: '/public/downloads/non-current-emissions/6990972enus-bobcat-engine-d18-d24-emissions-warranty-my18-my20-noncurrent.pdf' },
    { name: 'Mini Excavators Tier 4 Final', link: '/public/downloads/non-current-emissions/6990972enus-bobcat-engine-d18-d24-emissions-warranty-my16-my18.pdf' },
    { name: 'Telehandlers Tier 4 Final', link: '/public/downloads/non-current-emissions/6990972enus-bobcat-engine-d18-d24-emissions-warranty-my14-my16.pdf' },
    { name: 'Backhoe Loaders Tier 4 Final', link: '/public/downloads/non-current-emissions/7280590enus-bobcat-engine-d34withscr-emissions-warranty-my20-my22.pdf' },
    { name: 'Utility Vehicles Tier 4 Final', link: '/public/downloads/non-current-emissions/7280590enus-bobcat-engine-d34withscr-emissions-warranty-my18-my20-noncurrent.pdf' },
    { name: 'Toolcat Tier 4 Final', link: '/public/downloads/non-current-emissions/7280590enus-bobcat-engine-d34withscr-emissions-warranty-my17-my19.pdf' },
    { name: 'Excavators Interim Tier 4', link: '/public/downloads/non-current-emissions/7280590enus-bobcat-engine-d34withscr-emisions-warranty-my15-my17.pdf' },
    { name: 'Loaders Interim Tier 4', link: '/public/downloads/non-current-emissions/7309634enus-bobcat-engine-d34withoutscr-emissions-warranty-my20-my22.pdf' },
    { name: 'Telehandlers Interim Tier 4', link: '/public/downloads/non-current-emissions/7309634enus-bobcat-engine-d34withoutscr-emissions-warranty-my18-my20-noncurrent.pdf' },
    { name: 'Backhoe Loaders Interim Tier 4', link: '/public/downloads/non-current-emissions/7309634enus-bobcat-engine-d34withoutscr-emissions-warranty-my16-my18.pdf' },
    { name: 'Excavators Tier 3', link: '/public/downloads/non-current-emissions/7309634esar-bobcat-engine-d34withoutscr-emissions-warranty-my16-my18.pdf' },
    { name: 'Loaders Tier 3', link: '/public/downloads/non-current-emissions/6990354enus-kubota-emissions-warranty-11-21-non-current.pdf' },
    { name: 'Telehandlers Tier 3', link: '/public/downloads/non-current-emissions/6990354enus-kubota-engine-emissions-warranty-12-20-noncurrent.pdf' },
    { name: 'Utility Vehicles Tier 3', link: '/public/downloads/non-current-emissions/6990354enus-kubota-engine-emissions-warranty-12-19-non-current.pdf' },
    { name: 'Toolcat Tier 3', link: '/public/downloads/non-current-emissions/6990354enus-kubota-engine-emissions-warranty-03-19-non-current.pdf' },
    { name: 'Backhoe Loaders Tier 3', link: '/public/downloads/non-current-emissions/6990354enus-kubota-engine-emissions-warranty-noncurrent-10-11.pdf' },
    { name: 'Loaders Tier 2', link: '/public/downloads/non-current-emissions/6990738enus-polaris-engine-emissions-warranty-noncurrent-01-13.pdf' },
    { name: 'Excavators Tier 2', link: '/public/downloads/non-current-emissions/6990451enus-yanmar-engine-emissions-warranty-03-19-non-current.pdf' },
    { name: 'Toolcat Tier 2', link: '/public/downloads/non-current-emissions/6990451enus-yanmar-engine-emissions-warranty-noncurrent-05-13.pdf' },
    { name: 'Telehandlers Tier 2', link: '/public/downloads/non-current-emissions/6990030enus-yanmar-engine-emissions-warranty-noncurrent-utv.pdf' },
    { name: 'Backhoe Loaders Tier 2', link: '/public/downloads/non-current-emissions/7392472enus-daedong-emissions-warranty-tractor-11-21-non-current.pdf' },
    { name: 'Utility Vehicles Tier 2', link: '/public/downloads/non-current-emissions/7464737enus-daedong-emissions-warranty-11-21-non-current.pdf' },
    { name: 'Skid-Steer Loaders Tier 2', link: '/public/downloads/non-current-emissions/7392472enus-daedong-engine-emissions-warranty-12-20-noncurrent.pdf' },
    { name: 'Track Loaders Tier 2', link: '/public/downloads/non-current-emissions/7392472enus-daedong-engine-emissions-warranty-03-20-noncurrent.pdf' },
    { name: 'Excavators Tier 1', link: '/public/downloads/non-current-emissions/7392472enus-daedong-engine-emissions-warranty-09-19-noncurrent.pdf' },
    { name: 'Backhoe Loaders Tier 1', link: '/public/downloads/non-current-emissions/7395377enus-perkins-engine-emissions-warranty-noncurrent.pdf' }
  ]
}
,
];

 

  return (
    <div className="bg-white min-h-screen">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <a href="/" className="hover:text-[#ff3600] transition-colors">Home</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="/services" className="hover:text-[#ff3600] transition-colors">Services</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-[#ff3600] font-medium">Warranty</span>
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div
          id="hero-section"
          data-animate
          className={`relative py-20 text-center transition-all duration-1200 ${
            isVisible['hero-section'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff3600]/5 via-white to-[#ff3600]/3 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center px-4 py-2 bg-[#ff3600]/10 text-[#ff3600] rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4 mr-2" />
              Warranty Protection
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
              Bobcat's
              <span className="block bg-gradient-to-r from-[#ff3600] to-[#ff5722] bg-clip-text text-transparent">
                Standard Warranty
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Comprehensive protection for your investment. Download our latest warranty documents and 
              terms to ensure your Bobcat equipment stays covered.
            </p>
            
            {/* Animated underline */}
            <div className="flex justify-center mt-10">
              <div className="relative">
                <div className="w-32 h-1 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-full"></div>
                <div className="absolute -top-1 left-0 w-8 h-3 bg-[#ff3600]/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Sections */}
        <div className="py-16 space-y-8">
          {documentSections.map((section, sectionIndex) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                id={section.id}
                data-animate
                className={`group transition-all duration-1000 delay-${sectionIndex * 100} ${
                  isVisible[section.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="bg-white rounded-3xl border border-gray-100 hover:border-[#ff3600]/20 transition-all duration-500 hover:shadow-2xl hover:shadow-[#ff3600]/10 overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-8 border-b border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#ff3600] to-[#ff5722] rounded-2xl mr-4 shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
                        <p className="text-gray-600 text-lg">{section.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Documents List */}
                  <div className="p-8">
                    <div className="grid gap-4">
                      {section.documents.map((doc, docIndex) => (
                        <div
                          key={docIndex}
                          className="group/doc flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-100 hover:border-[#ff3600]/30 hover:bg-gradient-to-r hover:from-[#ff3600]/5 hover:to-white transition-all duration-300 hover:shadow-lg"
                        >
                          <div className="flex items-center flex-grow">
                            <div className="flex items-center justify-center w-10 h-10 bg-[#ff3600]/10 rounded-xl mr-4 group-hover/doc:bg-[#ff3600]/20 transition-colors duration-300">
                              <FileText className="w-5 h-5 text-[#ff3600]" />
                            </div>
                            <span className="text-lg font-medium text-gray-800 group-hover/doc:text-gray-900">
                              {doc.name}
                            </span>
                          </div>
                          
                          <a
                            href={doc.link}
                            download
                            className="inline-flex items-center px-6 py-3 bg-[#ff3600] text-white font-semibold rounded-xl shadow-lg hover:bg-[#ff5722] hover:shadow-xl hover:shadow-[#ff3600]/25 focus:outline-none focus:ring-4 focus:ring-[#ff3600]/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5"
                            aria-label={`Download ${doc.name}`}
                          >
                            <Download className="w-5 h-5 mr-2" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Related Information Section */}
      
      </main>

      {/* Footer Accent */}
      <div className="h-2 bg-gradient-to-r from-[#ff3600] via-[#ff5722] to-[#ff3600]"></div>
    </div>
  );
};

export default WarrantyStdPage;