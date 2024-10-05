import React, { useEffect, useState, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Navbar from "../components/Navbar";
import './Fertilizer.css';
import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const CultivatedLandAreaChart = () => {
    const [cityData, setCityData] = useState({});
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const chartRefs = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/Crop/getCrops');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const cityAreas = {};
                data.forEach(crop => {
                    const { city, area, cropName } = crop;
                    const areaValue = parseFloat(area.replace('m²', '').trim());

                    if (!cityAreas[city]) {
                        cityAreas[city] = {};
                    }

                    if (!cityAreas[city][cropName]) {
                        cityAreas[city][cropName] = 0;
                    }

                    cityAreas[city][cropName] += areaValue;
                });

                const uniqueCityData = Object.entries(cityAreas).reduce((acc, [city, crops]) => {
                    const normalizedCity = city.trim().toLowerCase();
                    if (!acc[normalizedCity]) {
                        acc[normalizedCity] = { displayName: city, crops };
                    } else {
                        Object.entries(crops).forEach(([crop, area]) => {
                            if (!acc[normalizedCity].crops[crop]) {
                                acc[normalizedCity].crops[crop] = 0;
                            }
                            acc[normalizedCity].crops[crop] += area;
                        });
                    }
                    return acc;
                }, {});

                setCityData(uniqueCityData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                setError(error.message);
            }
        };

        fetchData();
    }, []);

    const getChartData = (crops) => {
        const labels = Object.keys(crops);
        const data = Object.values(crops);
        const backgroundColor = [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
            '#FF9F40', '#4B8BF4', '#9B59B6', '#E67E22', '#2ECC71',
        ];

        return {
            labels,
            datasets: [{
                data,
                backgroundColor,
                hoverBackgroundColor: backgroundColor,
            }],
        };
    };

    const filteredCityData = Object.entries(cityData).filter(([_, { displayName }]) =>
        displayName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const generatePDF = async () => {
        const report = document.createElement('div');
        report.style.padding = '20px';
        report.style.fontFamily = 'Arial, sans-serif';

        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.marginBottom = '20px';

        const logoImg = document.createElement('img');
        logoImg.src = logo;
        logoImg.style.width = '100px';
        logoImg.style.marginRight = '20px';

        const title = document.createElement('h1');
        title.textContent = 'කෘෂිකර්ම භූමි ප්‍රදේශ වාර්තාව';
        title.style.color = '#333';

        header.appendChild(logoImg);
        header.appendChild(title);
        report.appendChild(header);

        for (const [normalizedCity, { displayName, crops }] of Object.entries(cityData)) {
            const citySection = document.createElement('div');
            citySection.style.marginBottom = '40px';
            citySection.style.pageBreakInside = 'avoid';

            const cityTitle = document.createElement('h2');
            cityTitle.textContent = displayName;
            cityTitle.style.color = '#444';
            cityTitle.style.borderBottom = '2px solid #ddd';
            cityTitle.style.paddingBottom = '10px';
            citySection.appendChild(cityTitle);

            const chartContainer = document.createElement('div');
            chartContainer.style.width = '500px';
            chartContainer.style.height = '300px';
            chartContainer.style.margin = '20px auto';

            const chartInstance = chartRefs.current[normalizedCity];
            if (chartInstance) {
                const chartImage = chartInstance.toBase64Image();
                const img = document.createElement('img');
                img.src = chartImage;
                img.style.width = '100%';
                img.style.height = 'auto';
                chartContainer.appendChild(img);
            } else {
                chartContainer.textContent = 'Chart not available';
            }

            citySection.appendChild(chartContainer);

            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.style.marginTop = '210px';
            table.style.color = 'black'; // Set the table text color to black

            const tableHeader = table.createTHead();
            const headerRow = tableHeader.insertRow();
            ['Crop', 'Area (m²)'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                th.style.backgroundColor = '#f2f2f2';
                th.style.padding = '10px';
                th.style.textAlign = 'left';
                th.style.color = 'black'; // Ensure header text is black
                headerRow.appendChild(th);
            });

            const tableBody = table.createTBody();
            Object.entries(crops).forEach(([crop, area]) => {
                const row = tableBody.insertRow();
                const cellCrop = row.insertCell();
                const cellArea = row.insertCell();
                cellCrop.textContent = crop;
                cellArea.textContent = area.toFixed(2);
                cellCrop.style.padding = '8px';
                cellArea.style.padding = '8px';
                cellCrop.style.borderBottom = '1px solid #ddd';
                cellArea.style.borderBottom = '1px solid #ddd';
                cellCrop.style.color = 'black'; // Ensure cell text is black
                cellArea.style.color = 'black'; // Ensure cell text is black
            });

            citySection.appendChild(table);
            report.appendChild(citySection);
        }

        html2pdf()
            .from(report)
            .set({
                margin: 10,
                filename: 'cultivated_land_area_report.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            })
            .save();
    };


    if (error) {
        return <div className="text-red-600 font-bold p-4 bg-red-100 rounded-lg">{error}</div>;
    }

    return (
        <div>
            
        <Navbar />
        
        <div className="h-screen bg-gradient-to-br from-green-50 to-blue-50">
            
            <div className="container mx-auto px-64 py-40">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">ප්‍රදේශ වල කෘෂිකර්ම භූමිය</h1>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
                    <input
                        type="text"
                        placeholder="Search city"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800 placeholder-gray-500 w-full sm:w-64"
                    />
                    <button
                        onClick={generatePDF}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        Generate PDF Report
                    </button>
                </div>
                {filteredCityData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCityData.map(([normalizedCity, { displayName, crops }]) => (
                            <div key={normalizedCity} className="bg-white shadow-lg rounded-lg overflow-hidden">
                                <div className="bg-green-500 text-white p-4">
                                    <h3 className="text-xl font-semibold">{displayName}</h3>
                                </div>
                                <div className="p-4">
                                    <Pie
                                        ref={(el) => { chartRefs.current[normalizedCity] = el; }}
                                        data={getChartData(crops)}
                                        options={{
                                            plugins: {
                                                tooltip: {
                                                    callbacks: {
                                                        label: (context) => {
                                                            const label = context.label || '';
                                                            const value = context.raw || 0;
                                                            return `${label}: ${value.toFixed(2)} m²`;
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-8 p-4 bg-gray-100 rounded-lg">No data available.</div>
                )}
                
            </div>  
            <div className="fixed bottom-80 right-32 bg-white shadow-lg p-8 rounded-lg max-w-md w-100">
        <h1 className="text-xl font-bold mb-2 text-gray-800">මෙමගින් !</h1>
                <h3 className="text-xl text-gray-700">
                    ඔබගේ වගාව සඳහා හොඳම පොහොර නිර්දේශ ලබා ගැනීමට, විශේෂිත පොහොර වර්ගයන් සහ යෙදීමේ උපදෙස් සපයයි. වගාව, භූමි ප්‍රදේශය, සහ පොහොර ප්‍රමාණය අනුව නිවැරදි පොහොර ක්‍රමවේදයන් පිළිබඳව තොරතුරු ලබා දේ.
                </h3>
            </div>
        </div>
        
      </div>
    
    );
};

export default CultivatedLandAreaChart;