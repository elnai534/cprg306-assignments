"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NewItem from './new-item'; 
import ItemList from './item-list';  
import itemsData from './items.json';
import MealIdeas from './meal-ideas';
import { useUserAuth } from '../_utils/auth-context'; 

export default function Page() {
  const { user } = useUserAuth();
  const router = useRouter();
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [items, setItems] = useState(itemsData);

  useEffect(() => {
    if (!user) {
      router.push('/landing'); 
    }
  }, [user, router]);

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

  if (!user) {
    return null; 
  }

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
