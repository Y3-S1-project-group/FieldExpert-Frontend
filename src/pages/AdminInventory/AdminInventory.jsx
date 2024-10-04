import React from 'react'

import DisplayInventory from '../../components/DisplayInventory/DisplayInventories'
import InventoryReport from '../../components/InventoryReport/InventoryReport';
import AddInventory from '../../components/AddInventory/AddInventory';

const AdminInventory = () => {
  return (
    <>
      

      <div className="ml-2 mt-8 px-2">
        <InventoryReport />
        <AddInventory />

        <br />
        <br />
        <DisplayInventory />
      </div>
    </>
  );
}

export default AdminInventory

