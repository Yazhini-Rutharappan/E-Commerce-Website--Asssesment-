import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { productSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/getproducts?slug=${productSlug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setProduct(data.products[0]);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">Error loading product!</div>
    );
  }

  if (!product) {
    return <div className="text-center">No product found.</div>;
  }

  const { title, image, category, price, description, number } = product;
  const imageURL = image ? `http://localhost:3002${image}` : null;

  return (
    <div
      className="max-w-7xl mx-auto p-4 bg-cover bg-center mt-44 bg-teal-200 w-200"
      style={{ backgroundImage: `url('/background-image.jpg')` }} 
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div className="flex justify-center">
          {imageURL ? (
            <img
              src={imageURL}
              alt={title}
              className="w-2/3 md:w-1/2 object-cover rounded-lg shadow-lg"
              onError={(e) => (e.target.src = "/placeholder.png")} 
            />
          ) : (
            <div className="bg-gray-200 flex justify-center items-center rounded-lg w-2/3 h-96">
              <span className="text-gray-500">Image not available</span>
            </div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
          <p className="text-2xl text-gray-800 font-bold mb-6">${price}</p>

          <div className="mb-6">
            <p className="text-gray-700 mb-2 font-bold">Product Description:</p>
            <p className="text-gray-600">{description}</p>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 font-bold">Available Quantity:</p>
            <p className="text-gray-800 font-semibold">{number}</p>
          </div>

         <div className="flex justify-center md:justify-start gap-4">
            <button className=" border rounded-md p-2">Add to Cart</button>
            <button className="border rounded-md p-2">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
