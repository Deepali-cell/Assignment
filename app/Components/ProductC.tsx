"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

/* ================= TYPES ================= */
interface Review {
  rating: number;
  reviewerName: string;
  comment: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus?: string; // optional fallback
  category: string;
  brand: string;
  thumbnail: string;
  images?: string[];
  reviews?: Review[];
}

interface ProductCProps {
  productId: number | string;
}

/* ================= COMPONENT ================= */
const ProductC: React.FC<ProductCProps> = ({ productId }) => {
  const [productData, setProductData] = useState<Product | null>(null);

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get<Product>(
        `https://dummyjson.com/products/${productId}`
      );
      // For compatibility: add availabilityStatus if not present
      setProductData({
        ...data,
        availabilityStatus: data.stock > 0 ? "In Stock" : "Out of Stock",
      });
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Error fetching product data");
    }
  };

  useEffect(() => {
    if (productId) fetchProductData();
  }, [productId]);

  if (!productData)
    return <p style={{ textAlign: "center" }}>Loading product...</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      {/* Top Section */}
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={productData.thumbnail}
          alt={productData.title}
          style={{
            width: "260px",
            height: "260px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />

        <div style={{ flex: 1 }}>
          <h2 style={{ marginBottom: "10px" }}>{productData.title}</h2>
          <p style={{ color: "#555" }}>{productData.description}</p>

          <h3 style={{ marginTop: "15px", color: "#2c7be5" }}>
            ${productData.price}
            <span
              style={{
                marginLeft: "10px",
                color: "green",
                fontSize: "14px",
              }}
            >
              {productData.discountPercentage}% OFF
            </span>
          </h3>

          <p>
            ⭐ <strong>{productData.rating}</strong> / 5
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            <span
              style={{
                color: productData.stock > 0 ? "green" : "red",
              }}
            >
              {productData.availabilityStatus}
            </span>
          </p>

          <div style={{ marginTop: "10px" }}>
            <span
              style={{
                padding: "6px 12px",
                background: "#f1f3f5",
                borderRadius: "20px",
                fontSize: "14px",
                marginRight: "8px",
              }}
            >
              {productData.category}
            </span>
            <span
              style={{
                padding: "6px 12px",
                background: "#f1f3f5",
                borderRadius: "20px",
                fontSize: "14px",
              }}
            >
              {productData.brand}
            </span>
          </div>
        </div>
      </div>

      <hr style={{ margin: "25px 0" }} />

      {/* Reviews */}
      <h3>Customer Reviews</h3>

      {productData.reviews?.length ? (
        productData.reviews.map((review, index) => (
          <div
            key={index}
            style={{
              padding: "12px",
              marginTop: "10px",
              borderRadius: "8px",
              background: "#f8f9fa",
            }}
          >
            <p style={{ margin: 0 }}>
              ⭐ {review.rating} — <strong>{review.reviewerName}</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#555" }}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default ProductC;
