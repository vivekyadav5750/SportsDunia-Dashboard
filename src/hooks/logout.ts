import { signOut } from "next-auth/react";

export default async function Logout() {
    await signOut({ callbackUrl: '/' }); // Redirects to homepage after logout
  }