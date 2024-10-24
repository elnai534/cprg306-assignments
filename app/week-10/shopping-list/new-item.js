"use client";
import { useState } from 'react';

export default function NewItem({ onAddItem }) {  // Add new prop { onAddItem }
  const [name, setName] = useState(""); 
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a random string for id
    const item = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      quantity,
      category,
    };

    // Call the onAddItem prop with the new item object
    onAddItem(item);

    // Reset form fields after submission
    setName("");
    setCategory("produce");
    setQuantity(1);
  };

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name:"
          className="bg-gray-700 text-white p-2 rounded focus:outline-none"
          required
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded focus:outline-none"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>

        <div className="flex items-center justify-between">
          <span className="text-white text-lg">{quantity}</span>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={decrement}
              disabled={quantity === 1}
              className={`w-10 h-10 bg-gray-600 rounded-full text-white font-bold ${quantity === 1 ? 'bg-gray-400' : ''}`}
            >
              -
            </button>
            <button
              type="button"
              onClick={increment}
              disabled={quantity === 20}
              className={`w-10 h-10 bg-blue-600 rounded-full text-white font-bold ${quantity === 20 ? 'bg-blue-400' : ''}`}
            >
              +
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg font-bold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
