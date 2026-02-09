import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { ImageGallery } from "@/components/products/image-gallery";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { ReviewSection } from "@/components/products/review-section";
import { RelatedProducts } from "@/components/products/related-products";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  return product;
}

async function getRelatedProducts(categoryId: string, currentProductId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      id: {
        not: currentProductId,
      },
    },
    include: {
      category: true,
      reviews: {
        select: {
          rating: true,
        },
      },
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const [product, session] = await Promise.all([
    getProduct(id),
    auth(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.categoryId,
    id
  );

  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) /
        product.reviews.length
      : 0;

  const inStock = product.stock > 0;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <ImageGallery images={product.images} name={product.name} />

          {/* Product Details */}
          <div>
            <nav className="text-sm text-gray-500 mb-4">
              <a href="/products" className="hover:text-gray-700">
                Products
              </a>
              <span className="mx-2">/</span>
              <a
                href={`/products?category=${product.category.name}`}
                className="hover:text-gray-700"
              >
                {product.category.name}
              </a>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviews.length > 0 && (
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-xl ${
                        star <= Math.round(avgRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {avgRating.toFixed(1)} ({product.reviews.length} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {inStock ? (
                <span className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Add to Cart */}
            <div className="border-t pt-6">
              <AddToCartButton
                productId={product.id}
                inStock={inStock}
                isAuthenticated={!!session}
              />
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection
          productId={product.id}
          reviews={product.reviews}
          userId={session?.user?.id}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} />
        )}
      </div>
    </div>
  );
}

