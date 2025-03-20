import { useState } from 'react';

const Hero = () => {
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [adults, setadults]=useState('');
  const [children, setchildren]=useState('');
  const [rooms, setrooms]=useState('');
  const handleSearch = () => {
    console.log('Searching hotels for:', { location, checkInDate, checkOutDate });
  };

  return (
    <div className="relative bg-gray-900 text-white h-screen flex items-center justify-center">
      <div className="z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
        <p className="text-lg mb-6">Explore the best hotels at unbeatable prices!</p>
        <div className="flex justify-center gap-4">
          <input
            type="text"
            placeholder="Location"
            className="p-3 rounded-lg text-white  border-amber-50"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="date"
            placeholder="Check in"
            className="p-3 rounded-lg text-white border-amber-50"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Check out"
            className="p-3 rounded-lg text-white  border-amber-50"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
          <input
            type="number"
            placeholder="No. of Adults"
            className="p-3 rounded-lg text-white  border-amber-50"
            value={adults}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (Number(value) >= 0 && !value.startsWith('-'))) {
                setadults(value);
              }
            }}
            min='0'
            />
            <input
            type="number"
            className="p-3 rounded-lg text-white  border-amber-50"
            placeholder="No. of Children"
            value={children}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (Number(value) >= 0 && !value.startsWith('-'))) {
                setchildren(value);
              }
            }}
            min='0'
            />
            <input
            type="number"
            className="p-3 rounded-lg text-white  border-amber-50"
            placeholder="Rooms"
            value={rooms}
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || (Number(value) >= 0 && !value.startsWith('-'))) {
                setrooms(value);
              }
            }}
            min='0'
            />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
