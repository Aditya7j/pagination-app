import { Link, useNavigate } from "react-router-dom";
import { img_url } from "../constant/url";
import "../scss/productNavbar.scss";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const ProductNavbar = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login"); // redirect to login page
    };

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
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
                    <Link to="/product" className="nav-li">
                        <li>Product</li>
                    </Link>
                    <li>Categories</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>

            <div className="navbar-right">

                <div className="nav-icons">
                    {currentUser ? (
                        <>
                            <p className="name-text">{currentUser.name}</p>

                            <FaSignOutAlt
                                className="icon logout-icon"
                                onClick={handleLogout}
                                title="Logout"
                            />
                        </>

                    ) : (
                        <Link to="/login">
                            <FaUser className="icon" />
                        </Link>
                    )}
                    {currentUser ? "" : ""}
                </div>
            </div>
        </nav>
    );
};

export default ProductNavbar;