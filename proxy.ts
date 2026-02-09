import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Create a separate Auth.js instance for proxy (edge runtime)
// This one doesn't have database adapter - safe for edge
export const { auth: proxy } = NextAuth(authConfig);

export default proxy((req) => {
  // Proxy handles auth session management
  // Let all requests pass through for now
  return;
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
