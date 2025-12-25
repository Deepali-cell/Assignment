"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Pagination } from "@mui/material";
import { Rating } from "@mui/material";

let searchTimeout: NodeJS.Timeout;

const ProductsList = () => {
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 6;

  const fetchProducts = async (page = 1, search = "") => {
    const limit = productsPerPage;
    const skip = (page - 1) * limit;
    try {
      const url = search
        ? `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      const { data } = await axios.get(url);
      setDisplayProducts(data.products);
      setTotalProducts(data.total);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setPage(1);

    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => fetchProducts(1, value), 500);
  };

  const handlePageChange = (_: any, value: number) => {
    setPage(value);
    fetchProducts(value, search);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Products List</h1>

      <div className="mb-6">
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {displayProducts.length === 0 ? (
        <p className="text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {displayProducts.map((product) => (
            <Link
              href={`/admindashboard/product/${product.id}`}
              key={product.id}
              className="border rounded shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.thumbnail || product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3">
                <h2 className="font-semibold mb-1">{product.title}</h2>
                <p className="text-gray-600 text-sm mb-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-medium mb-1">
                  ${product.price.toFixed(2)}
                  {product.discountPercentage > 0 && (
                    <span className="text-red-500 ml-1">
                      (-{product.discountPercentage.toFixed(1)}%)
                    </span>
                  )}
                </p>
                <div className="flex items-center">
                  <Rating
                    name="product-rating"
                    value={product.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <span className="ml-2 text-sm">{product.rating.toFixed(1)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalProducts > productsPerPage && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={Math.ceil(totalProducts / productsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
