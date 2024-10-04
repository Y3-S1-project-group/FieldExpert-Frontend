import React from 'react'

import Footer from '../../components/Footer/Footer'
import CustomDisplayInventory from '../../components/CustomDisplayInventory/CustomDisplayInventory';


const ClientInventory = () => {
  return (
    <>
    {/*
      <NavBar />*/
      }
      <div className="ml-2 mt-8 px-2">
      <br />
      <br />
      <CustomDisplayInventory/>

      </div>
      <Footer />
    </>
  );
}

export default ClientInventory
