# NextAuth.js Authentication Setup

This document explains the authentication setup for Kitput e-commerce application.

## 🔐 Overview

The application uses **NextAuth.js v5 (beta)** with:
- **Credentials Provider** for email/password authentication
- **Prisma Adapter** for database sessions
- **bcrypt** for password hashing
- **JWT** strategy for session management

## 📁 File Structure

```
/
├── auth.ts                          # NextAuth configuration
├── proxy.ts                         # Session proxy for middleware
├── types/
│   └── next-auth.d.ts              # TypeScript type extensions
├── lib/
│   └── auth-utils.ts               # Server-side auth helpers
├── components/
│   └── auth/
│       ├── session-provider.tsx    # Client SessionProvider wrapper
│       ├── sign-out-button.tsx     # Sign out button component
│       └── user-nav.tsx            # User navigation component
├── app/
│   ├── layout.tsx                  # Root layout with SessionProvider
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts        # NextAuth API routes
│   └── auth/
│       └── signin/
│           └── page.tsx            # Sign-in page
└── prisma/
    └── seed.ts                     # Database seed with test users
```

## 🚀 Setup Complete

All authentication components have been configured:

### ✅ Installed Packages
- `next-auth@beta` - NextAuth.js v5
- `@auth/prisma-adapter` - Prisma database adapter
- `bcrypt` & `@types/bcrypt` - Password hashing
- `@types/pg` - PostgreSQL types

### ✅ Environment Variables
- `AUTH_SECRET` - Auto-generated in `.env.local`
- `DATABASE_URL` - Already configured for Prisma

### ✅ Configuration Files
- `auth.ts` - Main NextAuth configuration
- `proxy.ts` - Session management proxy
- `types/next-auth.d.ts` - TypeScript extensions

### ✅ API Routes
- `/api/auth/*` - All NextAuth routes (signin, signout, session, etc.)

### ✅ Pages
- `/auth/signin` - Custom sign-in page

## 👥 Test Accounts

The database has been seeded with test accounts:

| Email | Password | Role |
|-------|----------|------|
| admin@kitput.com | admin123 | ADMIN |
| john@example.com | admin123 | USER |
| jane@example.com | admin123 | USER |

## 🔨 Usage Examples

### Server Components (Server-side)

```tsx
import { auth } from "@/auth";
import { getCurrentUser, requireAuth, requireAdmin } from "@/lib/auth-utils";

// Get current session
export default async function Page() {
  const session = await auth();
  
  if (!session) {
    return <div>Not authenticated</div>;
  }
  
  return <div>Welcome {session.user.name}</div>;
}

// Get current user
export default async function ProfilePage() {
  const user = await getCurrentUser();
  return <div>{user?.email}</div>;
}

// Require authentication
export default async function ProtectedPage() {
  await requireAuth(); // Redirects if not authenticated
  return <div>Protected content</div>;
}

// Require admin role
export default async function AdminPage() {
  await requireAdmin(); // Redirects if not admin
  return <div>Admin only content</div>;
}
```

### Client Components (Client-side)

```tsx
"use client";

import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default function ClientComponent() {
  const { data: session, status } = useSession();
  
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <div>Not signed in</div>;
  }
  
  return (
    <div>
      <p>Signed in as {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <SignOutButton />
    </div>
  );
}
```

### Sign In/Out Actions

```tsx
import { signIn, signOut } from "next-auth/react";

// Sign in
await signIn("credentials", {
  email: "user@example.com",
  password: "password",
  callbackUrl: "/dashboard",
});

// Sign out
await signOut({ callbackUrl: "/" });
```

## 🔒 Protected Routes

### Using Proxy (Middleware)

The `proxy.ts` file automatically keeps sessions alive. To protect routes, you can extend it:

```typescript
// proxy.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  
  if (isOnDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

### Using Server-side Checks

```tsx
import { requireAuth, isAdmin } from "@/lib/auth-utils";

export default async function DashboardPage() {
  await requireAuth(); // Redirects to /auth/signin if not authenticated
  
  const admin = await isAdmin();
  
  return (
    <div>
      <h1>Dashboard</h1>
      {admin && <p>Admin features available</p>}
    </div>
  );
}
```

## 🎨 UI Components

### UserNav Component

Use in your navigation to show user info and sign-out button:

```tsx
import { UserNav } from "@/components/auth/user-nav";

export default function Header() {
  return (
    <header>
      <nav>
        <UserNav />
      </nav>
    </header>
  );
}
```

## 🔄 Session Management

Sessions are managed using JWT strategy with automatic refresh:
- **JWT tokens** stored in HTTP-only cookies
- **Session expiry**: 30 days (default)
- **Auto-refresh**: Handled by proxy.ts

## 🗄️ Database Schema

The Prisma schema includes NextAuth models:

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?
  role          Role      @default(USER)
  accounts      Account[]
  sessions      Session[]
  // ... other relations
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  // ... NextAuth fields
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id])
}

enum Role {
  USER
  ADMIN
}
```

## 🧪 Testing

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit sign-in page**:
   ```
   http://localhost:3000/auth/signin
   ```

3. **Test with accounts**:
   - Try admin@kitput.com / admin123
   - Try john@example.com / admin123

4. **Check session**:
   - Use `useSession()` hook in client components
   - Use `auth()` in server components

## 🔐 Security Features

- ✅ Passwords hashed with bcrypt (salt rounds: 10)
- ✅ HTTP-only cookies for JWT tokens
- ✅ CSRF protection built-in
- ✅ Secure session management
- ✅ Role-based access control (USER/ADMIN)

## 📝 Next Steps

1. **Add more providers** (Google, GitHub, etc.):
   ```typescript
   // auth.ts
   import Google from "next-auth/providers/google";
   
   providers: [
     Google({
       clientId: process.env.GOOGLE_CLIENT_ID,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     }),
     // ... Credentials provider
   ]
   ```

2. **Customize sign-in page** with your brand styling

3. **Add sign-up functionality** with user registration

4. **Implement password reset** flow

5. **Add email verification** for new accounts

## 🐛 Troubleshooting

**Issue**: "AUTH_SECRET is not set"
- **Solution**: Run `npx auth secret` to generate it

**Issue**: Authentication not working
- **Solution**: Check that Prisma Client is generated: `npx prisma generate`

**Issue**: Session not persisting
- **Solution**: Verify `proxy.ts` is in the root directory

**Issue**: TypeScript errors with session
- **Solution**: Restart TypeScript server in your IDE

## 📚 Resources

- [NextAuth.js Documentation](https://authjs.dev/)
- [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
- [Next.js 16 Proxy](https://nextjs.org/docs/app/building-your-application/routing/proxy)

