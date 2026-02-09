import NextAuth from "next-auth";
import authConfig from "./auth.config";

// Create a separate Auth.js instance for proxy (edge runtime)
// This one doesn't have database adapter - safe for edge
export const { auth: proxy } = NextAuth(authConfig);

export default proxy((req) => {
  // You can add custom proxy logic here
  // For example, protecting certain routes
  
  // Example: Redirect to signin if not authenticated
  // const isLoggedIn = !!req.auth;
  // const isAuthPage = req.nextUrl.pathname.startsWith('/auth');
  // 
  // if (!isLoggedIn && !isAuthPage) {
  //   return Response.redirect(new URL('/auth/signin', req.nextUrl));
  // }
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
