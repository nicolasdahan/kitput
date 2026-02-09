import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

// Create a separate Auth.js instance for proxy (edge runtime)
// This one doesn't have database adapter - safe for edge
export const { auth: proxy } = NextAuth(authConfig);

export default proxy((req) => {
  // Proxy handles auth session management
  // Explicitly return NextResponse.next() to allow request to continue
  return NextResponse.next();
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
