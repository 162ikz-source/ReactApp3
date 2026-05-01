import React from 'react';

const RecipeList = ({ recipes = [], search = "" }) => {
    // 1. Филтрираме масива спрямо въведеното в търсачката
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="recipe-section">
            <h3 className="results-count">
                {search ? `Резултати за: "${search}"` : "Всички рецепти"}
            </h3>

            <div className="recipe-grid">
                {/* 2. Проверка: Ако има намерени рецепти, ги изброй в списък */}
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card">
                            <div className="recipe-badge">🍳</div>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <button className="view-btn">Преглед</button>
                        </div>
                    ))
                ) : (
                    /* 3. Ако няма резултат - изпиши съобщението */
                    <div className="no-results">
                        <span className="icon">🔍</span>
                        <p>Няма намерена рецепта, съвпадаща с вашето търсене.</p>
                        <small>Опитайте с друга ключова дума.</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeList;