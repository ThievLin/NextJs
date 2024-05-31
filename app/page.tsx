"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
     <h1 className="text-center text-3xl font-bold my-5">Product Store</h1>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="w-48 bg-white shadow-md rounded-xl transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <img src={product.image} alt="Product" className="h-48 w-48 object-cover rounded-t-xl" />
              <div className="px-4 py-3 w-48">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate capitalize">{product.title}</p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black my-3">${product.price}</p>
                  <del>
                    <p className="text-sm text-gray-600 ml-2">$199</p>
                  </del>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
