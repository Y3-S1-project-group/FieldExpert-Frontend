import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/display.css";


const DeleteInventory = ({ itemId }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/inventory/deleteInventory/${itemId}`)
      .then((response) => {
        console.log(response.data);
        swal({
          text: "කෘෂිකාර්මික අයිතමය මකන ලදි",
          icon: "success",
          buttons: {
            confirm: { text: "හරි" },
          },
        }).then(() => {
          handleCloseModal();
          window.location.reload(); // Optionally reload the page to refresh the inventory list
        });
      })
      .catch((error) => {
        console.error("Error deleting inventory item:", error);
        swal({
          text: "කෘෂිකාර්මික අයිතමය මකා දැමීමේ දෝෂයකි",
          icon: "error",
          buttons: {
            confirm: { text: "හරි" },
          },
        });
      });
      //window.location.reload();
  };

  return (
    <div>
      {/* Delete button */}
      <button className="btn" onClick={handleShowModal}>
        මකන්න
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div className="fixed inset-0 transition-opacity" onClick={handleCloseModal}>
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <h3><b>
            ඔබට මෙම කෘෂිකාර්මික අයිතමය මකා දැමීමට අවශ්ය බව ඔබට විශ්වාසද?
            </b></h3>
            <div className="flex justify-end">
              <button
                className="bg-customGray text-white py-2 px-4 rounded-lg hover:bg-customGray2 focus:outline-none focus:ring focus:ring-blue-200 mr-4"
                onClick={handleCloseModal}
              >
                අවලංගු කරන්න
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-400"
                onClick={handleDelete}
              >
                මකන්න
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteInventory;
