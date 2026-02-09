import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
  };
}

async function getProducts(searchParams: ProductsPageProps["searchParams"]) {
  const page = parseInt(searchParams.page || "1");
  const limit = 12;
  const skip = (page - 1) * limit;

  const where: any = {};

  // Filter by category
  if (searchParams.category) {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: searchParams.category,
          mode: "insensitive",
        },
      },
    });
    if (category) {
      where.categoryId = category.id;
    }
  }

  // Search by name or description
  if (searchParams.search) {
    where.OR = [
      { name: { contains: searchParams.search, mode: "insensitive" } },
      { description: { contains: searchParams.search, mode: "insensitive" } },
    ];
  }

  // Filter by price range
  if (searchParams.minPrice || searchParams.maxPrice) {
    where.price = {};
    if (searchParams.minPrice) {
      where.price.gte = parseFloat(searchParams.minPrice);
    }
    if (searchParams.maxPrice) {
      where.price.lte = parseFloat(searchParams.maxPrice);
    }
  }

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      take: limit,
      skip,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    }),
  ]);

  return {
    products,
    total,
    categories,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { products, total, categories, currentPage, totalPages } =
    await getProducts(searchParams);

  const currentCategory = searchParams.category || null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h2>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <form action="/products" method="get">
                  {currentCategory && (
                    <input
                      type="hidden"
                      name="category"
                      value={currentCategory}
                    />
                  )}
                  <input
                    type="text"
                    name="search"
                    defaultValue={searchParams.search}
                    placeholder="Search products..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Categories
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/products"
                      className={`block px-3 py-2 rounded-md text-sm ${
                        !currentCategory
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      All Products ({total})
                    </Link>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        href={`/products?category=${category.name}`}
                        className={`block px-3 py-2 rounded-md text-sm ${
                          currentCategory === category.name
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {category.name} ({category._count.products})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Price Range
                </h3>
                <form action="/products" method="get">
                  {currentCategory && (
                    <input
                      type="hidden"
                      name="category"
                      value={currentCategory}
                    />
                  )}
                  {searchParams.search && (
                    <input
                      type="hidden"
                      name="search"
                      value={searchParams.search}
                    />
                  )}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Min Price
                      </label>
                      <input
                        type="number"
                        name="minPrice"
                        defaultValue={searchParams.minPrice}
                        placeholder="$0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">
                        Max Price
                      </label>
                      <input
                        type="number"
                        name="maxPrice"
                        defaultValue={searchParams.maxPrice}
                        placeholder="$999"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </aside>

          {/* Main Content - Products Grid */}
          <main className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {currentCategory || "All Products"}
              </h1>
              <p className="text-gray-600 mt-1">
                Showing {products.length} of {total} products
              </p>
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-500">No products found.</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => {
                    const avgRating =
                      product.reviews.length > 0
                        ? product.reviews.reduce(
                            (sum, review) => sum + review.rating,
                            0
                          ) / product.reviews.length
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
                          {product.stock === 0 && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                              <span className="text-white font-semibold">
                                Out of Stock
                              </span>
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
                                <span className="text-gray-400">
                                  ({product.reviews.length})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2">
                    {currentPage > 1 && (
                      <Link
                        href={`/products?${new URLSearchParams({
                          ...searchParams,
                          page: String(currentPage - 1),
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </Link>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Link
                          key={page}
                          href={`/products?${new URLSearchParams({
                            ...searchParams,
                            page: String(page),
                          }).toString()}`}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            page === currentPage
                              ? "bg-indigo-600 text-white"
                              : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </Link>
                      )
                    )}
                    {currentPage < totalPages && (
                      <Link
                        href={`/products?${new URLSearchParams({
                          ...searchParams,
                          page: String(currentPage + 1),
                        }).toString()}`}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

