import { useState } from 'react';
import axios from 'axios';

const CropForm = () => {
  const [formData, setFormData] = useState({
    soilType: '',
    rainfall: '',
    temperature: '',
    farmSize: '',
    region: ''
  });

  const [recommendation, setRecommendation] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/recommend-crop', formData);
      setRecommendation(response.data.recommendation);
    } catch (error) {
      console.error('Error fetching recommendation:', error);
    }
  };

  return (
    <div>
      <h2>Crop Recommendation Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Soil Type:</label>
          <input
            type="text"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Rainfall (in mm):</label>
          <input
            type="text"
            name="rainfall"
            value={formData.rainfall}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Temperature (in °C):</label>
          <input
            type="text"
            name="temperature"
            value={formData.temperature}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Farm Size (in acres):</label>
          <input
            type="text"
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Region:</label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Get Recommendation</button>
      </form>

      {recommendation && (
        <div>
          <h3>Recommended Crop:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default CropForm;
