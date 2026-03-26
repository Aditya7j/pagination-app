import { Link } from "react-router-dom";
import "../scss/errorPage.scss";

const ErrorPage = () => {
    return (
        <div className="error-page">
            <h1>404</h1>
            <h2>Oops! Page Not Found</h2>
            <p>The page you are looking for might have been removed or the URL is incorrect.</p>
            <Link to="/" className="back-home-btn">Go to Home</Link>
        </div>
    );
};

export default ErrorPage;