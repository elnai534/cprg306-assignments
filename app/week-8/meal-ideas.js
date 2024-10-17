"use client";
import{useState} from "react"; 
import { useEffect } from "react";

async function fetchMealIdeas(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();
    return data.meals;
}
export default function MealIdeas({ingredient}){
    const [meals, setMeals] = useState ([]);//meal variable
    const loadMealIdeas = async()=>{
        const fetchedMeal = await fetchMealIdeas(ingredient);//fetch based on shopping list ingredients
        setMeals(fetchedMeal);//meals state
    }
    useEffect(() =>{
        if (ingredient) {
            loadMealIdeas();//fetch meals depending on the selected ingredient
        }
    },[ingredient]
);

return (
    <div className="meal-ideas-container">
      <h2 className="text-lg font-bold mb-4">Recipes with "{ingredient}"</h2>
      <ul className="meal-list space-y-2">
        {meals ? (
          meals.map((meal) => (
            <li key={meal.idMeal} className="meal-item bg-gray-700 p-4 rounded">
              {meal.strMeal}
            </li>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </ul>
    </div>
  );
};
