import React, { useState, useEffect } from 'react';

const UpdateCrop = ({ crop, onClose, onUpdate }) => {
    const [cropName, setCropName] = useState(crop.cropName);
    const [quantity, setQuantity] = useState(crop.quantity);
    const [area, setArea] = useState(crop.area);
    const[city, setCity] = useState(crop.city);
    const [plantingDate, setPlantingDate] = useState(crop.plantingDate.split('T')[0]);
    const [harvestDate, setHarvestDate] = useState(crop.harvestDate.split('T')[0]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (crop) {
            setCropName(crop.cropName);
            setQuantity(crop.quantity);
            setArea(crop.area);
            setCity(crop.city);
            setPlantingDate(crop.plantingDate.split('T')[0]);
            setHarvestDate(crop.harvestDate.split('T')[0]);
        }
    }, [crop]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validation logic remains the same

        const updatedCrop = {
            cropName,
            quantity,
            area,
            city,
            plantingDate,
            harvestDate,
        };

        setError(null);

        const plantingDateObj = new Date(updatedCrop.plantingDate);
        const harvestDateObj = new Date(updatedCrop.harvestDate);
    
        // Get the current date
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
    
        // Validation checks
        if (!/^[^0-9]+$/.test(updatedCrop.cropName)) {
          setError('බෝගයේ නම සඳහා අකුරු පමණක් භාවිතා කරන්න.');
          return;
        }
    
        if (parseInt(updatedCrop.quantity) <= 10) {
          setError('ප්‍රමාණය 10 ට වඩා වැඩි ධනාත්මක අගයක් විය යුතුය.');
          return;
        }
    
        if (!/^\d+(\.\d+)?m²$/.test(updatedCrop.area)) {
          setError('ප්‍රදේශය නිවැරදි ආකෘතියෙන් ඇතුළත් කරන්න (උදා: 100m²).');
          return;
        }
        if (!/^[^0-9]+$/.test(updatedCrop.city)) {
            setError('නගරයේ නම සඳහා අකුරු පමණක් භාවිතා කරන්න.');
            return;
        }
    
        if (harvestDateObj <= plantingDateObj) {
          setError('අස්වැන්න ලබාගන්නා දිනය වගා කරන දිනයට පසු විය යුතුය.');
          return;
        }
    
        if (plantingDateObj < currentDate) {
          setError('වගා කරන දිනය අද දිනයට පෙර විය නොහැක.');
          return;
        }
        // ...


        try {
            const response = await fetch(`http://localhost:5000/Crop/updateCrop/${crop._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCrop),
            });
            const data = await response.json();

            if (response.ok) {
                onUpdate(data);
                onClose();
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error updating crop.');
            console.error('Error updating crop:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full m-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">කෘෂි යාවත්කාලීන කරන්න</h2>
                <button 
                    className="text-gray-600 hover:text-gray-800 transition duration-150 ease-in-out" 
                    onClick={onClose}
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="cropName" className="block text-sm font-medium text-gray-700 mb-1">බෝගයේ නම</label>
                    <input
                        id="cropName"
                        type="text"
                        value={cropName}
                        onChange={(e) => setCropName(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">බෝග ප්‍රමාණය</label>
                    <input
                        id="quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">වගා කරන භූමි ප්‍රමාණය</label>
                    <input
                        id="area"
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">ප්‍රදේශය</label>
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="plantingDate" className="block text-sm font-medium text-gray-700 mb-1">වගා කරන දිනය</label>
                    <input
                        id="plantingDate"
                        type="date"
                        value={plantingDate}
                        onChange={(e) => setPlantingDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div>
                    <label htmlFor="harvestDate" className="block text-sm font-medium text-gray-700 mb-1">අස්වැන්න ලබාගන්නා බලපොරොත්තු දිනය</label>
                    <input
                        id="harvestDate"
                        type="date"
                        value={harvestDate}
                        onChange={(e) => setHarvestDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                </div>
                <div className="flex justify-end space-x-3">
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        අවලංගු කරන්න
                    </button>
                    <button 
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                    >
                        යාවත්කාලීන කරන්න
                    </button>
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </form>
        </div>
    </div>
);
};
export default UpdateCrop;