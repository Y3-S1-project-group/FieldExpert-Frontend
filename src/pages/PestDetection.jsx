import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // If you have a Navbar component, otherwise remove this line

const PestDetection = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/classify",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container p-8 mx-auto bg-grey-100">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-3xl font-bold text-black">පලිබෝධකයන් හදුනාගැනීම</h2>
          <p className="mb-6 text-black">
            අපගේ පළිබෝධ හඳුනාගැනීමේ පද්ධතිය භාවිතයෙන් බෝග පළිබෝධ හඳුනා ගන්න. 
            උන් මර්දනය කිරීම සඳහා අපගේ හොඳම පළිබෝධනාශක ද අපි නිර්දේශ කරමු.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="file"
              onChange={handleImageUpload}
              className="p-2 mb-4 border border-gray-300 rounded-md"
            />
            <button
              className="px-4 py-2 font-bold text-white transition duration-300 bg-green-500 rounded hover:bg-green-700"
              type="submit"
            >
              හඳුනාගැනීමට උඩුගත කරන්න
            </button>
          </form>
          {result && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-black">Classification Result:</h3>
              <p className="text-black">
                {result.tagName}: {result.probability.toFixed(2)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PestDetection;
