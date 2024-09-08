import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // If you have a Navbar component, otherwise remove this line

const PestDetection = () => {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [result, setResult] = useState(null); // Store the classification result

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Save the uploaded image to state
  };

  const pesticideMethods = {
    Thrips: "Pesguard FG 161",
    "Strophosoma melanogrammum": "Pesdor 600 EC",
    Sesamia: "fastac 10 EC",
    "Common fruit fly": "pestfly 100 EC",
    "Cnaphalocrocis medinalis": "pestcrocis 100 EC",
    Cecidomyiidae: "pestcrocis 100 EC",
    "Brown planthopper": "peshopper 100 EC",
    "Brazilian skipper": "aerofly 100 EC",
    "Chilo (moth)": "chilodest 100 EC",
    Scirpophaga: "fs",
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
      setResult(response.data); // Save the classification result to state
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto ml-10 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-black">පලිබෝධකයන් හදුනාගැනීම</h2>
        <p className="text-black">
          අපගේ පළිබෝධ හඳුනාගැනීමේ පද්ධතිය භාවිතයෙන් බෝග පළිබෝධ හඳුනා ගන්න. උන්
          මර්දනය කිරීම සඳහා අපගේ හොඳම පළිබෝධනාශක ද අපි නිර්දේශ කරමු.
        </p>
        <form onSubmit={handleSubmit} className="space-x-5">
          <input
            type="file"
            onChange={handleImageUpload}
            className="p-2 mb-4 text-gray-700 bg-white border border-gray-300 rounded file:border file:border-gray-300 file:rounded file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200"
          />
          <button
            type="submit"
            className="self-start px-4 py-2 mt-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            හඳුනාගැනීමට උඩුගත කරන්න
          </button>
        </form>
        {result && (
          <div className="flex flex-row gap-10 mt-5">
            {/* Display the uploaded image */}
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded Image"
              width={200}
              height={200}
            />
            {/* Display the classification result next to the image */}
            <div>
              <h3 className="text-2xl font-bold text-black">Classification Result:</h3>
              <p className="text-black">
                {result.tagName}: {result.probability.toFixed(2)}
              </p>
              {/* Display the recommended pesticide */}
              {pesticideMethods[result.tagName] && (
                <div>
                  <h3 className="text-2xl font-bold text-black">Recommended Pesticide:</h3>
                  <p className="text-black">
                    {pesticideMethods[result.tagName]}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handleReload} // Add onClick handler to reload the page
              className="self-start px-4 py-2 mt-4 text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              නව සෙවීමක් කරන්න
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PestDetection;
