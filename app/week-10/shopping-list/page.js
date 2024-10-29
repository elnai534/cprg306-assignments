"use client";

import { useState, useEffect } from 'react';
import NewItem from './new-item'; 
import ItemList from './item-list';  
import MealIdeas from './meal-ideas'; 
import { getItems, addItem } from '../_services/shopping-list-service'; 

export default function Page({ user }) {  
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [items, setItems] = useState([]);  


  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);  
      const newItemWithId = { ...newItem, id: newItemId }; 
      setItems(prevItems => [...prevItems, newItemWithId]);  
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // //loading items for users
  const loadItems = async (user) => {
    try {
      const fetchedItems = await getItems(user.uid);  // getItems for UserID
      setItems(fetchedItems);  // set item state to result of getItems 
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  // useEffect hook to call loadItems when the component mounts
  useEffect(() => {
    if (user) {  
      loadItems(user);  // passing object user
    }
  }, [user]);

  // selecting item and clearing the name
  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]  
      .replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|[\u2011-\u26FF])/g, '')  // Correct and terminated regex
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
};
