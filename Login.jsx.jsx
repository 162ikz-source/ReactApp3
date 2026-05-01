import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Почистваме входа от излишни интервали
        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        try {
            // 1. Взимаме всички потребители (най-сигурният метод за json-server)
            const response = await axios.get('http://localhost:5000/users');
            const users = response.data;

            // 2. Ръчно търсим съвпадение в масива
            const foundUser = users.find(u =>
                u.email.toLowerCase() === cleanEmail &&
                String(u.password) === cleanPassword
            );

            if (foundUser) {
                // 3. Ако е намерен - записваме в браузъра
                alert(`Здравей отново, ${foundUser.username || 'потребител'}!`);

                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(foundUser));

                // 4. Навигираме към началната страница
                navigate('/');

                // Малко забавяне преди презареждане, за да сме сигурни, че навигацията е минала
                setTimeout(() => {
                    window.location.reload();
                }, 100);
            } else {
                alert("Грешен имейл или парола! Опитай отново.");
            }
        } catch (error) {
            console.error("Грешка при вход:", error);
            alert("Няма връзка със сървъра! Провери дали json-server работи на порт 5000.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Влез в профила си</h2>
                <form onSubmit={handleLogin} className="auth-form">
                    <input
                        type="email"
                        placeholder="Имейл"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Парола"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-btn">Влез</button>
                </form>
            </div>
        </div>
    );
};

export default Login;