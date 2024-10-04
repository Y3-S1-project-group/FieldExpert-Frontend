import React from 'react'
import "../../Styles/footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-info">
            <h3>Agri Optimizer</h3>
            <p>SLIIT Malabe Campus, New Kandy Rd, Malabe</p>
            <p>Email: info@Agri_Optimizer.com</p>
            <p>Phone: +94 75 494 7189</p>
          </div>
          <div className="footer-social">
            <h3>Connect with Us</h3>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} Agri_Optimizer. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer
