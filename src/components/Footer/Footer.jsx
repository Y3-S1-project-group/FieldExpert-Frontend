import React from 'react'
import "../../Styles/footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h3>FieldExpert</h3>
            <p>SLIIT Malabe Campus, New Kandy Rd, Malabe</p>
            <p>Email: info@fieldxpert.com</p>
            <p>Phone: +94 75 494 7189</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Field Expert. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer
