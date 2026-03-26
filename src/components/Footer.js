import "../scss/footer.scss";

export const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section about">
          <h2 className="footer-logo">ShopMate</h2>
          <p>
            ShopMate brings you the best products at unbeatable prices. Your
            satisfaction is our top priority.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Products</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="footer-section customer">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get the latest deals and updates</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 ShopMate. All Rights Reserved.</p>
      </div>
    </footer>
  );
};