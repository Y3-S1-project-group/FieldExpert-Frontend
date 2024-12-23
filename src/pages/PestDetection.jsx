import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // If you have a Navbar component, otherwise remove this line
import Footer from "../components/Footer/Footer";

const PestDetection = () => {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [result, setResult] = useState(null); // Store the classification result
  const [history, setHistory] = useState([]); // Store the history of searches
  const [errorMessage, setErrorMessage] = useState(""); // Error message state

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Save the uploaded image to state
    setErrorMessage(""); // Clear error when image is selected
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

    // Check if an image is selected
    if (!image) {
      setErrorMessage("කරුණාකර රූපයක් උඩුගත කරන්න.");
      return;
    }

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
      const newResult = response.data;
      setResult(newResult); // Save the classification result to state
      // Add the new search to the history
      setHistory([{ image: URL.createObjectURL(image), ...newResult }, ...history]);
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
      <div className="max-w-3xl p-6 mx-auto mt-40 bg-white border border-gray-300 rounded-lg shadow-lg">
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
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}
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
              <h3 className="text-2xl font-bold text-black">ප්‍රතිඵලය:</h3>
              <p className="text-black">
                {result.tagName}: {result.probability.toFixed(2)}
              </p>
              {/* Display the recommended pesticide */}
              <br />
              {pesticideMethods[result.tagName] && (
                <div>
                  <h3 className="text-2xl font-bold text-black">නිර්දේශිත පළිබෝධනාශක:</h3>
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
        {/* History Section */}
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
                    <h4 className="text-xl font-bold text-black">{item.tagName}</h4>
                    <p className="text-black">සම්භාවිතාව: {item.probability.toFixed(2)}</p>
                    {pesticideMethods[item.tagName] && (
                      <div>
                        <h5 className="text-lg font-bold text-black">නිර්දේශිත පළිබෝධනාශක:</h5>
                        <p className="text-black">
                          {pesticideMethods[item.tagName]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black">කලින් කරන ලද සෙවීම් නොමැත.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PestDetection;
