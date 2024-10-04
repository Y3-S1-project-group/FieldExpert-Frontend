// import React and useState from React
import { useState } from 'react';
import Navbar from "../components/Navbar";

const DiseaseDetection = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // List of crops
  const crops = ['Potato', 'Cassava', 'Tomato', 'Rice', 'Sugarcane'];

  // Function to handle search input
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered list based on search query
  const filteredCrops = crops.filter(crop =>
    crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl p-4 bg-white rounded shadow">
          {/* Search bar */}
          <div className="mb-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search crops..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Divs for filtered crops */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredCrops.map(crop => (
              <button
                key={crop}
                className="p-4 text-black border border-gray-300 rounded shadow"
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DiseaseDetection;
