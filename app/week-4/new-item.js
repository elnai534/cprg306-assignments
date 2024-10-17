"use client";  
import { useState } from 'react';  

export default function NewItem() {
  const [quantity, setQuantity] = useState(1);

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
      <div className="flex items-center space-x-4 bg-gray-900 p-2 rounded-lg">
        <span className="text-white text-lg font-bold">{quantity}</span>
        <button
          onClick={decrement}
          disabled={quantity === 1}
          className={`h-8 w-16 rounded-full text-white text-lg font-bold ${quantity === 1 ? 'bg-gray-400' : 'bg-gray-600 hover:bg-gray-500'} focus:outline-none`}
        >
          -
        </button>
        <button
          onClick={increment}
          disabled={quantity === 20}
          className={`h-8 w-16 rounded-full text-white text-lg font-bold ${quantity === 20 ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-500'} focus:outline-none`}
        >
          +
        </button>
      </div>
    </div>
  );
}
