import React from 'react';
import { Link } from 'react-router-dom';
// import s450 from '../../../assets/products/s450.jpg';
// import s450Thumbs from '../../../assets/products/s450-thumbs.jpg';
// import s70 from '../../../assets/products/s70.jpg';
// import s770 from '../../../assets/products/s770.jpg';

const S450SkidSteerLoader = () => {
  return (
    <div className="p-8 bg-white min-h-screen text-gray-900">
      <div className="text-sm mb-4 text-gray-600">
        <Link to="/" className="hover:underline">Home</Link> /{' '}
        <Link to="/machinery" className="hover:underline">Machinery</Link> /{' '}
        <Link to="/loaders" className="hover:underline">Loaders</Link> /{' '}
        <Link to="/loaders/skid-steer-loaders" className="hover:underline">Skid-Steer Loaders</Link> /{' '}
        <span className="text-red-500 font-bold">S450 Skid-Steer Loader</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <img src={s450} alt="S450" className="w-full max-h-[400px] object-contain" />
          <div className="mt-4 flex gap-3">
            <img src={s450Thumbs} alt="Thumb" className="h-20 w-20 object-cover border" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">S450 Skid-Steer Loader</h1>
          <p className="mb-4 text-gray-700">
            The Bobcat S450 offers powerful performance in a small frame, ideal for residential construction, landscaping, and tight job sites.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded font-bold mb-2">
            Request a Quote
          </button>
          <br />
          <a href="/pdfs/s450-brochure.pdf" className="text-red-600 underline text-sm" download>
            Download Leaflet
          </a>
        </div>
      </div>

      <h2 className="text-xl font-bold mt-10 mb-3 text-red-600">Bobcat S450 Features</h2>
      <div className="grid md:grid-cols-4 gap-4">
        {[{
          title: 'Durable Frame',
          desc: 'Built tough for challenging terrain and job site conditions.',
        }, {
          title: 'Comfort Cabin',
          desc: 'Operator-focused controls and visibility with adjustable seating.',
        }, {
          title: 'Advanced Hydraulics',
          desc: 'Delivers higher breakout forces and cycle times.',
        }, {
          title: 'Compact Maneuverability',
          desc: 'Small footprint and tight turning radius.',
        }].map((f, i) => (
          <div key={i} className="bg-white shadow p-4 border rounded">
            <h3 className="font-bold mb-1">{f.title}</h3>
            <p className="text-sm text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-red-600">Similar Models</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[{
          name: 'S70 Skid-Steer Loader',
          image: s70,
          horsepower: '23.5',
          capacity: '343',
          weight: '1268',
        }, {
          name: 'S450 Skid-Steer Loader',
          image: s450,
          horsepower: '48.9',
          capacity: '608',
          weight: '2365',
        }, {
          name: 'S770 Skid-Steer Loader',
          image: s770,
          horsepower: '93.3',
          capacity: '1520',
          weight: '4225',
        }].map((item, index) => (
          <div key={index} className="border p-4 rounded shadow text-center">
            <img src={item.image} alt={item.name} className="h-32 mx-auto object-contain mb-2" />
            <h4 className="font-bold mb-1">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-2">The Bobcat {item.name.split(' ')[0]} is ideal for {item.name.includes('S770') ? 'powerful' : 'compact'} tasks.</p>
            <ul className="text-left text-sm text-gray-700 space-y-1">
              <li><strong>Horsepower:</strong> {item.horsepower} hp</li>
              <li><strong>Rated Capacity:</strong> {item.capacity} kg</li>
              <li><strong>Operating Weight:</strong> {item.weight} kg</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default S450SkidSteerLoader;
