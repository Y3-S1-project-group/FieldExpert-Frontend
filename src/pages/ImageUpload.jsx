import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar"; // If you have a Navbar component, otherwise remove this line

const ImageUpload = () => {
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
      const response = await axios.post("http://localhost:5000/classify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-5 bg-black">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleImageUpload} />
          <button className="p-2 mt-3 text-white bg-green-500" type="submit">Upload and Classify</button>
        </form>
        {result && (
          <div className="mt-5 text-white">
            <h3>Classification Result:</h3>
            <p>
              {result.tagName}: {result.probability.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
