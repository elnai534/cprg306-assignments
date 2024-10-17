"use client";

import { useState } from 'react';
import NewItem from './new-item'; 
import ItemList from './item-list';  
import itemsData from './items.json';  

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const handleAddItem = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8"> 
      <h1 className="text-4xl font-bold text-white mb-8">Shopping List</h1>
      <div className="mb-12"> 
        <NewItem onAddItem={handleAddItem} />  
      </div>
      <div>
        <ItemList items={items} />
      </div>
    </div>
  );
}
