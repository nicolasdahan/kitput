# 🔐 Authentication - Kitput E-commerce

Complete NextAuth.js v5 authentication system for your e-commerce platform.

## 🚀 Quick Start

```bash
# Start the dev server
npm run dev

# Visit sign-in page
http://localhost:3000/auth/signin

# Test credentials
Email: admin@kitput.com
Password: admin123
```

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[QUICKSTART_AUTH.md](./QUICKSTART_AUTH.md)** | ⚡ Get started in 5 minutes |
| **[AUTH_SETUP.md](./AUTH_SETUP.md)** | 📚 Complete documentation |
| **[AUTH_IMPLEMENTATION_SUMMARY.md](./AUTH_IMPLEMENTATION_SUMMARY.md)** | 📋 Implementation details |

## 🎯 What's Included

### Authentication Features
- ✅ Email/password authentication
- ✅ Secure password hashing (bcrypt)
- ✅ JWT session management
- ✅ Role-based access (USER/ADMIN)
- ✅ Protected routes
- ✅ Auto session refresh

### Pages & Routes
- ✅ `/auth/signin` - Sign-in page
- ✅ `/dashboard` - Protected dashboard example
- ✅ `/api/auth/*` - All NextAuth endpoints

### Components
- ✅ SessionProvider - Auth context
- ✅ UserNav - User navigation
- ✅ SignOutButton - Sign out button

### Helpers
```typescript
import {
  getCurrentUser,  // Get current user
  isAuthenticated, // Check auth status
  isAdmin,         // Check admin role
  requireAuth,     // Require auth
  requireAdmin     // Require admin
} from "@/lib/auth-utils";
```

## 👥 Test Accounts

| Email | Password | Role |
|-------|----------|------|
| admin@kitput.com | admin123 | ADMIN |
| john@example.com | admin123 | USER |
| jane@example.com | admin123 | USER |

## 💡 Usage Examples

### Server Component (Protected Page)
```tsx
import { requireAuth, getCurrentUser } from "@/lib/auth-utils";

export default async function ProfilePage() {
  await requireAuth(); // Redirects if not signed in
  const user = await getCurrentUser();
  
  return <div>Welcome {user?.name}</div>;
}
```

### Client Component (Auth UI)
```tsx
"use client";
import { useSession } from "next-auth/react";
import { SignOutButton } from "@/components/auth";

export default function Header() {
  const { data: session } = useSession();
  
  return (
    <header>
      {session ? (
        <>
          <span>{session.user.name}</span>
          <SignOutButton />
        </>
      ) : (
        <a href="/auth/signin">Sign In</a>
      )}
    </header>
  );
}
```

### Admin-Only Section
```tsx
import { requireAdmin } from "@/lib/auth-utils";

export default async function AdminPage() {
  await requireAdmin(); // Redirects if not admin
  
  return <div>Admin Dashboard</div>;
}
```

## 🔧 Configuration

All configuration is in:
- `auth.ts` - Main NextAuth config
- `proxy.ts` - Session proxy
- `.env.local` - Environment variables

## 🗄️ Database

Uses Prisma models:
- `User` - User accounts with roles
- `Account` - OAuth accounts (future)
- `Session` - User sessions

## 🔐 Security

- ✅ bcrypt password hashing
- ✅ HTTP-only cookies
- ✅ CSRF protection
- ✅ Secure session tokens
- ✅ Role-based access control

## 📱 Files Structure

```
auth.ts                              # NextAuth config
proxy.ts                             # Session proxy
types/next-auth.d.ts                 # Type definitions
lib/auth-utils.ts                    # Helper functions
components/auth/                     # Auth components
app/auth/signin/page.tsx            # Sign-in page
app/dashboard/page.tsx              # Protected example
app/api/auth/[...nextauth]/route.ts # Auth API
```

## 🎨 Customization

### Change Sign-in Page
Edit: `app/auth/signin/page.tsx`

### Add OAuth Providers
Edit: `auth.ts` and add providers:
```typescript
import Google from "next-auth/providers/google";

providers: [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
  // ... existing Credentials provider
]
```

### Protect Routes with Middleware
Edit: `proxy.ts` to add route protection

## 🐛 Troubleshooting

**Can't sign in?**
- Check database is running
- Verify test users exist: `npm run prisma:seed`

**TypeScript errors?**
- Restart TypeScript server in your IDE

**Session not persisting?**
- Check `proxy.ts` exists in root
- Verify `.env.local` has `AUTH_SECRET`

## 📚 Learn More

- [NextAuth.js Docs](https://authjs.dev/)
- [Prisma Adapter](https://authjs.dev/getting-started/adapters/prisma)
- [Next.js Authentication](https://nextjs.org/docs/app/building-your-application/authentication)

## ✅ Ready to Use!

Everything is configured and ready. Just:
1. Start your dev server: `npm run dev`
2. Visit `/auth/signin`
3. Sign in with a test account
4. Start building authenticated features!

Happy coding! 🚀

