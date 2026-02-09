"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  isAuthenticated: boolean;
}

export function AddToCartButton({
  productId,
  inStock,
  isAuthenticated,
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (response.ok) {
        alert("Product added to cart!");
        // You can add a toast notification here instead
      } else {
        alert("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">Quantity:</label>
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-50 transition-colors"
            disabled={!inStock}
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
            min="1"
            disabled={!inStock}
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-2 hover:bg-gray-50 transition-colors"
            disabled={!inStock}
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={!inStock || loading}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
          inStock
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {loading ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
      </button>

      {!isAuthenticated && (
        <p className="text-sm text-gray-600 text-center">
          Please sign in to add items to cart
        </p>
      )}
    </div>
  );
}

