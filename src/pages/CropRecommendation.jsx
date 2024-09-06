//CropRecommendation.jsx

import { useState } from "react";
import axios from "axios";


const CropRecommendation = () => {
  const [formData, setFormData] = useState({
    soil_type: "",
    climate: "",
    area: "",
    water_availability: "",
    previous_crops: "",
  });

  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Prepare the prompt for the API
    const prompt = `Given the following details, recommend the best crop for the farmer:
     - Soil Type: ${formData.soil_type}
     - Climate: ${formData.climate}
     - Area: ${formData.area} acres
     - Water Availability: ${formData.water_availability}
     - Previous Crops: ${formData.previous_crops || "None"}
     
     Provide the crop that would grow best under these conditions.`;
  
    try {
      // Call OpenAI API
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      // Get the recommendation from the response
      const cropRecommendation = response.data.choices[0].text.trim();
      setRecommendation(`Recommended Crop: ${cropRecommendation}`);
    } catch (error) {
      console.error("Error fetching crop recommendation:", error);
      setRecommendation("Failed to get recommendation. Please try again.");
    }
  
    setLoading(false);
  };

  return (
    <div className="px-4 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">Crop Recommendation Service</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
      >
        {/* Soil Type Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="soil_type"
            className="block text-sm font-medium text-gray-700"
          >
            Soil Type
          </label>
          <select
            id="soil_type"
            name="soil_type"
            value={formData.soil_type}
            onChange={handleChange}
            className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Silt">Silt</option>
            <option value="Peaty">Peaty</option>
            <option value="Loamy">Loamy</option>
          </select>
        </div>

        {/* Climate Dropdown */}
    <div className="mb-4">
      <label htmlFor="climate" className="block text-sm font-medium text-gray-700">
        Climate
      </label>
      <select
        id="climate"
        name="climate"
        value={formData.climate}
        onChange={handleChange}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select Climate</option>
        <option value="Tropical">Tropical</option>
        <option value="Subtropical">Subtropical</option>
        <option value="Temperate">Temperate</option>
        <option value="Arid">Arid</option>
        <option value="Humid">Humid</option>
      </select>
    </div>

        {/* Area Input */}
    <div className="mb-4">
      <label htmlFor="area" className="block text-sm font-medium text-gray-700">
        Area (in acres)
      </label>
      <input
        type="number"
        id="area"
        name="area"
        value={formData.area}
        onChange={handleChange}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      />
    </div>

        {/* Water Availability Dropdown */}
    <div className="mb-4">
      <label htmlFor="water_availability" className="block text-sm font-medium text-gray-700">
        Water Availability
      </label>
      <select
        id="water_availability"
        name="water_availability"
        value={formData.water_availability}
        onChange={handleChange}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        required
      >
        <option value="">Select Water Availability</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

        {/* Previous Crops Input */}
    <div className="mb-4">
      <label htmlFor="previous_crops" className="block text-sm font-medium text-gray-700">
        Previous Crops
      </label>
      <input
        type="text"
        id="previous_crops"
        name="previous_crops"
        value={formData.previous_crops}
        onChange={handleChange}
        className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>

    <button
      type="submit"
      className="col-span-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      {loading ? 'Fetching Recommendation...' : 'Get Recommendation'}
    </button>
      </form>

      {recommendation && (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-green-600">{recommendation}</h3>
    </div>
  )}
    </div>
  );
};

export default CropRecommendation;
