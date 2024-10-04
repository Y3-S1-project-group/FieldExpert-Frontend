import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import axios from "axios";
import "../../Styles/display.css";

const UpdateInventory = ({ itemId }) => {
  const [ItemID, setItemID] = useState("");
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
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!ItemID) {
      errors.itemId = "අයිතමය අංකය අවශ්‍ය වේ";
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

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/inventory/getInventory/${itemId}`)
      .then((res) => {
        const item = res.data;
        setItemID(item.ItemID);
        setItemName(item.ItemName);
        setCategory(item.Category);
        setQuantity(item.Quantity);
        setUnitOfMeasure(item.UnitOfMeasure);
        setSupplierName(item.SupplierName);
        setPurchaseDate(item.PurchaseDate.substring(0, 10)); // Convert to YYYY-MM-DD format
        setExpiryDate(item.ExpiryDate.substring(0, 10));
        setPricePerUnit(item.PricePerUnit);
        setLocation(item.Location);
        setBatchNumber(item.BatchNumber);
        setDescription(item.Description || "");
      })
      .catch((error) => console.log(error));
  }, [itemId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const inventoryData = {
      ItemID,
      ItemName,
      Category,
      Quantity,
      UnitOfMeasure,
      SupplierName,
      PurchaseDate,
      ExpiryDate,
      PricePerUnit,
      Location,
      BatchNumber,
      Description,
    };
    if (validateForm()) {
      axios
        .put(
          `http://localhost:5001/api/inventory/updateInventory/${itemId}`,
          inventoryData
        )
        .then((response) => {
          swal({
            text: "සාර්ථකව යාවත්කාලීන කරන ලදි",
            icon: "success",
            buttons: {
              cancel: { text: "අවලංගු කරන්න" },
              confirm: { text: "හරි" },
            },
          }).then(() => {
            handleCloseModal();
            window.location.reload();
          });
        })
        .catch((error) => {
          console.log(error);
          alert("යාවත්කාලීන කිරීම අසාර්ථකයි");
        });
    }
  };

  return (
    <div>
      <button className="btn" onClick={handleShowModal}>
        යාවත්කාලීන කිරීම
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
            {/* Form */}
            <div className="form-container">
              <h2>
                <center>කෘෂිකාර්මික අයිතම යාවත්කාලීන කිරීම</center>
              </h2>
              <form onSubmit={handleSubmit} className="form-table">
                <table>
                  <tbody>
                    <tr>
                      <th>
                        <label htmlFor="ItemID">අයිතම අංකය</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="itemId"
                          value={ItemID}
                          onChange={(e) => setItemID(e.target.value)}
                        />
                        {errors.itemId && (
                          <span className="text-red-600">{errors.itemId}</span>
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
                          name="itemName"
                          value={ItemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        {errors.itemName && (
                          <span className="text-red-600">{errors.itemName}</span>
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
                          <span className="text-red-600">{errors.category}</span>
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
                          name="quantity"
                          value={Quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && (
                          <span className="text-red-600">{errors.quantity}</span>
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
                          <option value="">මිනුම් ඒකකය තෝරන්න</option>
                          <option value="කිලෝග්රෑම්">කිලෝග්රෑම්</option>
                          <option value="ලීටර්">ලීටර්</option>
                          <option value="ඒකක">ඒකක</option>
                        </select>
                        {errors.unitOfMeasure && (
                          <span className="text-red-600">{errors.unitOfMeasure}</span>
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
                          name="supplierName"
                          value={SupplierName}
                          onChange={(e) => setSupplierName(e.target.value)}
                        />
                        {errors.supplierName && (
                          <span className="text-red-600">{errors.supplierName}</span>
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
                          name="purchaseDate"
                          value={PurchaseDate}
                          onChange={(e) => setPurchaseDate(e.target.value)}
                        />
                        {errors.purchaseDate && (
                          <span className="text-red-600">{errors.purchaseDate}</span>
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
                          name="expiryDate"
                          value={ExpiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                        {errors.expiryDate && (
                          <span className="text-red-600">{errors.expiryDate}</span>
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
                          name="pricePerUnit"
                          value={PricePerUnit}
                          onChange={(e) => setPricePerUnit(e.target.value)}
                        />
                        {errors.pricePerUnit && (
                          <span className="text-red-600">{errors.pricePerUnit}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Location">ගබඩා කරන ලද ස්ථානය</label>
                      </th>
                      <td>
                        <input
                          type="text"
                          name="location"
                          value={Location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                        {errors.location && (
                          <span className="text-red-600">{errors.location}</span>
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
                          name="batchNumber"
                          value={BatchNumber}
                          onChange={(e) => setBatchNumber(e.target.value)}
                        />
                        {errors.batchNumber && (
                          <span className="text-red-600">{errors.batchNumber}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="Description">විස්තරය</label>
                      </th>
                      <td>
                        <textarea
                          name="description"
                          value={Description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                        {errors.description && (
                          <span className="text-red-600">{errors.description}</span>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <button className="btn" type="submit">
                        යාවත්කාලීන කරන්න
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

export default UpdateInventory;
