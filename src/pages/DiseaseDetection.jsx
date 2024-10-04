import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import Navbar from "../components/Navbar";

const DiseaseDetection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook
  
  const crops = ['Potato', 'Cassava', 'Tomato', 'Rice', 'Sugarcane'];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle navigation based on crop button clicked
  const handleButtonClick = (crop) => {
    switch (crop) {
      case 'Potato':
        navigate('/potato'); // Redirect to the Potato detection page
        break;
      case 'Cassava':
        navigate('/cassava'); // Redirect to the Cassava detection page
        break;
      case 'Tomato':
        navigate('/tomato'); // Redirect to the Tomato detection page
        break;
      case 'Rice':
        navigate('/rice'); // Redirect to the Rice detection page
        break;
      case 'Sugarcane':
        navigate('/sugarcane'); // Redirect to the Sugarcane detection page
        break;
      default:
        break;
    }
  };

  const filteredCrops = crops.filter(crop =>
    crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl p-4 bg-white rounded shadow">
          <div className="mb-4">
            <input
              id="search"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search crop..."
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
      </div>
    </>
  );
};

export default DiseaseDetection;
