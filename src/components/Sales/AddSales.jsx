import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import salesBG from '../../assets/salesBG.jpg'; 

function AddSale() {
    const [cropType, setCropType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [onitemPrice, setOnitemPrice] = useState("");
    const [saleDate, setSaleDate] = useState("");
    const [customerInfo, setCustomerInfo] = useState("");
    const [distributionMethod, setDistributionMethod] = useState("");
    const [additionalDetails, setAdditionalDetails] = useState("");

    const [cropTypeError, setCropTypeError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [onitemPriceError, setOnitemPriceError] = useState("");

    // Validation for cropType
    const handleCropTypeChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9_ ]*$/.test(value)) {
            setCropType(value);
            setCropTypeError("");
        } else {
            setCropTypeError("බෝග වර්ගයෙහි අක්ෂර පමණක් අඩංගු විය යුතුය.");
        }
    };

    // Validation for quantity (allowing decimal numbers)
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        // Allowing whole numbers and decimal numbers
        if (/^\d*\.?\d*$/.test(value)) {
            setQuantity(value);
            setQuantityError("");
        } else {
            setQuantityError("කරුණාකර අස්වනු ප්‍රමාණය සඳහා වලංගු ප්‍රමාණයක් ඇතුළත් කරන්න.");
        }
    };

    // Validation for item price (allowing decimal numbers)
    const handleOnitemPriceChange = (e) => {
        const value = e.target.value;
        // Allowing numbers with optional decimal point and digits after decimal
        if (/^\d*\.?\d*$/.test(value)) {
            setOnitemPrice(value);
            setOnitemPriceError("");
        } else {
            setOnitemPriceError("කරුණාකර අයිතමයේ මිල සඳහා වලංගු මිලක් ඇතුළත් කරන්න.");
        }
    };

    const sendData = (e) => {
        e.preventDefault();

        // Calculate total price
        const totalPrice = quantity && onitemPrice ? (parseFloat(quantity) * parseFloat(onitemPrice)).toFixed(2) : 0;

        const newCropData = {
            cropType,
            quantity,
            onitemPrice,
            saleDate,
            customerInfo,
            distributionMethod,
            additionalDetails,
            totalPrice  // Add the calculated totalPrice here
        };

        axios.post('http://localhost:5000/Sale/addSD', newCropData)
            .then(response => {
                // Display success message using React Toast
                toast.success("විකුණුම් දත්ත එකතු වුණා!");

                // Clear all fields after successful submission
                setCropType("");
                setQuantity("");
                setOnitemPrice("");
                setSaleDate("");
                setCustomerInfo("");
                setDistributionMethod("");
                setAdditionalDetails("");
                setCropTypeError("");
                setQuantityError("");
                setOnitemPriceError("");
            })
            .catch(error => {
                // Display error message using React Toast
                toast.error("බෝග දත්ත එක් කිරීමේ ගැටලුවක් ඇති විය.");
            });
    };

    return (
        <div style={{ 
            marginTop: "50px", 
            fontFamily: "'Poppins', sans-serif", 
            backgroundImage: `url(${salesBG})`,  
            backgroundSize: "cover", 
            backgroundPosition: "center", 
            padding: "20px 0",
            minHeight: "100vh"
        }}>
            <form onSubmit={sendData} style={{ background: "white", padding: "20px", borderRadius: "10px", margin: "0 auto", maxWidth: "650px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)", marginBottom: "15px", marginTop: "90px" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>විකුණුම් දත්ත ඇතුලුම්පත</h1>

                <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>බෝග වර්ගය</label>
                    <input 
                        type="text" 
                        value={cropType} 
                        onChange={(e) => {
                            const value = e.target.value;
                            const hasSymbols = /[^a-zA-Z\u0D80-\u0DFF ]/.test(value); // Allowing Sinhala characters, English letters, and spaces
                            if (!hasSymbols) {
                                setCropType(value);
                                setCropTypeError("");
                            } else {
                                setCropTypeError("සංකේත ඇතුලත් කිරීමෙන් වළකින්න.");
                            }
                        }} 
                        required
                        style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }} 
                    />{cropTypeError && <p style={{ color: "red" }}>{cropTypeError}</p>}
                </div>

                <div style={{ flex: 1 }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>විකුණුම් දවස</label>
                    <input 
                        type="date" 
                        value={saleDate} 
                        onChange={(e) => setSaleDate(e.target.value)} 
                        max={new Date().toISOString().split("T")[0]} // Restrict to today or previous dates
                        required 
                        style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }} 
                    />
                </div>

                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>අස්වනු ප්‍රමාණය (කිලෝ)</label>
                        <input type="text" value={quantity} onChange={handleQuantityChange} required
                            style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }} />
                        {quantityError && <p style={{ color: "red", textAlign: "center" }}>{quantityError}</p>}
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>ඒකකයක (කිලෝවක) මිල </label>
                        <input type="text" value={onitemPrice} onChange={handleOnitemPriceChange} required 
                            style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }} />
                        {onitemPriceError && <p style={{ color: "red", textAlign: "center" }}>
                        {onitemPriceError}</p>}
                    </div>
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "15px" }}>

                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>බෙදා හැරීමේ මාධ්‍යය</label>
                        <select value={distributionMethod} onChange={(e) => setDistributionMethod(e.target.value)} required 
                            style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }}>
                            <option value="" disabled></option>
                            <option value="භාරදීම">භාරදීම</option>
                            <option value="සෘජු විකිණීම">සෘජු විකිණීම</option>
                            <option value="තොග වශයෙන්">තොග වශයෙන්</option>
                            <option value="දේශීය වෙළෙඳපොළ">දේශීය වෙළෙඳපොළ</option>
                            <option value="විදේශ වෙළෙඳපොළ">විදේශ වෙළෙඳපොළ</option>
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={{ display: "block", marginBottom: "5px" }}>ප්‍රවාහන මාධ්‍යය</label>
                        <select value={additionalDetails} onChange={(e) => setAdditionalDetails(e.target.value)} 
                                style={{ background: "#f1f1f1", border: "1px solid black", color: "black", width: "100%", height: "40px", borderRadius: "5px", padding: "5px" }}>
                            <option value="" disabled></option>    
                            <option value="බසය">බසය</option>
                            <option value="දුම්රිය">දුම්රිය</option>
                            <option value="මෝටර් රථය">මෝටර් රථය</option>
                            <option value="බයිසිකලය">බයිසිකලය</option>
                            <option value="Tractor රථය">Tractor රථය</option>
                            <option value="Truck රථය">Truck රථය</option>
                            
                        </select>
                    </div>
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label style={{ display: "block", marginBottom: "5px" }}>පාරිභෝගිකයාගේ විස්තර</label>
                    <textarea 
                        value={customerInfo} 
                        onChange={(e) => setCustomerInfo(e.target.value)} 
                        placeholder="පාරිභෝගිකයාගේ නම...
