"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function GithubSignInButton() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  // console.log("callbackUrl", callbackUrl);
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() =>
        signIn("github", { callbackUrl: callbackUrl ?? "/dashboard" })
      }
    >
      <Github className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
