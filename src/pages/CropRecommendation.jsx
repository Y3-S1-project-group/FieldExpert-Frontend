// CropRecommendation.jsx

import { useState } from "react";
import axios from "axios";
import parse from "html-react-parser";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

const CropRecommendation = () => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  const [location, setLocation] = useState("");
  const [plantingMonth, setPlantingMonth] = useState("");
  const [cropMaturityTime, setMaturityTime] = useState("");
  const [financialCapital, setFinancialCapital] = useState("");
  const [area, setArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [topography, setTopography] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [waterAvailability, setWaterAvailability] = useState("");
  const [labor, setLabor] = useState("");
  const [objectives, setObjectives] = useState([]);
  const [cropSuggestions, setCropSuggestions] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [areaError, setAreaError] = useState("");
  const [maturityTimeError, setMaturityTimeError] = useState("");
  const [financialCapitalError, setFinancialCapitalError] = useState("");
  const [laborError, setLaborError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCropSuggestions("");
    
    // Reset validation errors
    setAreaError("");
    setMaturityTimeError("");
    setFinancialCapitalError("");
    setLaborError("");
  
    // Perform validations
    if (
      !location ||
      !plantingMonth ||
      !cropMaturityTime ||
      !financialCapital ||
      !area ||
      !soilType ||
      !topography ||
      !waterSource ||
      !waterAvailability ||
      !labor ||
      objectives.length === 0
    ) {
      setError("කරුණාකර අනිවාර්යයෙන් සියලු යෙදුම් ඇතුලත් කරන්න.");
      setLoading(false);
      return;
    }
  
    // Validate area
    if (area <= 0) {
      setAreaError("භූමි ප්‍රමාණය 0 ට වඩා අඩු විය නොහැක.");
      setLoading(false);
      return;
    }
  
    // Validate crop maturity time
    if (cropMaturityTime < 1 || cropMaturityTime > 24) {
      setMaturityTimeError("බෝග පරිණත කාලය 1 සහ 24 මාස අතර විය යුතුය.");
      setLoading(false);
      return;
    }
  
    // Validate financial capital
    if (financialCapital < 10000 || financialCapital > 1000000) {
      setFinancialCapitalError("අවම මූල ප්‍රාග්ධනය රුපියල් 10000 සහ රුපියල් 1000000 අතර විය යුතුය.");
      setLoading(false);
      return;
    }
  
    // Validate labor
    if (labor < 1 || labor > 1000) {
      setLaborError("අවම පුද්ගල සංඛ්‍යාව 1 සහ 1000 අතර විය යුතුය.");
      setLoading(false);
      return;
    }
  
    // If no validation errors, proceed with the API request
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are a Sri Lankan agricultural expert providing crop suggestions based on farmland conditions. Answer should be embedded in HTML tags inside a <div>. Bold the crop names. Don't use asterisks, use only HTML tags. Give reasons for every crop.",
        },
        {
          role: "user",
          content: `I'm a farmer, and my farmland is located in the ${location} district of Sri Lanka. I hope to plant a new crop in ${plantingMonth}, expecting a ${cropMaturityTime} months maturity time. I have a capital of ${financialCapital} Sri Lankan rupees, and my farmland area is ${area} acres. The soil type is ${soilType}, and the topography of my land is ${topography}. I have access to a water source which is ${waterSource}, and the water availability is ${waterAvailability}. Additionally, the labor availability is ${labor}. Objectives of this planting are ${objectives}. Based on these details, please suggest a list of the most suitable crops to plant.`,
        },
      ];
  
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 2000,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
  
      console.log(response.data);
  
      setCropSuggestions(parse(response.data.choices[0].message.content));
    } catch (error) {
      console.error("Error fetching crop recommendation:", error);
      setError("Failed to fetch crop recommendation. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="max-w-4xl p-6 mx-auto mt-40 bg-white border border-gray-300 rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center text-black">
          භෝග නිර්දේශක සේවාව
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Select location */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              දිස්ත්‍රික්කය
            </label>
            <select
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="Ampara">අම්පාර</option>
              <option value="Anuradhapura">අනුරාධපුර</option>
              <option value="Badulla">බදුල්ල</option>
              <option value="Batticaloa">මඩකලපුව</option>
              <option value="Colombo">කොළඹ</option>
              <option value="Galle">ගාල්ල</option>
              <option value="Gampaha">ගම්පහ</option>
              <option value="Hambantota">හම්බන්තොට</option>
              <option value="Jaffna">යාපනය</option>
              <option value="Kaluthara">කළුතර</option>
              <option value="Kandy">මහනුවර</option>
              <option value="Kegalle">කෑගල්ල</option>
              <option value="Kilinochchi">කිලිනොච්චි</option>
              <option value="Kurunegala">කුරුණෑගල</option>
              <option value="Mannar">මන්නාරම</option>
              <option value="Matale">මාතලේ</option>
              <option value="Mathara">මාතර</option>
              <option value="Monaragala">මොණරාගල</option>
              <option value="Mullaithiv">මුලතිව්</option>
              <option value="Nuwara-Eliya">නුවරඑළිය</option>
              <option value="Polonnaruwa">පොළොන්නරුව</option>
              <option value="Puttalam">පුත්තලම</option>
              <option value="Rathnapura">රත්නපුර</option>
              <option value="Trincomalee">ත්‍රිකුණාමලය</option>
              <option value="Vavuniya">වවුනියාව</option>
            </select>
          </div>

          {/* Select Planting Month */}
          <div>
            <label
              htmlFor="planting_month"
              className="block text-sm font-medium text-gray-700"
            >
              බෝගය සිටවුන මාසය
            </label>
            <select
              id="planting_month"
              name="planting_month"
              value={plantingMonth}
              onChange={(e) => setPlantingMonth(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="January">ජනවාරි</option>
              <option value="February">පෙබරවාරි</option>
              <option value="March">මාර්තු</option>
              <option value="April">අප්‍රේල්</option>
              <option value="May">මැයි</option>
              <option value="June">ජූනි</option>
              <option value="July">ජූලි</option>
              <option value="August">අගෝස්තු</option>
              <option value="September">සැප්තැම්බර්</option>
              <option value="October">ඔක්තෝබර්</option>
              <option value="November">නොවැම්බර්</option>
              <option value="December">දෙසැම්බර්</option>
            </select>
          </div>

          {/* Crop maturity time Input */}
          <div>
            <label
              htmlFor="crop_maturity_time"
              className="block text-sm font-medium text-gray-700"
            >
              බෝග පරිණත කාලය (මාස වලින්)
            </label>
            <input
              type="number"
              id="crop_maturity_time"
              name="crop_maturity_time"
              value={cropMaturityTime}
              onChange={(e) => setMaturityTime(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {maturityTimeError && (
              <p className="mt-1 text-sm text-red-600">{maturityTimeError}</p>
            )}
          </div>

          {/* Financial capital Input */}
          <div>
            <label
              htmlFor="financial_capital"
              className="block text-sm font-medium text-gray-700"
            >
              මුල්‍ය ප්‍රාග්ධනය (රුපියල් වලින්)
            </label>
            <input
              type="number"
              id="financial_capital"
              name="financial_capital"
              value={financialCapital}
              onChange={(e) => setFinancialCapital(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {financialCapitalError && (
              <p className="mt-1 text-sm text-red-600">
                {financialCapitalError}
              </p>
            )}
          </div>

          {/* Area Input */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              භූමි ප්‍රමාණය (අක්කර වලින්)
            </label>
            <input
              type="number"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {areaError && (
              <p className="mt-2 text-sm text-red-600">{areaError}</p>
            )}
          </div>

          {/* Soil Type Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="soil_type"
              className="block text-sm font-medium text-gray-700"
            >
              පාංශු වර්ගය
            </label>
            <select
              id="soil_type"
              name="soil_type"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="Reddish Brown Earths">රතු-දුඹුරු පස</option>
              <option value="Alluvial Soils">ගල්මඩ පස</option>
              <option value="Gravelly Soils">කුලුගල් පස</option>
              <option value="Red-Yellow Podzolic Soils">
                රතු-කහ පොඩසොලික් පස
              </option>
              <option value="Lateritic Soils">ලාටරයිටික් පස</option>
              <option value="Regosols">රෙගොසෝල් පස</option>
              <option value="Non-Calcic Brown Soils">
                කැල්සික් නොවන දුඹුරු පස
              </option>
              <option value="Bog and Half-Bog Soils">
                දිය පස සහ අර්ධ-දිය පස
              </option>
              <option value="Red Loam Soils">රතු ලෝම් පස</option>
            </select>
          </div>

          {/* Topography Input */}
          <div className="mb-4">
            <label
              htmlFor="topography"
              className="block text-sm font-medium text-gray-700"
            >
              භූ විෂමතාව
            </label>
            <select
              id="topography"
              name="topography"
              value={topography}
              onChange={(e) => setTopography(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="Flat Lands">පැතලි ඉඩම</option>
              <option value="Normal slope">බෑවුම් සහිත ඉඩම</option>
              <option value="Hill slope">කඳු බෑවුම් සහිත ඉඩම</option>
            </select>
          </div>

          {/* Water source Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="water_source"
              className="block text-sm font-medium text-gray-700"
            >
              ජල මූලාශ්‍රය
            </label>
            <select
              id="water_source"
              name="water_source"
              value={waterSource}
              onChange={(e) => setWaterSource(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="Nearby river">ආසන්න ගඟකින්</option>
              <option value="From a water reservoir system">වැව් ජලය</option>
              <option value="Rainwater">වැසි ජලය</option>
              <option value="Groundwater">භූගත ජලය</option>
              <option value="Tap water">නළ ජලය</option>
            </select>
          </div>

          {/* Water Availability Dropdown */}
          <div className="mb-4">
            <label
              htmlFor="water_availability"
              className="block text-sm font-medium text-gray-700"
            >
              ජලය ලබා ගැනීමේ හැකියාව
            </label>
            <select
              id="water_availability"
              name="water_availability"
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">තෝරන්න</option>
              <option value="High">ඉහළ</option>
              <option value="Moderate">මධ්‍යස්ථ</option>
              <option value="Low">අඩු</option>
            </select>
          </div>

          {/* Labor Input */}
          <div>
            <label
              htmlFor="labor"
              className="block text-sm font-medium text-gray-700"
            >
              ශ්‍රමය (පුද්ගල සංඛ්‍යාව)
            </label>
            <input
              type="number"
              id="labor"
              name="labor"
              value={labor}
              onChange={(e) => setLabor(e.target.value)}
              className="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {laborError && (
              <p className="mt-1 text-sm text-red-600">{laborError}</p>
            )}
          </div>

          {/* Objectives Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              අරමුණ
            </label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Maximizing Profit"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">ලාභය ලබා ගන්න</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Sustainable Farming Practices"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">
                  තිරසාර ගොවිතැන් පිළිවෙත්
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Self-Sufficiency"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">ස්වයංපෝෂිතභාවය</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Maximizing Yield"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">අස්වනු උපරිම කිරීම</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Reducing Costs"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">වැය අඩු කිරීම</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Market Access"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">වෙළඳපොළ ප්‍රවේශය</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Improving Soil Health"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">
                  පසෙහි ගුණාත්මකභාවය වැඩි දියුණු කිරීම
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Adopting New Technologies"
                  onChange={(e) => {
                    setObjectives([...objectives, e.target.value]);
                  }}
                  className="text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-gray-700">
                  නව තාක්ෂණයන් භාවිතා කිරීම
                </span>
              </label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-green-600 rounded-lg shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "නිර්දේශ ලබාගනිමින්..." : "නිර්දේශ ලබාගන්න"}
            </button>
          </div>
        </form>

        {/* Display crop suggestions */}
        {cropSuggestions && (
          <div className="p-4 mt-8 bg-green-100 border border-green-300 rounded">
            <h3 className="text-xl font-semibold text-black">නිර්දේශිත බෝග:</h3>
            <p className="text-black">{cropSuggestions}</p>
          </div>
        )}

        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
      <Footer />
    </>
  );
};

export default CropRecommendation;
