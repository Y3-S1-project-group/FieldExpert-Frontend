import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import cropimage from "../assets/cropimage.jpg";
import logo from '../assets/logo.png';
import UpdateCrop from './UpdateCrop';
import html2pdf from 'html2pdf.js';
import './Fertilizer.css';
import { AiOutlineDelete, AiOutlineEdit ,AiFillDelete,AiOutlineFilePdf } from 'react-icons/ai';


const Fertilizer = () => {
    const [crops, setCrops] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(null);
    const [newCrop, setNewCrop] = useState({
        cropName: '',
        quantity: '',
        area: '',
        city: '',
        plantingDate: '',
        harvestDate: ''
    });
    const [validationErrors, setValidationErrors] = useState({
        cropName: '',
        quantity: '',
        area: '',
        city: '',
        plantingDate: '',
        harvestDate: ''
    });
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/Crop/getCrops');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCrops(data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError(error.message);
            }
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        let shouldUpdate = true;

        
        // Validate based on field type
        switch (name) {
            case 'cropName':
            case 'city':
                if (!/^[\u0D80-\u0DFF\s]+$/.test(value)) {
                    error = "කරුණාකර සිංහල අකුරු පමණක් භාවිතා කරන්න.";
                    shouldUpdate = false;
                }
                break;
            case 'quantity':
                if (value && (isNaN(value) || parseInt(value) <= 10)) {
                    error = "ප්‍රමාණය 10 ට වැඩි ධනාත්මක අගයක් විය යුතුය.";
                }
                break;
            case 'area':
                if (value && !/^\d+(\.\d+)?m²$/.test(value)) {
                    error = "ප්‍රදේශය නිවැරදි ආකෘතියෙන් ඇතුළත් කරන්න (උදා: 100m²).";
                }
                break;
        }

        setValidationErrors(prev => ({
            ...prev,
            [name]: error
        }));

        if (shouldUpdate) {
            setNewCrop(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const plantingDateObj = new Date(newCrop.plantingDate);
        const harvestDateObj = new Date(newCrop.harvestDate);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Date validations
        if (harvestDateObj <= plantingDateObj) {
            setError('අස්වැන්න ලබාගන්නා දිනය වගා කරන දිනයට පසු විය යුතුය.');
            return;
        }

        if (plantingDateObj < currentDate) {
            setError('වගා කරන දිනය අද දිනයට පෙර විය නොහැක.');
            return;
        }

        // Check for any validation errors
        if (Object.values(validationErrors).some(error => error !== '')) {
            setError('කරුණාකර සියලුම වැරදි නිවැරදි කරන්න.');
            return;
        }

        try {
            // Validate input
            const response = await fetch('http://localhost:5000/Crop/addCrop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCrop),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            

            const result = await response.json();
            setCrops(prevCrops => [...prevCrops, result]);
            setNewCrop({
                cropName: '',
                quantity: '',
                area: '',
                city: '',
                plantingDate: '',
                harvestDate: ''
            });
            setValidationErrors({
                cropName: '',
                quantity: '',
                area: '',
                city: '',
                plantingDate: '',
                harvestDate: ''
            });

        } catch (error) {
            console.error('Failed to add crop:', error);
            setError(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/Crop/deleteCrop/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Remove the deleted crop from the state
            setCrops(crops.filter(crop => crop._id !== id));
        } catch (error) {
            console.error('Failed to delete crop:', error);
            setError(error.message);
        }
    };

    const handleUpdate = (updatedCrop) => {
        setCrops(crops.map(crop => (crop._id === updatedCrop._id ? updatedCrop : crop)));
    };


    const calculateFertilizerRecommendation = (crop) => {
        const cropType = (crop && crop.cropName) ? crop.cropName.toLowerCase() : '';
        const area = parseFloat(crop.area);
        const city = crop.city;
        const quantity = parseInt(crop.quantity);

        let fertilizerType = '';
        let amountPerSqm = 0;
         let amountPerTree = 0;
        let applicationSchedule = [];

        switch(cropType) {
            case 'වී': // Rice
                fertilizerType = 'NPK 5-10-5';
                amountPerSqm = 0.05; // 50g per square meter
                applicationSchedule = [
                    { stage: 'සිටුවීමට පෙර', percentage: 20 },
                    { stage: 'පැල හැදීමේ අවධිය', percentage: 30 },
                    { stage: 'කරල් හැදීමේ අවධිය', percentage: 50 }
                ];
                break;
            case 'තක්කාලි': // Tomato
                fertilizerType = 'NoK 5-10-10';
                amountPerSqm = 0.08; // 80g per square meter
                applicationSchedule = [
                    { stage: 'සිටුවීමට පෙර', percentage: 25 },
                    { stage: 'මල් පිපීමේ අවධිය', percentage: 25 },
                    { stage: 'පලතුරු හටගැනීමේ අවධිය', percentage: 50 }
                ];
                break;
            case 'කැරට්': // Carrot
                fertilizerType = 'CTK 5-10-10';
                amountPerSqm = 0.06; // 60g per square meter
                applicationSchedule = [
                    { stage: 'සිටුවීමට පෙර', percentage: 50 },
                    { stage: 'මුල් වර්ධන අවධිය', percentage: 50 }
                ];
                break;
                case 'පොල්': // Coconut
                fertilizerType = 'OPK 12-12-17';
                amountPerTree = 2.5; // 2.5kg per tree
                applicationSchedule = [
                    { stage: 'කොළ සෑදීමේ අවධිය', percentage: 40 }, // Leaf formation stage
                    { stage: 'පලවා වීමේ අවධිය', percentage: 30 }, // Fruit development stage
                    { stage: 'අස්වැන්නෙන් පසු', percentage: 30 } // After harvest
                ];
                break;

            default:
                fertilizerType = 'සාමාන්ය NPK';
                amountPerSqm = 0.07; // 70g per square meter
                applicationSchedule = [
                    { stage: 'සිටුවීමට පෙර', percentage: 33 },
                    { stage: 'මැද අවධිය', percentage: 33 },
                    { stage: 'අවසාන අවධිය', percentage: 34 }
                ];
        }

        let totalAmount;
        if (cropType === 'පොල්') {
            totalAmount = (amountPerTree * quantity).toFixed(2);
        } else {
            totalAmount = (amountPerSqm * area * quantity).toFixed(2);
        }

        return {
            fertilizerType,
            totalAmount,
            applicationSchedule: applicationSchedule.map(stage => ({
                ...stage,
                amount: ((stage.percentage / 100) * totalAmount).toFixed(2)
            }))
        };
    };

    const generatePDF = (crop) => {
        const recommendation = calculateFertilizerRecommendation(crop);
        const content = `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; color: black;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="${logo}" alt="Logo" style="width: 150px; height: auto;"/>
                </div>
                <h1 style="color: black; text-align: center; font-size: 24px; margin-bottom: 20px;">බෝග තොරතුරු සහ පොහොර නිර්දේශය</h1>
                <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: black; font-size: 20px; margin-bottom: 15px;">${crop.cropName}</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>ප්‍රමාණය:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${crop.quantity}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>ප්‍රදේශය:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${crop.area}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>වගා කරන භූමි ප්‍රදේශය:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${crop.city}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>වගා කරන දිනය:</strong></td>
                            <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${new Date(crop.plantingDate).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px;"><strong>අස්වැන්න ලබාගන්නා දිනය:</strong></td>
                            <td style="padding: 8px;">${new Date(crop.harvestDate).toLocaleDateString()}</td>
                        </tr>
                    </table>
                </div>
                <div style="background-color: #e6fffa; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: black; font-size: 20px; margin-bottom: 15px;">පොහොර නිර්දේශය</h2>
                    <p><strong>පොහොර වර්ගය:</strong> ${recommendation.fertilizerType}</p>
                    <p><strong>මුළු පොහොර ප්‍රමාණය:</strong> ${recommendation.totalAmount} kg</p>
                    <h3 style="color: black; font-size: 18px; margin-top: 15px; margin-bottom: 10px;">යෙදීමේ උපදෙස්:</h3>
                    <table style="width: 100%; border-collapse: collapse;">
                        ${recommendation.applicationSchedule.map(stage => `
                            <tr>
                                <td style="padding: 8px; border-bottom: 1px solid #b2f5ea;">${stage.stage}:</td>
                                <td style="padding: 8px; border-bottom: 1px solid #b2f5ea;">${stage.amount} kg (${stage.percentage}%)</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: black;">
                    Generated on ${new Date().toLocaleString()}
                </div>
            </div>
        `;

        const opt = {
            margin: 10,
            filename: `${crop.cropName}_fertilizer_recommendation.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().from(content).set(opt).save();
    };


    
    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${cropimage})`}}>
        <div className="bg-black bg-opacity-50 min-h-screen">
        <Navbar />
        

        {showPopup && selectedItem && (
        <UpdateCrop
          crop={selectedItem}
          onClose={() => setShowPopup(false)}
          onUpdate={handleUpdate}
        />
      )}

        
        <div className="container mx-auto px-24 py-48">
            <div className="flex gap-48">
                {/* Left column: Form */}
                <div className="w-1/2">
                    <div className="bg-white shadow-lg rounded-lg p-10">
                        <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">පොහොර නිර්දේශ <br></br>ලබා ගැනීම</h2>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="cropName">
                                        බෝගයේ නම:
                                    </label>
                                    <input
                                       className={`shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                        validationErrors.cropName ? 'border-red-500' : ''
                                    }`}
                                        id="cropName"
                                        type="text"
                                        name="cropName"
                                        value={newCrop.cropName}
                                        onChange={handleChange}
                                        required
                                         placeholder="උදා: වී"
                                    />
                                    {validationErrors.cropName && (
                                            <p className="text-red-500 text-sm mt-1">{validationErrors.cropName}</p>
                                        )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="quantity">
                                        බෝගප්‍රමාණය:
                                    </label>
                                    <input
                                         className={`shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                            validationErrors.quantity ? 'border-red-500' : ''
                                        }`}
                                        id="quantity"
                                        type="number"
                                        name="quantity"
                                        value={newCrop.quantity}
                                        onChange={handleChange}
                                        required
                                         placeholder="උදා: 10"
                                    />
                                      {validationErrors.quantity && (
                                            <p className="text-red-500 text-sm mt-1">{validationErrors.quantity}</p>
                                        )}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="area">
                                    වගා කරන භූමි ප්‍රමාණය:
                                    </label>
                                    <input
                                       className={`shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                        validationErrors.area ? 'border-red-500' : ''
                                    }`}
                                        id="area"
                                        type="text"
                                        name="area"
                                        value={newCrop.area}
                                        onChange={handleChange}
                                        required
                                        placeholder="උදා: 100m²"
                                    />
                                    {validationErrors.area && (
                                            <p className="text-red-500 text-sm mt-1">{validationErrors.area}</p>
                                        )}
                                    
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="city">
                                      ප්‍රදේශය:
                                    </label>
                                    <input
                                          className={`shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                            validationErrors.city ? 'border-red-500' : ''
                                        }`}
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={newCrop.city}
                                        onChange={handleChange}
                                        required
                                         placeholder="උදා: අනුරාධපුරය"
                                    />
                                     {validationErrors.city && (
                                            <p className="text-red-500 text-sm mt-1">{validationErrors.city}</p>
                                        )}
                                </div>

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="plantingDate">
                                        වගා කරන දිනය:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                        id="plantingDate"
                                        type="date"
                                        name="plantingDate"
                                        value={newCrop.plantingDate}
                                        onChange={handleChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="harvestDate">
                                    අස්වැන්න ලබාගන්නා බලපොරොත්තු දිනය:
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full py-3 px-4 text-xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                        id="harvestDate"
                                        type="date"
                                        name="harvestDate"
                                        value={newCrop.harvestDate}
                                        onChange={handleChange}
                                        required
                                        min={newCrop.plantingDate || new Date().toISOString().split('T')[0]}
                                        
                                        
                                        
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline text-xl"
                                        type="submit"
                                    >
                                        බෝගය එකතු කරන්න
                                    </button>
                                </div>
                        </form>
                    </div>
                    {error && (
                        <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Error:</strong>
                            <span className="block sm:inline"> {error}</span>
                        </div>
                    )}
                </div>
                
                {/* Right column: Crop details and recommendations */}
                <div className="w-1/2">
                    <div className="bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
                        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">බෝග තොරතුරු</h2>
                        <div className="space-y-6">
                            {crops && crops.length > 0 ? (
                                crops.map((crop, index) => {
                                    const recommendation = calculateFertilizerRecommendation(crop);
                                    return (
                                        <div key={index} className="bg-gray-50 shadow-md rounded-lg overflow-hidden">
                                            <div className="px-6 py-4">
                                                <h3 className="text-2xl font-semibold mb-2 text-gray-800">{crop.cropName}</h3>
                                                <p className="text-xl text-gray-600"><span className="font-medium">ප්‍රමාණය:</span> {crop.quantity}</p>
                                                <p className="text-xl text-gray-600"><span className="font-medium">ප්‍රදේශය:</span> {crop.area}</p>
                                                <p className="text-xl text-gray-600"><span className="font-medium">වගා කරන භූමි ප්‍රදේශය:</span> {crop.city}</p>
                                                <p className="text-xl text-gray-600"><span className="font-medium">වගා කරන දිනය:</span> {new Date(crop.plantingDate).toLocaleDateString()}</p>
                                                <p className="text-xl text-gray-600"><span className="font-medium">අස්වැන්න ලබාගන්නා දිනය:</span> {new Date(crop.harvestDate).toLocaleDateString()}</p>
                                            </div>
                                            <div className="border-t border-gray-200 px-6 py-4">
                                                <h4 className="text-xl font-semibold mb-2 text-gray-800">පොහොර නිර්දේශය</h4>
                                                <p className="text-lg text-gray-600"><span className="font-medium">පොහොර වර්ගය:</span> {recommendation.fertilizerType}</p>
                                                <p className="text-lg text-gray-600"><span className="font-medium">මුළු පොහොර ප්‍රමාණය:</span> {recommendation.totalAmount} kg</p>
                                                <h5 className="text-lg font-semibold mt-2 mb-1">යෙදීමේ උපදෙස්:</h5>
                                                <ul className="list-disc pl-5 text-gray-600">
                                                    {recommendation.applicationSchedule.map((stage, index) => (
                                                        <li key={index} className="text-lg">
                                                            {stage.stage}: {stage.amount} kg ({stage.percentage}%)
                                                        </li>
                                                    ))}
                                                </ul>

                                                <div className="mt-6 flex justify-center space-x-4">
                                                            <button
                                                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300 ease-in-out text-xl"
                                                                onClick={() => {
                                                                    setSelectedItem(crop);
                                                                    setShowPopup(true);
                                                                }}
                                                            >
                                                                <AiOutlineEdit className="inline-block mr-2 text-2xl" />
                                                                සංස්කරණය
                                                            </button>
                                                            <button 
                                                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300 ease-in-out text-xl"
                                                                onClick={() => handleDelete(crop._id)}
                                                            >
                                                                <AiFillDelete className="inline-block mr-2 text-2xl" />
                                                                මකන්න
                                                            </button>
                                                            <button 
                                                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg transition duration-300 ease-in-out text-xl"
                                                                onClick={() => generatePDF(crop)}
                                                            >
                                                                <AiOutlineFilePdf className="inline-block mr-2 text-2xl" />
                                                                PDF
                                                            </button>
                                                        </div>

                                              
                                              
                                            </div>

                                            
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-center text-xl text-gray-500">බෝග තොරතුරු නොමැත</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
            
    </div>
    );
};

export default Fertilizer;