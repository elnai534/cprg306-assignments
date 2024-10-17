"use client";
import { useState } from 'react';

export default function NewItem() {
  const [name, setName] = useState(""); 
  const [category, setCategory] = useState("produce");
  const [quantity, setQuantity] = useState(1); 


  const handleSubmit = (e) => {
    e.preventDefault(); 

    const item = {//define
      name,
      quantity,
      category,
    };

    console.log(item); 

    alert(`Item added:\nName: ${name}\nQuantity: ${quantity}\nCategory: ${category}`); //popup

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
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-900 p-6 rounded-lg">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Item name:"
          className="text-white bg-gray-800 p-2 rounded"
          required
        />

        <select //option   
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-white bg-gray-800 p-2 rounded"
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

        <div className="flex items-center space-x-4">
          <span className="text-white text-lg font-bold">{quantity}</span>
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className={`h-8 w-16 rounded-full text-white text-lg font-bold ${quantity === 1 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'} focus:outline-none`}
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className={`h-8 w-16 rounded-full text-white text-lg font-bold ${quantity === 20 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'} focus:outline-none`}
          >
            +
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
