import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export function CartSummary({
  subtotal,
  shipping,
  tax,
  total,
}: CartSummaryProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Summary
      </h2>

      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="text-green-600 font-medium">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Free Shipping Notice */}
        {shipping > 0 && subtotal < 50 && (
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md">
            Add ${(50 - subtotal).toFixed(2)} more for free shipping!
          </div>
        )}

        {/* Tax */}
        <div className="flex justify-between text-gray-600">
          <span>Estimated Tax (10%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Total */}
        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="mt-6 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
      >
        Proceed to Checkout
        <ArrowRight className="w-5 h-5" />
      </Link>

      {/* Continue Shopping */}
      <Link
        href="/products"
        className="mt-3 block text-center text-indigo-600 hover:text-indigo-700 font-medium text-sm"
      >
        Continue Shopping
      </Link>

      {/* Security Notice */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  );
}

