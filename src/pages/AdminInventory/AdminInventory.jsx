import React from 'react'

import DisplayInventory from '../../components/DisplayInventory/DisplayInventories'
import InventoryReport from '../../components/InventoryReport/InventoryReport';
import AddInventory from '../../components/AddInventory/AddInventory';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer/Footer';

const AdminInventory = () => {
  return (
    <>
      <Navbar />

      <div className="px-2 mt-40 ml-2">
        
        <InventoryReport />
        <AddInventory />

        <br />
        <br />
        <DisplayInventory />
      </div>
      <Footer />
    </>
  );
}

export default AdminInventory

