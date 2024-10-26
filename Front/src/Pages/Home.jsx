import React, { useEffect, useState } from 'react';
import Postcard from '../Components/Postcard';
import { Carousel } from 'flowbite-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/product/getproducts'); // Fetches all products
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data.products);  // Set the full list of products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="h-80 sm:h-96 xl:h-[800px] 2xl:h-[600px] m-auto">
          <Carousel className="item-center justify-center">
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <img
                src="https://i.ibb.co/bz9PCWh/gucci-bag.jpg"
                alt="bags"
                className="h-auto w-full"
              />
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <img
                src="https://images.pexels.com/photos/280250/pexels-photo-280250.jpeg"
                alt="watch"
              />
            </div>
            <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
              <img
                src="https://i.ibb.co/gDWx0wc/nike.jpg"
                alt="shoe"
                className="h-auto w-full"
              />
            </div>
          </Carousel>
        </div>
      <h1 className="text-3xl font-bold text-center mb-6 mt-7">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Postcard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center">No products available</div>
        )}
      </div>
    </div>
  );
}