පාරිභෝගිකයාගේ දුරකථන අංකය...
වෙළදස්ථානය .."
                        style={{ background: "#f1f1f1", border: "1px solid black", width: "100%", height: "80px", borderRadius: "5px", padding: "5px" }} />
                </div>

                
                <div style={{ marginBottom: "15px", textAlign: "center" }}>
                    <label style={{ display: "block", marginBottom: "5px", fontSize: "16px" }}> 
                        මුළු මුදල: 
                        <span style={{ fontWeight: "bold", marginLeft: "5px", fontSize: "18px" }}> 
                            රු. {quantity && onitemPrice ? (parseFloat(quantity) * parseFloat(onitemPrice)).toFixed(2) : "0.00"} 
                        </span>
                    </label>
                </div>

                <button type="submit" style={{ width: "100%", height: "40px", background: "green", color: "white", border: "none", borderRadius: "5px", fontSize: "18px", cursor: "pointer" }}
                onMouseEnter={(e) => e.target.style.background = "#218838"} // Darker green on hover
                onMouseLeave={(e) => e.target.style.background = "#28a745"} // Original gree
                >ඇතුලත් කරන්න</button>
            </form>


            <ToastContainer 
                style={{
                    position: "fixed",
                    top: "20px", // Start from the bottom
                    left: "50%",
                    transform: "translateX(-50%)",
                    textAlign: "center",
                    animation: "slideUp 0.5s ease" // Animation to move the toast up
                }} 
                position="top-center"  // Show from top-center
                autoClose={5000} 
                hideProgressBar={false} 
                newestOnTop={false} 
                closeOnClick 
                rtl={false} 
                pauseOnFocusLoss 
                draggable 
                pauseOnHover 
                theme="light"
            />
        </div>
    );
}

export default AddSale;
