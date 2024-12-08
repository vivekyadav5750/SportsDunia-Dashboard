import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (token.sub) {
          session.user.id = token.sub; // Attach user ID
        }
        console.log("token sub", token.sub);
        // else{
        //     session.user.id = token.id; // Attach user ID
        // }
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        token.idToken = account.id_token;
      }
      return token;
    }
  },
  pages: {
    signIn: "/auth/signin", // Redirect here for sign-in
    error: "/auth/error" // Redirect here on error
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
