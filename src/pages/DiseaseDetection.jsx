// DiseaseDetection.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Navbar from "../components/Navbar";
import Footer from '../components/Footer/Footer';

const DiseaseDetection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const crops = ['අරතාපල්', 'මඤ්ඤොක්කා', 'තක්කාලි', 'සහල්', 'උක්'];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle navigation based on crop button clicked
  const handleButtonClick = (crop) => {
    navigate(`/detect/${crop.toLowerCase()}`); // Navigate to the dynamic route with crop name
  };

  const filteredCrops = crops.filter(crop =>
    crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="w-full max-w-2xl p-4 mx-auto mt-40 bg-white rounded shadow ">
          <div className="mb-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="බෝගය සොයන්න..."
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredCrops.map(crop => (
              <button
                key={crop}
                onClick={() => handleButtonClick(crop)} // Handle button click for navigation
                className="p-4 text-black border border-gray-300 rounded shadow"
              >
                {crop}
              </button>
            ))}
          </div>
        </div>
        <Footer />
    </>
  );
};

export default DiseaseDetection;
