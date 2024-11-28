import React, { useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/display.css";

const AddInventory = () => {
  const [ItemID, setItemId] = useState("");
  const [ItemName, setItemName] = useState("");
  const [Category, setCategory] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [UnitOfMeasure, setUnitOfMeasure] = useState("");
  const [SupplierName, setSupplierName] = useState("");
  const [PurchaseDate, setPurchaseDate] = useState("");
  const [ExpiryDate, setExpiryDate] = useState("");
  const [PricePerUnit, setPricePerUnit] = useState("");
  const [Location, setLocation] = useState("");
  const [BatchNumber, setBatchNumber] = useState("");
  const [Description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!ItemID) {
      errors.itemId = "අයිතම අංකය අවශ්‍ය වේ";
      isValid = false;
    } else if (ItemID.length > 5) {
      errors.itemId = "අයිතම අංකය අකුරු 5ක් තරමට විය යුතුයි";
      isValid = false;
    }
    

    if (!ItemName) {
      errors.itemName = "අයිතම නාමය අවශ්‍ය වේ";
      isValid = false;
    }

    if (!Category) {
      errors.category = "වර්ගය අවශ්‍ය වේ";
      isValid = false;
    }

    if (!Quantity || Quantity < 0) {
      errors.quantity = "ප්‍රමාණය අවශ්‍ය වේ සහ සෘණ නොවන සංඛ්යාවක් විය යුතුය";
      isValid = false;
    }

    if (!UnitOfMeasure) {
      errors.unitOfMeasure = "මැනුම් ඒකකයක අවශ්‍ය වේ";
      isValid = false;
    }

    if (!SupplierName) {
      errors.supplierName = "සපයන්නා අවශ්‍ය වේ";
      isValid = false;
    }

    if (!PurchaseDate) {
      errors.purchaseDate = "මිලට ගත් දිනය අවශ්‍ය වේ";
      isValid = false;
    }
    
    if (!ExpiryDate) {
      errors.expiryDate = "කල් ඉකුත් වීමේ දිනය අවශ්‍ය වේ";
      isValid = false;
    } else if (new Date(ExpiryDate) <= new Date(PurchaseDate)) {
      errors.expiryDate = "කල් ඉකුත් වීමේ දිනය මිලට ගත් දිනයට පසු විය යුතුයි";
      isValid = false;
    }
    

    if (!PricePerUnit) {
      errors.pricePerUnit = "ඒකකයක මිල අවශ්‍ය වේ";
      isValid = false;
    }

    if (!Location) {
      errors.location = "ගබඩා කරන ලද ස්ථානය අවශ්‍ය වේ";
      isValid = false;
    }

    if (!BatchNumber) {
      errors.batchNumber = "බෙදාහැරීමේ අංකය අවශ්‍ය වේ";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendData = (e) => {
    e.preventDefault();

    const inventoryData = {
      ItemID,
      ItemName,
      Category,
      Quantity: Number(Quantity),
      UnitOfMeasure,
      SupplierName,
      PurchaseDate,
      ExpiryDate,
      PricePerUnit: Number(PricePerUnit),
      Location,
      BatchNumber,
      Description,
    };

    if (validateForm()) {
      axios
        .post("http://localhost:5000/api/inventory/addInventory", inventoryData)
        .then(function (response) {
          console.log(response.data);

          // Clear the form inputs
          setItemId("");
          setItemName("");
          setCategory("");
          setQuantity("");
          setUnitOfMeasure("");
          setSupplierName("");
          setPurchaseDate("");
          setExpiryDate("");
          setPricePerUnit("");
          setLocation("");
          setBatchNumber("");
          setDescription("");

          swal({
            text: "කෘෂිකාර්මික අයිතමය එක් කරන ලදි",
            icon: "success",
            buttons: {
              cancel: { text: "අවලංගු කරන්න" },
              confirm: { text: "හරි" },
            },
          }).then((value) => {
            handleCloseModal();
            window.location.reload();
          });
        })
        .catch(function (error) {
          console.log('Error response:', error.response);
          console.log('Error message:', error.message);
          alert("කෘෂිකාර්මික අයිතමය එක් කිරීම අසාර්ථකයි");
        });

      handleCloseModal();
      //window.location.reload();
    }
  };

  return (
    <div>
      <button
        className="bg-customGreen text-white font-bold py-2 px-4 rounded mb-4 mr-4 float-right"
        onClick={handleShowModal}
      >
        <span className="mr-2">+</span> අයිතම එක් කරන්න
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
          <div
            className="fixed inset-0 transition-opacity"
            onClick={handleCloseModal}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
          </div>
          <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-xl w-full">
            <button
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
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
            <h2><center>කෘෂිකාර්මික අයිතම එක් කරන්න</center></h2>
            {/* Form */}
            <div className="form-container">
              <form onSubmit={sendData} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="ItemId">අයිතම අංකය</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="ItemId"
                          placeholder="අයිතම අංකය ඇතුලත් කරන්න"
                          required
                          value={ItemID}
                          onChange={(e) => setItemId(e.target.value)}
                        />
                        {errors.itemId && (
                          <div className="text-red-600">{errors.itemId}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ItemName">අයිතම නාමය</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="ItemName"
                          placeholder="අයිතම නාමය ඇතුලත් කරන්න"
                          required
                          value={ItemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        {errors.itemName && (
                          <div className="text-red-600">{errors.itemName}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Category">වර්ගය</label>
                      </th>
                      <td className="data">
                        {/* Dropdown for Category */}
                        <select
                          id="Category"
                          required
                          value={Category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="">වර්ගය තෝරන්න</option>
                          <option value="බීජ">බීජ</option>
                          <option value="පොහොර">පොහොර</option>
                          <option value="මෙවලම්">මෙවලම්</option>
                          <option value="පළිබෝධනාශක">පළිබෝධනාශක</option>
                          <option value="වල් නාශක">වල් නාශක</option>
                        </select>
                        {errors.category && (
                          <div className="text-red-600">{errors.category}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Quantity">ප්‍රමාණය</label>
                      </th>
                      <td>
                        <input
                          type="number"
                          id="Quantity"
                          placeholder="ප්‍රමාණය ඇතුලත් කරන්න"
                          required
                          min="0" // Ensure that only non-negative numbers are entered
                          value={Quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && (
                          <div className="text-red-600">{errors.quantity}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="UnitOfMeasure">මැනුම් ඒකකයක</label>
                      </th>
                      <td className="data">
                        {/* Dropdown for Unit of Measure */}
                        <select
                          id="UnitOfMeasure"
                          required
                          value={UnitOfMeasure}
                          onChange={(e) => setUnitOfMeasure(e.target.value)}
                        >
                          <option value="">මැනුම් ඒකකයක තෝරන්න</option>
                          <option value="කිලෝග්රෑම්">කිලෝග්රෑම්</option>
                          <option value="ලීටර්">ලීටර්</option>
                          <option value="ඒකක">ඒකක</option>
                        </select>
                        {errors.unitOfMeasure && (
                          <div className="text-red-600">{errors.unitOfMeasure}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="SupplierName">සපයන්නා</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="SupplierName"
                          placeholder="සපයන්නා ඇතුලත් කරන්න"
                          required
                          value={SupplierName}
                          onChange={(e) => setSupplierName(e.target.value)}
                        />
                        {errors.supplierName && (
                          <div className="text-red-600">{errors.supplierName}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="PurchaseDate">මිලට ගත් දිනය</label>
                      </th>
                      <td>
                        <input
                          type="date"
                          id="PurchaseDate"
                          required
                          value={PurchaseDate}
                          onChange={(e) => setPurchaseDate(e.target.value)}
                        />
                        {errors.purchaseDate && (
                          <div className="text-red-600">{errors.purchaseDate}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="ExpiryDate">කල් ඉකුත් වීමේ දිනය</label>
                      </th>
                      <td>
                        <input
                          type="date"
                          id="ExpiryDate"
                          required
                          value={ExpiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <div className="text-red-600">{errors.expiryDate}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="PricePerUnit">ඒකකයක මිල</label>
                      </th>
                      <td>
                        <input
                          type="number"
                          id="PricePerUnit"
                          placeholder="ඒකකයක මිල ඇතුලත් කරන්න"
                          required
                          value={PricePerUnit}
                          onChange={(e) => setPricePerUnit(e.target.value)}
                        />
                        {errors.pricePerUnit && (
                          <div className="text-red-600">{errors.pricePerUnit}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Location">ගබඩා කරන ලද ස්ථානය
                        </label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="Location"
                          placeholder="ගබඩා ස්ථානය ඇතුලත් කරන්න"
                          required
                          value={Location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        {errors.location && (
                          <div className="text-red-600">{errors.location}</div>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="BatchNumber">බෙදාහැරීමේ අංකය</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          id="BatchNumber"
                          placeholder="අංකය ඇතුලත් කරන්න"
                          value={BatchNumber}
                          onChange={(e) => setBatchNumber(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Description">විස්තරය</label>
                      </th>
                      <td>
                        <textarea
                          id="Description"
                          placeholder="විස්තරය ඇතුලත් කරන්න"
                          value={Description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button className="btn" type="submit">
                        යොමු කරන්න
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddInventory;
