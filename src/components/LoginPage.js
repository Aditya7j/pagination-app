import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/loginPage.scss";

const LoginPage = () => {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === loginData.email && u.password === loginData.password
        );


        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));

            setMessage(`Welcome back, ${user.name}!`);
            setMessageType("success")
            setTimeout(() => navigate("/"), 1000);

        } else {
            setMessage("Invalid email or password.");
            setMessageType("error")
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="auth-btn">Login</button>
                </form>
                {message && (
                    <p className={`auth-message ${messageType}`}>
                        {message}
                    </p>
                )}
                <p className="switch-text">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;