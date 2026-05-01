import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Паролите не съвпадат!");
            return;
        }

        try {
            // Изпращане на данните към REST API (Json Server)
            await axios.post('http://localhost:5000/users', {
                username: formData.username,
                email: formData.email,
                password: formData.password
            });
            alert("Регистрацията е успешна!");
            navigate('/login'); // Пренасочване към вход
        } catch (error) {
            console.error("Грешка при регистрация:", error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Създай профил</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="username"
                        placeholder="Потребителско име"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Имейл"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Парола"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Потвърди парола"
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="auth-btn">Регистрирай се</button>
                </form>
            </div>
        </div>
    );
};

export default Register;