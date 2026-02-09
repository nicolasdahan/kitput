import { requireAuth, getCurrentUser } from "@/lib/auth-utils";

export default async function DashboardPage() {
  // This will redirect to sign-in if user is not authenticated
  await requireAuth();
  
  // Get the current user
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dashboard
          </h1>
          
          <div className="border-t border-gray-200 pt-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.name || "N/A"}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">Role</dt>
                <dd className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    user?.role === "ADMIN" 
                      ? "bg-indigo-100 text-indigo-800" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {user?.role}
                  </span>
                </dd>
              </div>
              
              <div>
                <dt className="text-sm font-medium text-gray-500">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{user?.id}</dd>
              </div>
            </dl>
          </div>

          {user?.role === "ADMIN" && (
            <div className="mt-8 p-4 bg-indigo-50 rounded-md">
              <h2 className="text-lg font-medium text-indigo-900 mb-2">
                Admin Features
              </h2>
              <p className="text-sm text-indigo-700">
                You have admin access. You can manage products, categories, and users.
              </p>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <a
                href="/"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Browse Products
              </a>
              <a
                href="/orders"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                My Orders
              </a>
              <a
                href="/profile"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

