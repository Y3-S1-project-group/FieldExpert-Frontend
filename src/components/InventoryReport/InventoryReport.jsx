import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/display.css";

const PurchaseReport = () => {
  const [show, setShow] = useState(false); // Control modal visibility
  const [monthlyPurchases, setMonthlyPurchases] = useState([]); // Store monthly purchases data
  const componentRef = useRef(); // Reference to the report content for printing

  const handleClose = () => setShow(false); // Close the modal
  const handleShow = () => setShow(true); // Show the modal

  // Fetch the monthly purchases by category from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/inventory/calculateMonthlyPurchasesByCategory")
      .then((res) => {
        setMonthlyPurchases(res.data); // Set the fetched data
      })
      .catch((error) => {
        console.log(error); // Handle errors
      });
  }, []);

  // Helper function to get the month name from the month number
  function getMonthName(monthNumber) {
    const months = [
      "ජනවාරි",
      "පෙබරවාරි",
      "මාර්තු",
      "අප් රේල්",
      "මැයි",
      "ජූනි",
      "ජූලි",
      "අගෝස්තු",
      "සැප්තැම්බර්",
      "ඔක්තෝම්බර්",
      "නොවැම්බර්",
      "දෙසැම්බර්",
    ];
    return months[monthNumber - 1];
  }

  // Function to print the content
  const handlePrint = () => {
    const printWindow = window.open("", "_blank"); // Open a new window

    // Get the content from the modal
    const content = componentRef.current.innerHTML;

    // Write content to the new window
    printWindow.document.write(`
      <html>
        <head>
          <title>Monthly Purchase Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; }
            th { background-color: #f2f2f2; }
            .font-bold { font-weight: bold; }
            .bg-gray-100 { background-color: #f7fafc; }
          </style>
        </head>
        <body>
          <div>${content}</div>
        </body>
      </html>
    `);

    printWindow.document.close(); // Close the document to render it
    printWindow.focus(); // Focus on the new window
    printWindow.print(); // Print the content
    printWindow.close(); // Close the window after printing
  };

  return (
    <>
      {/* Button to show the report */}
      <button
        className="bg-customGreen text-white font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClick={handleShow}
      >
        වාර්තාව උත්පාදනය කරන්න
      </button>

      {/* Modal for displaying the report */}
      {show && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <div ref={componentRef}>
              <div className="flex justify-between items-center mb-4">
                <h1>
                  <center>මාසික කෘෂිකාර්මික අයිතම වාර්තාව</center>
                </h1>
                {/* Close button */}
                <button
                  className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
                  onClick={handleClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Report content */}
              <div>
                {monthlyPurchases.length === 0 ? (
                  <p>දත්ත නොමැත</p>
                ) : (
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th>මාසය</th>
                        <th>වර්ගය</th>
                        <th>මුළු මිලදී ගැනීම්</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyPurchases.map((monthData, i) => (
                        <React.Fragment key={i}>
                          {/* Display month as a single row */}
                          <tr>
                            <td colSpan="3" className="font-bold text-left">
                              {getMonthName(parseInt(monthData.MonthYear.split("-")[1]))}{" "}
                              {monthData.MonthYear.split("-")[0]}
                            </td>
                          </tr>
                          {/* Loop through each category for the month */}
                          {monthData.Categories.map((category, j) => (
                            <tr key={j}>
                              <td></td>
                              <td>{category.Category}</td>
                              <td>{category.Total.toFixed(2)}</td>
                            </tr>
                          ))}
                          {/* Display total purchase for the month */}
                          <tr className="font-bold">
                            <td colSpan="2">මුළු එකතුව</td>
                            <td>{monthData.TotalPurchase.toFixed(2)}</td>
                          </tr>
                          {/* Display the annual total (once per year, typically at the end of the year) */}
                          {i === monthlyPurchases.length - 1 || // Last entry in the array
                          monthData.MonthYear.split("-")[0] !== monthlyPurchases[i + 1]?.MonthYear.split("-")[0] ? (
                            <tr className="font-bold bg-gray-100">
                              <td colSpan="2">වසරේ මුළු එකතුව</td>
                              <td>{monthData.AnnualTotal.toFixed(2)}</td>
                            </tr>
                          ) : null}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            {/* Print and Close buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-customGreen text-white font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
                onClick={handlePrint}
              >
                වාර්තාව මුද්‍රණය කරන්න
              </button>
              <button
                className="bg-customGreen text-white font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
                onClick={handleClose}
              >
                වහන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseReport;
