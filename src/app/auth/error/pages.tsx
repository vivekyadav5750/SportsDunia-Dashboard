"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-500">Authentication Error</h1>
      <p>{error ? `Reason: ${error}` : "Something went wrong!"}</p>
    </div>
  );
}
