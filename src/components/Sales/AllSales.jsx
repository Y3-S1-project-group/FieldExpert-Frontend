import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import salesBG from '../../assets/salesBG.jpg';
import searchMenu from '../../assets/searchMenu.png';
import html2pdf from 'html2pdf.js'; // Importing the report header image

function AllSales() {
    const [sales, setSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [editingSale, setEditingSale] = useState(null);
    const [updatedQuantity, setUpdatedQuantity] = useState(0);
    const [updatedOnitemPrice, setUpdatedOnitemPrice] = useState(0);
    const [updatedTotalPrice, setUpdatedTotalPrice] = useState(0);
    const [updatedCropType, setUpdatedCropType] = useState('');
    const [updatedSaleDate, setUpdatedSaleDate] = useState('');
    const [updatedCustomerInfo, setUpdatedCustomerInfo] = useState('');
    const [updatedDistributionMethod, setUpdatedDistributionMethod] = useState('');
    const [updatedAdditionalDetails, setUpdatedAdditionalDetails] = useState('');

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/Sale/SD');
            setSales(response.data);
        } catch (error) {
            toast.error("විකුණුම් දත්ත ලබා ගැනීමේ දෝෂයක් ඇති විය.");
        } finally {
            setLoading(false);
        }
    };

    const deleteSale = async (id) => {
        Swal.fire({
            title: "ඔබට විශ්වාස ද?",
            text: "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැක.!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ඔව්,එය මකන්න"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/Sale/deleteSD/${id}`);
                    toast.success("විකිණීම සාර්ථකව මකා දමන ලදී!");
                    fetchSalesData();
                } catch (error) {
                    toast.error("විකිණීම මැකීමේ දෝෂයක් ඇති විය.");
                }
            }
        });
    };

    const startEditing = (sale) => {
        setEditingSale(sale._id);
        setUpdatedQuantity(sale.quantity);
        setUpdatedOnitemPrice(sale.onitemPrice);
        setUpdatedTotalPrice(sale.quantity * sale.onitemPrice);
        setUpdatedCropType(sale.cropType);
        setUpdatedSaleDate(formatDate(sale.saleDate));
        setUpdatedCustomerInfo(sale.customerInfo);
        setUpdatedDistributionMethod(sale.distributionMethod);
        setUpdatedAdditionalDetails(sale.additionalDetails);
    };

    const handleUpdate = async (id) => {
        try {
            const updatedSale = {
                cropType: updatedCropType,
                saleDate: updatedSaleDate,
                customerInfo: updatedCustomerInfo,
                distributionMethod: updatedDistributionMethod,
                additionalDetails: updatedAdditionalDetails,
                quantity: Number(updatedQuantity),
                onitemPrice: Number(updatedOnitemPrice),
                totalPrice: Number(updatedTotalPrice)
            };

            await axios.put(`http://localhost:5000/Sale/updateSD/${id}`, updatedSale);
            toast.success("විකිණීම සාර්ථකව යාවත්කාලීන කරන ලදී!");
            setEditingSale(null);
            fetchSalesData();
        } catch (error) {
            toast.error("විකිණීම යාවත්කාලීන කිරීමේදී දෝෂයක් ඇති විය.");
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const handleQuantityChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setUpdatedQuantity(value);
            setUpdatedTotalPrice(value * updatedOnitemPrice);
        }
    };
    
    const handleOnitemPriceChange = (e) => {
        const value = Number(e.target.value);
        if (value >= 0) {
            setUpdatedOnitemPrice(value);
            setUpdatedTotalPrice(updatedQuantity * value);
        }
    };

    const generatePDF = () => {
        const element = document.getElementById('sales-table');
        const imageUrl = ''; // Update with your image path or URL
    
        // Apply CSS scaling to shrink the table size further
        element.style.transform = 'scale(0.87)';
        element.style.transformOrigin = 'top left'; // Adjust the origin point to prevent shifting
        element.style.width = '80%'; // Adjust width to fit within the page
        element.style.height = 'auto';
    
        const opt = {
            margin: 0.5,
            filename: 'Sales_Report.pdf',
            image: { type: 'jpeg', quality: 1.0 },
            html2canvas: { scale: 2.0 }, // Scale adjusted to shrink the table further
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
    
        // Generate the PDF
        html2pdf().from(element).set(opt).toPdf().get('pdf').then((pdf) => {
            // Add image to the PDF at the top
            pdf.addImage(imageUrl, 'JPEG', 0.5, 0.5, 5, 2); // Adjust these values as needed
    
            // Save the PDF
            pdf.save('Sales_Report.pdf');
        }).then(() => {
            // Reset the CSS scaling after PDF is generated
            element.style.transform = 'none';
            element.style.width = '';
            element.style.height = '';
        });
    };
    
    
    

    // Fixed search function
    const filteredSales = sales.filter((sale) => 
        sale.cropType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customerInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <ToastContainer />
            <div style={{ padding: "10px", marginTop: "80px" }}>
                <h1 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>විකුණුම්</h1>

                <div className="Msearch-container" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                    <input
                        type="text"
                        placeholder="බෝග වර්ගය , පාරිභෝගිකයාගේ නම"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            backgroundImage: `url(${searchMenu})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'calc(100% - 10px) center',
                            backgroundSize: '30px',
                            paddingLeft: '40px',
                            height: '50px',
                            width: '450px',
                            border: '1px solid #ccc',
                            borderRadius: '40px',
                        }}
                    />
                </div>

                <table id="sales-table" style={{
                    width: "80%", // Decrease the width to 80%
                    borderCollapse: "collapse",
                    margin: "0 auto 20px auto",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    overflow: "hidden",
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    fontSize: "0.9em", // Decrease font size
                    padding: "8px", // Add padding for cells
                }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", border: "1px solid black" }}>බෝග වර්ගය</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", border: "1px solid black" }}>අස්වනු ප්‍රමාණය (කිලෝ)</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", border: "1px solid black" }}>කිලෝවක මිල</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", border: "1px solid black" }}>විකුණුම් දවස</th>      
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", width: "150px", border: "1px solid black" }}>පාරිභෝගිකයාගේ විස්තර</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", width: "100px", border: "1px solid black" }}>බෙදා හැරීමේ මාධ්‍යය</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", border: "1px solid black" }}>ප්‍රවාහන මාධ්‍යය</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", width: "150px", border: "1px solid black" }}>මුළු මුදල රු.</th>
                            <th style={{ padding: "12px", textAlign: "center", backgroundColor: "#f2f2f2", width: "250px", border: "1px solid black" }}>ක්‍රියාව</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSales.map((sale) => (
                            <tr key={sale._id}>
                                {editingSale === sale._id ? (
                                    <>
                                        {/* Crop Type Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <input
                                                type="text"
                                                value={updatedCropType}
                                                onChange={(e) => setUpdatedCropType(e.target.value)}
                                                style={{ width: "100px" }}
                                            />
                                        </td>

                                        {/* Quantity Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <input
                                                type="number"
                                                value={updatedQuantity || ""}
                                                onChange={(e) => {
                                                    const newValue = e.target.value === "" ? 0 : Number(e.target.value);
                                                    setUpdatedQuantity(newValue);
                                                    setUpdatedTotalPrice(newValue * updatedOnitemPrice);
                                                }}
                                                style={{ width: "100px" }}
                                            />
                                        </td>

                                        {/* On Item Price Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <input
                                                type="number"
                                                value={updatedOnitemPrice === null ? "" : updatedOnitemPrice}
                                                onChange={(e) => {
                                                    const value = e.target.value === "" ? null : Number(e.target.value);
                                                    setUpdatedOnitemPrice(value);
                                                    setUpdatedTotalPrice(updatedQuantity * (value || 0));
                                                }}
                                                style={{ width: "100px" }}
                                            />
                                        </td>

                                        {/* Sale Date Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <input
                                                type="date"
                                                value={updatedSaleDate}
                                                onChange={(e) => setUpdatedSaleDate(e.target.value)}
                                            />
                                        </td>

                                        {/* Customer Info Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <input
                                                type="text"
                                                value={updatedCustomerInfo}
                                                onChange={(e) => setUpdatedCustomerInfo(e.target.value)}
                                                style={{ width: "100px" }}
                                            />
                                        </td>

                                        {/* Distribution Method Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <select
                                                value={updatedDistributionMethod}
                                                onChange={(e) => setUpdatedDistributionMethod(e.target.value)}
                                            >
                                                <option value=""></option>
                                                <option value="භාරදීම">භාරදීම</option>
                                                <option value="සෘජු විකිණීම">සෘජු විකිණීම</option>
                                                <option value="තොග වශයෙන්">තොග වශයෙන්</option>
                                                <option value="දේශීය වෙළෙඳපොළ">දේශීය වෙළෙඳපොළ</option>
                                                <option value="විදේශ වෙළෙඳපොළ">විදේශ වෙළෙඳපොළ</option>
                                            </select>
                                        </td>

                                        {/* Additional Details Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            <select
                                                value={updatedAdditionalDetails}
                                                onChange={(e) => setUpdatedAdditionalDetails(e.target.value)}
                                            >
                                                <option value="" disabled></option>
                                                <option value="බසය">බසය</option>
                                                <option value="දුම්රිය">දුම්රිය</option>
                                                <option value="මෝටර් රථය">මෝටර් රථය</option>
                                                <option value="බයිසිකලය">බයිසිකලය</option>
                                                <option value="Tractor රථය">Tractor රථය</option>
                                                <option value="Truck රථය">Truck රථය</option>
                                            </select>
                                        </td>

                                        {/* Total Price Column */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>
                                            රු. {parseFloat(updatedTotalPrice || 0).toFixed(2)}
                                        </td>

                                        {/* Actions Column */}
                                        <td style={{ padding: "15px", textAlign: "center", border: "1px solid black" }}>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                            <button
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "darkorange"}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "orange"}
                                                onClick={() => handleUpdate(sale._id)}
                                                style={{ padding: "8px 12px", marginRight: "5px", backgroundColor: "green", color: "white", borderRadius: "10px", cursor: "pointer" }}>සුරකින්න</button>

                                            <button
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "darkgray"}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "gray"}
                                                onClick={() => setEditingSale(null)}
                                                style={{ padding: "8px 12px", backgroundColor: "gray", color: "white", borderRadius: "10px", cursor: "pointer" }}>අවලංගු</button>
                                        </div>
                                        </td>
                                        
                                    </>
                                ) : (
                                    <>
                                        {/* Display Sale Information when not editing */}
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{sale.cropType}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{`${sale.quantity} kg`}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>රු. {parseFloat(sale.onitemPrice || 0).toFixed(2)}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{formatDate(sale.saleDate)}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{sale.customerInfo}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{sale.distributionMethod}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>{sale.additionalDetails}</td>
                                        <td style={{ padding: "10px", lineHeight: "1.6", border: "1px solid black" }}>රු. {parseFloat(sale.totalPrice || 0).toFixed(2)}</td>

                                        {/* Actions Column */}
                                        <td style={{ padding: "15px", textAlign: "center", border: "1px solid black" }}>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                                            <button
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "darkgreen"}
                                                onClick={() => startEditing(sale)}
                                                style={{ padding: "8px 12px", marginRight: "5px", backgroundColor: "green", color: "white", borderRadius: "10px", cursor: "pointer" }}>යාවත්කාලීන</button>

                                            <button
                                                onMouseEnter={(e) => e.target.style.backgroundColor = "darkred"}
                                                onMouseLeave={(e) => e.target.style.backgroundColor = "red"}
                                                onClick={() => deleteSale(sale._id)}
                                                style={{ padding: "8px 12px", backgroundColor: "red", color: "white", borderRadius: "10px", cursor: "pointer" }}>මකන්න</button>
                                        </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>  
                </table>

                <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>

                <button onClick={generatePDF} style={{
                     backgroundColor: 'red',
                     color: 'white',
                     border: 'none',
                     padding: '10px 16px',
                     cursor: 'pointer',
                     borderRadius: '10px',
                     transition: 'background-color 0.3s',
                     display: 'flex',
                     alignItems: 'center',
                     marginLeft: '20px'  // Adjust to control the gap 
                }}>PDF වාර්තාව ලබා ගන්න
                </button>
                </div>

            </div>
        </div>
    );
}

export default AllSales;
