"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
    category: {
      name: string;
    };
  };
}

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({ items }: CartItemsProps) {
  const router = useRouter();
  const [loadingItems, setLoadingItems] = useState<Set<string>>(new Set());

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setLoadingItems((prev) => new Set(prev).add(itemId));
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("An error occurred");
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const removeItem = async (itemId: string) => {
    if (!confirm("Remove this item from cart?")) return;

    setLoadingItems((prev) => new Set(prev).add(itemId));
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.refresh();
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      alert("An error occurred");
    } finally {
      setLoadingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="divide-y divide-gray-200">
        {items.map((item) => {
          const isLoading = loadingItems.has(item.id);
          const itemTotal = item.product.price * item.quantity;
          const isOutOfStock = item.quantity > item.product.stock;

          return (
            <div
              key={item.id}
              className={`p-6 ${isLoading ? "opacity-50" : ""}`}
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="flex-shrink-0"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    {item.product.images[0] ? (
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No image
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-indigo-600"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.product.category.name}
                      </p>
                      {isOutOfStock && (
                        <p className="text-sm text-red-600 mt-1 font-medium">
                          Only {item.product.stock} left in stock
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        ${itemTotal.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${item.product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls and Remove */}
                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={isLoading || item.quantity <= 1}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value);
                            if (newQty >= 1 && newQty <= item.product.stock) {
                              updateQuantity(item.id, newQty);
                            }
                          }}
                          min="1"
                          max={item.product.stock}
                          disabled={isLoading}
                          className="w-16 text-center border-x border-gray-300 py-1 focus:outline-none disabled:opacity-50"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          disabled={
                            isLoading || item.quantity >= item.product.stock
                          }
                          className="px-3 py-1 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={isLoading}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

