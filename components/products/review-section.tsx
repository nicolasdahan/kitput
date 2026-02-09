"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface ReviewSectionProps {
  productId: string;
  reviews: Review[];
  userId?: string;
}

export function ReviewSection({
  productId,
  reviews,
  userId,
}: ReviewSectionProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
        }),
      });

      if (response.ok) {
        setComment("");
        setRating(5);
        alert("Review submitted successfully!");
        router.refresh();
      } else {
        alert("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t pt-16 mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Customer Reviews
      </h2>

      {/* Add Review Form */}
      {userId && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Write a Review
          </h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Review (Optional)
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Share your experience with this product..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {!userId && (
        <div className="bg-gray-50 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-600">
            Please{" "}
            <a href="/auth/signin" className="text-indigo-600 hover:underline">
              sign in
            </a>{" "}
            to write a review
          </p>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No reviews yet. Be the first to review this product!
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-0"
            >
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold flex-shrink-0">
                  {review.user.image ? (
                    <img
                      src={review.user.image}
                      alt={review.user.name || "User"}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span>{(review.user.name || "U")[0].toUpperCase()}</span>
                  )}
                </div>

                <div className="flex-1">
                  {/* User Name and Rating */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.user.name || "Anonymous"}
                    </span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`text-sm ${
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Review Date */}
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Review Comment */}
                  {review.comment && (
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

