// src/components/PlantDiseases/DiseaseDetectionComponent.jsx

import { useState } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import { useParams } from "react-router-dom";

const DiseaseDetectionComponent = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const { cropName } = useParams(); // Get crop name from URL params

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        `http://localhost:5000/diseaseDetect/classifyDisease/${cropName}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const newResult = response.data;
      setResult(newResult);
      setHistory([
        { image: URL.createObjectURL(selectedImage), ...newResult },
        ...history,
      ]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md p-6 mx-auto mt-40 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-black">
          {cropName} රෝග හඳුනාගැනීම
        </h2>
        <p className="mb-4 text-black">
          රෝගී {cropName.toLowerCase()} බෝගයේ කොටසක ඡායාරූපයක් උඩුගත කිරීම මඟින්
          රෝගය හඳුනාගන්න.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="file"
              onChange={handleImageChange}
              className="p-2 text-gray-700 bg-white border border-gray-300 rounded file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              රෝගය හඳුනාගන්න
            </button>
          </div>
        </form>

        {selectedImage && (
          <div className="mt-5">
            <h3 className="text-xl font-bold text-black">රූපය:</h3>
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
            <h3 className="text-xl font-bold text-black">ප්‍රතිඵලය:</h3>
            <p className="text-black">
              {result.tagName}: {(result.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-2xl font-bold text-black">කලින් කරන ලද සෙවීම්</h3>
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
                    <h4 className="text-xl font-bold text-black">
                      {item.tagName}
                    </h4>
                    <p className="text-black">
                      සම්භාවිතාව: {(item.probability * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">කලින් කරන ලද සෙවීම් නොමැත.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetectionComponent;
