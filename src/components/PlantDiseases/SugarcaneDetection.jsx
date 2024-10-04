import { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';

const SugarcaneDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null); // Store the uploaded image
  const [result, setResult] = useState(null); // Store the classification result
  const [history, setHistory] = useState([]); // Store the history of searches

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]); // Save the selected image to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post(
        'http://localhost:5000/diseaseDetect/classifyDisease/Sugarcane',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      const newResult = response.data;
      setResult(newResult); // Save the classification result
      // Add the new search to the history
      setHistory([
        { image: URL.createObjectURL(selectedImage), ...newResult },
        ...history,
      ]);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md p-6 mx-auto mt-40 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-black">Sugarcane Disease Detection</h2>
        <p className="mb-4 text-black">
          Upload an image of your sugarcane plant to detect potential diseases.
        </p>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 text-gray-700 bg-white border border-gray-300 rounded file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200"
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Detect Disease
          </button>
        </form>

        {/* Display the uploaded image */}
        {selectedImage && (
          <div className="mt-5">
            <h3 className="text-xl font-bold text-black">Uploaded Image:</h3>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded Image"
              className="border border-gray-300 rounded"
              width={200}
              height={200}
            />
          </div>
        )}

        {result && (
          <div className="mt-5">
            {/* Display the classification result */}
            <h3 className="text-xl font-bold text-black">Detection Result:</h3>
            <p className="text-black">
              {result.tagName}: {(result.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}

        {/* History Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-black">Previous Searches</h3>
          {history.length > 0 ? (
            <div className="mt-4 space-y-4">
              {history.map((item, index) => (
                <div key={index} className="flex flex-row gap-4">
                  <img
                    src={item.image}
                    alt={`Previous Upload ${index}`}
                    width={100}
                    height={100}
                    className="border border-gray-300 rounded"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-black">{item.tagName}</h4>
                    <p className="text-black">
                      Probability: {(item.probability * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">No previous searches yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SugarcaneDetection;
