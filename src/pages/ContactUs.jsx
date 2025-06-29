import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

// Branch Data
const branches = [
  {
    name: "BENGALURU",
    type: "Head Office",
    image: "/bengaluru.png",
    address:
      "No.17, 4th Main Road, Vyalikaval, Hcbs Nagawara Village, Opp Manyata Tech Park, Bengaluru, Karnataka 560045",
    mapSrc:
      "https://www.google.com/maps?q=No.17,+4th+Main+Road,+Vyalikaval,+Bangalore&output=embed",
  },
  {
    name: "SHIVAMOGGA",
    image: "/shivamogga.png",
    address:
      "Auto Complex, 1st Cross, Sagar Road, KIADB Auto Complex, Vinoba Nagara, Shivamogga, Karnataka 577204",
    mapSrc:
      "https://www.google.com/maps?q=KIADB+Auto+Complex,+Shivamogga&output=embed",
  },
  {
    name: "MANGALURU",
    image: "/mangaluru.png",
    address:
      "Door no. 6-109/2, Ground Floor, Saraswathi Building, Village Kavoor, Mangaluru, Karnataka 575015",
    mapSrc: "https://www.google.com/maps?q=Village+Kavoor,+Mangaluru&output=embed",
  },
];

export default function ContactUs() {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]);

  return (
    <div className="text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center">
        <img
          src="/hero.png"
          alt="Contact Hero"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        <h1 className="relative z-10 text-white text-5xl font-bold">CONTACT US</h1>
      </section>

      {/* Branches Section */}
      <section className="py-10 px-4 text-center">
        <h2 className="text-3xl font-bold text-[#FF3600] mb-4">Our Branches</h2>

        <div className="flex justify-center gap-3 flex-wrap mb-6">
          {branches.map((branch) => (
            <button
              key={branch.name}
              onClick={() => setSelectedBranch(branch)}
              className={`px-4 py-2 rounded border transition ${
                selectedBranch.name === branch.name
                  ? "bg-[#FF3600] text-white"
                  : "border-[#FF3600] text-[#FF3600] hover:bg-[#FF3600] hover:text-white"
              }`}
            >
              {branch.name}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[400px] rounded shadow overflow-hidden">
            <img
              src={selectedBranch.image}
              alt={`${selectedBranch.name} Map`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <h3 className="text-white text-4xl font-bold drop-shadow-lg">
                {selectedBranch.name}
              </h3>
            </div>
            <div className="absolute bottom-4 left-4 text-white font-semibold text-left bg-black/50 p-2 rounded z-10">
              {selectedBranch.address}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="flex flex-wrap justify-center bg-white p-8">
        <div className="w-full md:w-1/2 p-4 max-w-[500px]">
          <h2 className="text-3xl font-bold text-[#FF3600] mb-2">Get in Touch</h2>
          <p className="mb-4">Our friendly team would love to hear from you!</p>

          <form className="flex flex-col gap-4">
            {[
              { label: "First Name", icon: <FaUser />, name: "firstName" },
              { label: "Last Name", icon: <FaUser />, name: "lastName" },
              { label: "Email Address", icon: <FaEnvelope />, name: "email" },
              { label: "Phone Number", icon: <FaPhone />, name: "phone" },
              { label: "Comments", icon: <FaComment />, name: "comments" },
            ].map((field, idx) => (
              <div key={idx} className="flex flex-col text-left">
                <label className="text-[#FF3600] text-sm mb-1 flex items-center gap-1">
                  {field.icon} {field.label}*
                </label>
                {field.label === "Comments" ? (
                  <textarea
                    rows="3"
                    name={field.name}
                    className="p-2 border border-gray-300 rounded focus:border-[#FF3600]"
                    placeholder={`Enter your ${field.label}`}
                  />
                ) : (
                  <input
                    type="text"
                    name={field.name}
                    className="p-2 border border-gray-300 rounded focus:border-[#FF3600]"
                    placeholder={`Enter your ${field.label}`}
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              className="bg-[#FF3600] text-white py-2 rounded hover:bg-[#e14a0d] transition"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 p-4 max-w-[500px]">
          <iframe
            src={selectedBranch.mapSrc}
            width="100%"
            height="400"
            allowFullScreen=""
            loading="lazy"
            className="rounded shadow"
            title={`${selectedBranch.name} Map`}
          ></iframe>
        </div>
      </section>
    </div>
  );
}
