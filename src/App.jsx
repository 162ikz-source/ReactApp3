import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./App.css";

function App() {
    // Единственото място, където дефинираме състоянието
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <Router>
            <div className="App">
                <Navbar />

                <header className="app-header">
                    <h1>Вкусни Рецепти 👨‍🍳</h1>
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Търси рецепта..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </header>

                <main className="container">
                    <Routes>
                        {/* Началната страница получава searchTerm като проп */}
                        <Route path="/" element={<Home search={searchTerm} />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>

                <footer>
                    <p>&copy; 2026 Моят Кулинарен Сайт</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
