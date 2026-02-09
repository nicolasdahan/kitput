import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: {
    name: string;
  };
  reviews: {
    rating: number;
  }[];
}

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="border-t pt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const avgRating =
            product.reviews.length > 0
              ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
                product.reviews.length
              : 0;

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.category.name}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {avgRating > 0 && (
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <span className="text-yellow-400">★</span>
                      <span>{avgRating.toFixed(1)}</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

