import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../scss/loginPage.scss";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email is already registered
        if (users.find((user) => user.email === registerData.email)) {
            setMessage("Email is already registered.");
            return;
        }

        // Add new user
        users.push(registerData);
        localStorage.setItem("users", JSON.stringify(users));
        setMessage("Registration successful! Redirecting to login...");
        setRegisterData({ name: "", email: "", password: "" });

        // Redirect after 1.5s
        setTimeout(() => navigate("/login"), 1500);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="auth-form">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={registerData.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={registerData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={registerData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="auth-btn">Register</button>
                </form>
                {message && <p className="auth-message">{message}</p>}
                <p className="switch-text">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;