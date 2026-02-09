# 🚀 Quick Start - Authentication

Get started with authentication in 5 minutes!

## ✅ Setup Complete

All authentication has been configured. Here's what's ready:

### 📦 Installed
- ✅ NextAuth.js v5 (beta)
- ✅ Prisma Adapter
- ✅ bcrypt for password hashing
- ✅ All TypeScript types

### 🔧 Configured
- ✅ `auth.ts` - Main configuration
- ✅ `proxy.ts` - Session proxy
- ✅ `/api/auth/*` - All auth routes
- ✅ `/auth/signin` - Sign-in page
- ✅ Environment variables (`.env.local`)

### 🎨 Components
- ✅ SessionProvider wrapper
- ✅ SignOutButton
- ✅ UserNav component
- ✅ Protected dashboard example

## 🧪 Test It Now!

### 1. Start the server:
```bash
npm run dev
```

### 2. Visit the sign-in page:
```
http://localhost:3000/auth/signin
```

### 3. Sign in with test account:
```
Email: admin@kitput.com
Password: admin123
```

### 4. Visit protected dashboard:
```
http://localhost:3000/dashboard
```

## 👥 Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@kitput.com | admin123 | ADMIN |
| john@example.com | admin123 | USER |
| jane@example.com | admin123 | USER |

## 🔨 Quick Usage Examples

### Protect a Page (Server Component)

```tsx
// app/protected/page.tsx
import { requireAuth } from "@/lib/auth-utils";

export default async function ProtectedPage() {
  await requireAuth(); // Redirects if not authenticated
  
  return <div>Protected Content</div>;
}
```

### Show User Info (Client Component)

```tsx
"use client";
import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  
  return <div>Hello {session?.user?.name}</div>;
}
```

### Add Sign Out Button

```tsx
import { SignOutButton } from "@/components/auth/sign-out-button";

export default function Header() {
  return (
    <header>
      <SignOutButton />
    </header>
  );
}
```

### Add User Navigation

```tsx
import { UserNav } from "@/components/auth/user-nav";

export default function NavBar() {
  return (
    <nav>
      <UserNav /> {/* Shows sign in/out based on auth status */}
    </nav>
  );
}
```

## 🔐 Auth Helpers

Use these server-side helpers:

```tsx
import { 
  getCurrentUser,  // Get current user
  isAuthenticated, // Check if authenticated
  isAdmin,         // Check if admin
  requireAuth,     // Require auth or redirect
  requireAdmin     // Require admin or redirect
} from "@/lib/auth-utils";
```

## 📱 Protected Routes with Proxy

To protect entire sections of your app, update `proxy.ts`:

```typescript
// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  
  // Protect /dashboard/* routes
  if (req.nextUrl.pathname.startsWith("/dashboard") && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  
  // Protect /admin/* routes (admin only)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }
    if (req.auth?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

## 🎯 Next Steps

1. **Customize the sign-in page** - Edit `/app/auth/signin/page.tsx`
2. **Add sign-up functionality** - Create registration page
3. **Style the components** - Update auth components with your design
4. **Add more OAuth providers** - Google, GitHub, etc.
5. **Implement password reset** - Add forgot password flow

## 📚 Full Documentation

See `AUTH_SETUP.md` for complete documentation including:
- Detailed file structure
- Advanced usage examples
- Security features
- Troubleshooting guide
- All available helpers and components

## 🎉 You're Ready!

Authentication is fully set up and working. Test it by:
1. Signing in at `/auth/signin`
2. Visiting protected `/dashboard`
3. Using auth helpers in your components

Happy coding! 🚀

