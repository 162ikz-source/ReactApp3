import React, { useEffect, useState } from 'react'; // Добави Hooks
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Следи къде се намира потребителят
    const [user, setUser] = useState(null);

    // Този useEffect ще се пуска при всяка смяна на страницата
    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem('user'));
        setUser(loggedUser);
    }, [location]); // Когато локацията се смени, обновяваме потребителя

    const handleLogout = () => {
        localStorage.clear();
        setUser(null); // Изчистваме състоянието веднага
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo">CulinaryMaster 🍳</Link>
            <div className="nav-links">
                <Link to="/">Начало</Link>
                {user ? (
                    <div className="user-section">
                        <span className="user-name">Здравей, {user.username}!</span>
                        <button onClick={handleLogout} className="logout-btn">Изход</button>
                    </div>
                ) : (
                    <div className="auth-links">
                        <Link to="/login">Вход</Link>
                        <Link to="/register">Регистрация</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;