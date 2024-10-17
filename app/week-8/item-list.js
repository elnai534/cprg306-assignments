"use client";
import { useState } from 'react';
import Item from './item';

export default function ItemList({ items , onItemSelect}) { 
  const [sortBy, setSortBy] = useState("name");


  const sortedItems = [...items].sort((a, b) =>
    sortBy === "name" ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category)
  );

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <span className="text-white font-semibold mr-2">Sort by:</span>
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 mr-2 font-semibold ${sortBy === "name" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}
        >
          Name
        </button>
        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 font-semibold ${sortBy === "category" ? "bg-orange-500 text-white" : "bg-gray-200 text-black"} rounded-lg`}
        >
          Category
        </button>
      </div>

      <ul className="space-y-4">
        {sortedItems.map(item => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={()=> onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}
