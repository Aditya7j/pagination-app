import { Link } from "react-router-dom";
import { img_url } from "../constant/url";
import "../scss/productNavbar.scss";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const ProductNavbar = () => {
    return (
        <nav className="product-navbar">
            <div className="navbar-left">
                <Link to="/">
                    <img className="logo" src={img_url} alt="err" />
                </Link>
                <ul className="nav-links">
                    <Link to="/" className="nav-li">
                        <li>Home</li>
                    </Link>
                    <Link to="/" className="nav-li">
                        <li>Product</li>
                    </Link>
                    <li>Categories</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="navbar-right">

                <div className="nav-icons">
                    <FaUser className="icon" />
                    <FaShoppingCart className="icon" />
                </div>
            </div>
        </nav>
    );
};

export default ProductNavbar;