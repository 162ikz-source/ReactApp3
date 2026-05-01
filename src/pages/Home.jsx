import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList'; // Увери се, че пътят е верен

// 1. ТРЯБВА да добавиш { search } тук, за да приемеш данните от App.jsx
const Home = ({ search }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/recipes')
            .then(res => {
                setRecipes(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Сървърът е изключен!", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loader">Зареждане на вкусни рецепти...</div>;

    return (
        <div className="home-container">
            <h2 className="section-title">Нашите Рецепти</h2>

            {/* 2. Използваме RecipeList и му подаваме рецептите И думата за търсене */}
            <RecipeList recipes={recipes} search={search} />
        </div>
    );
};

export default Home;