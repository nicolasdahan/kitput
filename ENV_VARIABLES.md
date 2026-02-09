# Environment Variables Configuration

## Required Variables

These environment variables MUST be set in Vercel for the application to work properly:

### AUTH_SECRET (REQUIRED)
Authentication secret for Auth.js session encryption.

Generate with:
```bash
openssl rand -base64 32
```

### DATABASE_URL (REQUIRED)
PostgreSQL connection string for Prisma.

Format:
```
postgresql://user:password@host:port/database
```

## Optional Variables

These OAuth providers are optional. The app will work with just Credentials authentication if these are not provided:

### Google OAuth (Optional)
- `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Your Google OAuth client secret

### GitHub OAuth (Optional)
- `GITHUB_CLIENT_ID` - Your GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET` - Your GitHub OAuth client secret

## Setting Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable for all environments (Production, Preview, Development)
4. Redeploy your application after adding variables

## Common Issues

### 404 NOT_FOUND Error
If you see a 404 error on Vercel, it's likely because:
- `AUTH_SECRET` is not set (the proxy/edge runtime fails without it)
- `DATABASE_URL` is not set or is incorrect

The edge runtime (proxy.ts) requires these variables to initialize Auth.js properly.

