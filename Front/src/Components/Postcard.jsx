import React from 'react';
import { Link } from 'react-router-dom';

export default function Postcard({ product }) {
  // Construct the full image URL (assuming backend serves images from /upload)
  const imageURL = product.image ? `http://localhost:3002${product.image}` : '/placeholder.png';

  return (
    <div className="group border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
      <Link to={`/product/${product.slug}`}>
        {/* Display the product image */}
        <img 
          src={imageURL} 
          alt={product.title} 
          className="h-[260px] w-full object-cover transition-all duration-300"
          onError={(e) => { e.target.src = '/placeholder.png'; }} // Fallback to placeholder if image fails
        />
        <div className="p-4">
          {/* Display product title and price */}
          <p className="text-lg font-bold text-gray-900 truncate">{product.title}</p>
          <p className="text-lg text-gray-700 mt-2">${product.price}</p>
        </div>
      </Link>
    </div>
  );
}
