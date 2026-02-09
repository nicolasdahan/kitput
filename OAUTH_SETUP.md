# 🔑 OAuth Setup Guide - Google & GitHub

## ✅ OAuth Providers Added

The authentication system now supports:
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Email/Password (Credentials)

## 🚀 Quick Start

The OAuth providers are **already configured in the code**. To activate them, you just need to add the credentials to your `.env.local` file.

## 📝 Required Environment Variables

Add these to your `.env.local` file:

```env
# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## 🔧 How to Get OAuth Credentials

### 1. Google OAuth Setup

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Create a Project:**
   - Click "Select a project" → "New Project"
   - Name it "Kitput" or your app name
   - Click "Create"

3. **Enable Google+ API:**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Name: "Kitput Web Client"

5. **Configure Authorized URLs:**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:3000
     https://yourdomain.com
     ```
   
   - **Authorized redirect URIs:**
     ```
     http://localhost:3000/api/auth/callback/google
     https://yourdomain.com/api/auth/callback/google
     ```

6. **Copy Credentials:**
   - Copy the **Client ID** and **Client Secret**
   - Add them to your `.env.local` file

---

### 2. GitHub OAuth Setup

1. **Go to GitHub Developer Settings:**
   - Visit: https://github.com/settings/developers
   - Or: Settings → Developer settings → OAuth Apps

2. **Create New OAuth App:**
   - Click "New OAuth App"
   - Fill in the form:

3. **Application Details:**
   - **Application name:** `Kitput` (or your app name)
   - **Homepage URL:** 
     ```
     http://localhost:3000
     ```
     (For production: `https://yourdomain.com`)
   
   - **Authorization callback URL:**
     ```
     http://localhost:3000/api/auth/callback/github
     ```
     (For production: `https://yourdomain.com/api/auth/callback/github`)

4. **Register Application:**
   - Click "Register application"

5. **Generate Client Secret:**
   - Click "Generate a new client secret"
   - **Important:** Copy it immediately (you won't see it again)

6. **Copy Credentials:**
   - Copy the **Client ID** and **Client Secret**
   - Add them to your `.env.local` file

---

## 📋 Final .env.local Example

Your `.env.local` should look like this:

```env
# Database (already configured)
DATABASE_URL="postgresql://user:password@localhost:5432/kitput"

# NextAuth (already configured)
AUTH_SECRET="your-generated-secret"

# Google OAuth
GOOGLE_CLIENT_ID="123456789-abc123.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abc123def456ghi789"

# GitHub OAuth  
GITHUB_CLIENT_ID="Iv1.abc123def456"
GITHUB_CLIENT_SECRET="abc123def456ghi789jkl012mno345pqr678"
```

## 🧪 Testing OAuth

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit the sign-in page:**
   ```
   http://localhost:3000/auth/signin
   ```

3. **You should see:**
   - Email/Password form (at the top)
   - "Or continue with" divider
   - Google and GitHub buttons

4. **Click Google or GitHub:**
   - If credentials are set: OAuth flow starts
   - If missing: You'll get an error

## ✨ What Works Now

### Sign-In Page Features:
- ✅ Email/Password authentication
- ✅ Google OAuth button (with icon)
- ✅ GitHub OAuth button (with icon)
- ✅ Beautiful UI with divider
- ✅ Loading states
- ✅ Error handling

### After OAuth Sign-In:
- ✅ User account created automatically
- ✅ Profile info synced (name, email, image)
- ✅ No password needed for OAuth users
- ✅ User can mix OAuth and email/password

## 🔒 Production Setup

When deploying to production:

1. **Update OAuth redirect URIs:**
   - Google Console: Add `https://yourdomain.com/api/auth/callback/google`
   - GitHub Settings: Add `https://yourdomain.com/api/auth/callback/github`

2. **Update environment variables:**
   - Set production URLs in OAuth apps
   - Add credentials to production environment

3. **Secure your secrets:**
   - Use environment variable management (Vercel, Railway, etc.)
   - Never commit `.env.local` to git

## 🎨 Customizing OAuth Buttons

The OAuth buttons are in `app/auth/signin/page.tsx`. You can:

- Change button colors
- Update icons
- Modify button text
- Reorder providers
- Add more OAuth providers

## 📚 Adding More Providers

Want to add more OAuth providers? NextAuth.js supports:

- Microsoft/Azure AD
- Apple
- Facebook
- Twitter
- Discord
- And many more!

Check the [NextAuth.js Providers documentation](https://authjs.dev/getting-started/providers).

## 🐛 Troubleshooting

**Error: "Configuration Error"**
- Check that credentials are correctly added to `.env.local`
- Restart your dev server after adding credentials

**Error: "Redirect URI mismatch"**
- Verify redirect URIs in OAuth apps match exactly
- Check for typos (http vs https, trailing slashes)

**OAuth button doesn't work**
- Open browser console for error messages
- Verify CLIENT_ID and CLIENT_SECRET are set
- Check that provider is enabled in `auth.ts`

**User created but no profile info**
- OAuth providers may not share all fields
- Check provider's scope settings
- User can complete profile later

## ✅ Status

- ✅ OAuth providers added to `auth.ts`
- ✅ Sign-in page updated with OAuth buttons
- ✅ Beautiful UI with Google/GitHub icons
- ✅ Documentation complete
- ⏳ Awaiting OAuth credentials to activate

Once you add the credentials to `.env.local`, OAuth login will work immediately! 🎉

