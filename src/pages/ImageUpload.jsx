import { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      const response = await axios.post("/classify-image", formData, {
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
      <div className="bg-black">
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleImageUpload} />
          <button className="bg-green-500" type="submit">Upload and Classify</button>
        </form>
        {result && (
          <div>
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
