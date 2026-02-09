import { auth } from "@/auth";
import { redirect } from "next/navigation";

/**
 * Get the current session on the server side
 */
export async function getSession() {
  return await auth();
}

/**
 * Get the current user from the session
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}

/**
 * Require authentication - redirect to sign-in if not authenticated
 */
export async function requireAuth() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/auth/signin");
  }
}

/**
 * Require admin role - redirect to home if not admin
 */
export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    redirect("/");
  }
}

