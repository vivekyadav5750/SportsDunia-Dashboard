"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Sign In</h1>
      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      <button
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Google
      </button>
    </div>
  );
}
