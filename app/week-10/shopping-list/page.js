"use client";

import { useState, useEffect } from 'react';
import NewItem from './new-item'; 
import ItemList from './item-list';  
import MealIdeas from './meal-ideas'; 
import { getItems, addItem } from '../_services/shopping-list-service';  // Import the correct functions

export default function Page({ user }) {  
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [items, setItems] = useState([]);  // Initialize with an empty array

  // Function to handle adding a new item
  const handleAddItem = async (newItem) => {
    try {
      const newItemId = await addItem(user.uid, newItem);  // Add the new item to Firestore and get the id
      const newItemWithId = { ...newItem, id: newItemId };  // Add the id to the new item
      setItems(prevItems => [...prevItems, newItemWithId]);  // Update local state with the new item
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Function to load items for the current user
  const loadItems = async (user) => {
    try {
      const fetchedItems = await getItems(user.uid);  // Call getItems with user.uid
      setItems(fetchedItems);  // Set the state of items to the result of getItems
    } catch (error) {
      console.error("Error loading items:", error);
    }
  };

  // useEffect hook to call loadItems when the component mounts
  useEffect(() => {
    if (user) {  
      loadItems(user);  // Pass the user object
    }
  }, [user]);

  // Function to handle selecting an item and cleaning its name
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
          {/* NewItem Form for Adding Items */}
          <NewItem onAddItem={handleAddItem} />

          {/* Display the sorted list with sort buttons */}
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
  
        <div className="flex-1">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}  
        </div>
      </div>
    </div>
  );
};
