"use client";

import { useState } from 'react';
import NewItem from './new-item'; 
import ItemList from './item-list';  
import itemsData from './items.json';
import MealIdeas from './meal-ideas';
import { useUserAuth } from "../_utils/auth-context";
import { Redirect } from 'react-router-dom';

export default function Page() {
  const { user } = useUserAuth();  // Use the useUserAuth hook to get the user object

  if (!user) {
    return <Redirect to="/" />;  // Redirect to landing page if user is not logged in
  }

  const [selectedItemName, setSelectedItemName] = useState(null);
  const [items, setItems] = useState(itemsData);

  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]  
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, '')  
      .trim();  

    setSelectedItemName(cleanedName);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8"> 
      <h1 className="text-4xl font-bold text-white mb-8">Shopping List</h1>
      
      <div className="flex space-x-4">
        <div className="flex-1 mb-12">
          <NewItem onAddItem={handleAddItem} />  
          <ItemList items={items} onItemSelect={handleItemSelect} /> 
        </div>
  
        <div className="flex-1">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}  
        </div>
      </div>
    </div>
  );
}
