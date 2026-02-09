"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { SignOutButton } from "./sign-out-button";

export function UserNav() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className="text-sm">Loading...</div>;
  }

  if (!session?.user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/auth/signin"
          className="text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="text-sm">
        <p className="font-medium text-gray-900">{session.user.name}</p>
        <p className="text-xs text-gray-500">{session.user.email}</p>
        {session.user.role === "ADMIN" && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
            Admin
          </span>
        )}
      </div>
      <SignOutButton className="text-sm font-medium text-gray-700 hover:text-gray-900">
        Sign out
      </SignOutButton>
    </div>
  );
}

