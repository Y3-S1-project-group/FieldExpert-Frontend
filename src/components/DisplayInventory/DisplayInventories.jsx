import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../Styles/display.css";
import UpdateInventory from '../UpdateInventory/UpdateInventory'; // Update inventory component
import DeleteInventory from '../DeleteInventory/DeleteInventory'; // Delete inventory component

function DisplayInventory() {
    const [inventoryItems, setInventoryItems] = useState([]);

    // Fetch all inventory items from the backend
    useEffect(() => {
        axios
          .get("http://localhost:5001/api/inventory/getAllInventory")
          .then((res) => {
            setInventoryItems(res.data); // Set the fetched inventory items in the state
          })
          .catch((error) => {
            console.error("Error fetching inventory items:", error);
          });
    }, []);

    const [search, setSearch] = useState("");

    // Search handler for inventory items
    function searchHandler(e) {
      e.preventDefault();
      if (search.trim().length === 0) {
        return;
      }
      axios
        .get(`http://localhost:5001/api/inventory/searchInventory?search=${search}`)
        .then((res) => {
          setInventoryItems(res.data); // Update state with search results
        })
        .catch((error) => {
          console.log(error);
        });
    }

    return (
      <div>
        <div className="ml-64 justify-center">
          <h2>
            <center>කෘෂිකාර්මික අයිතම</center>
          </h2>
        </div>

        {/* Search bar */}
        <div className="flex justify-center">
          <form
            className="flex items-center"
            onSubmit={searchHandler}
            style={{ marginTop: "25px" }}
          >
            <input
              type="search"
              name="q"
              id="search"
              value={search}
              placeholder="අයිතමයේ නම හෝ වර්ගය ඇතුලත් කරන්න"
              onChange={(e) => setSearch(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 mr-5"
              style={{ width: "500px" }}
            />
            <button className="btn" type="submit">සොයන්න</button>
          </form>
        </div>

        {/* Table to display all inventory items */}
        <div className="container mx-4 px-4 py-8">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th>භාණ්ඩ අංකය</th>
                <th>භාණ්ඩ නාමය</th>
                <th>වර්ගය</th>
                <th>ප්‍රමාණය</th>
                <th>මැනුම් ඒකකයක</th>
                <th>සපයන්නා</th>
                <th>මිලට ගත් දිනය</th>
                <th>කල් ඉකුත් වීමේ දිනය</th>
                <th>ඒකකයක මිල</th>
                <th>ස්ථානය</th>
                <th>බෙදාහැරීමේ අංකය</th>
                <th>විස්තරය</th>
                <th>යාවත්කාලීන කිරීම</th>
                <th>මකන්න</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.ItemID}</td> {/* Display ItemID */}
                  <td>{item.ItemName}</td> {/* Display ItemName */}
                  <td>{item.Category}</td> {/* Display Category */}
                  <td>{item.Quantity}</td> {/* Display Quantity */}
                  <td>{item.UnitOfMeasure}</td> {/* Display UnitOfMeasure */}
                  <td>{item.SupplierName}</td> {/* Display SupplierName */}
                  <td>{new Date(item.PurchaseDate).toLocaleDateString()}</td> {/* Display PurchaseDate */}
                  <td>{new Date(item.ExpiryDate).toLocaleDateString()}</td> {/* Display ExpiryDate */}
                  <td>{item.PricePerUnit}</td> {/* Display PricePerUnit */}
                  <td>{item.Location}</td> {/* Display Location */}
                  <td>{item.BatchNumber}</td> {/* Display BatchNumber */}
                  <td>{item.Description}</td> {/* Display Description */}
                  <td>
                    <UpdateInventory itemId={item.ItemID} /> {/* Update button */}
                  </td>
                  <td>
                    <DeleteInventory itemId={item.ItemID} /> {/* Delete button */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}

export default DisplayInventory;
