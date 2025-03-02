import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { authUrls } from "@/modules/auth/urls";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    CredentialsProvider({
      id: "magic-link",
      name: "Magic Link",
      credentials: {
        token: { label: "Magic Link Token", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.token) {
            return null;
          }

          // Verify the magic link token with your Django backend
          const response = await axios.post(
            authUrls.VERIFY_MAGIC_LINK_URL,
            { token: credentials.token },
            { headers: { "Content-Type": "application/json" } },
          );

          // If the token is valid, the backend should return user data
          if (response.data && response.data.user) {
            return {
              id: response.data.user.pk,
              email: response.data.user.email,
              name:
                `${response.data.user.first_name || ""} ${response.data.user.last_name || ""}`.trim() ||
                response.data.user.email,
              username: response.data.user.username,
              // Pass authentication tokens to be used in the jwt callback
              access_token: response.data.access,
              refresh_token: response.data.refresh,
            };
          }

          return null;
        } catch (error) {
          console.error("Error verifying magic link token:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request", // Page displayed upon email verification request
    error: "/auth/error", // Error page
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        // Google authentication
        if (account.provider === "google") {
          token.accessToken = account.access_token;

          const headers = { "Content-Type": "application/json" };
          const params = { access_token: account.access_token };

          try {
            await axios.post(authUrls.GOOGLE_AUTH_API_URL, params, { headers: headers });
          } catch (error) {
            console.error("Error syncing token with Django backend:", error);
          }
        }

        // Magic link authentication
        if (account.provider === "magic-link") {
          token.accessToken = user.access_token;
          token.refreshToken = user.refresh_token;
          token.username = user.username; // Store username in token
        }

        // Store user data
        token.userId = user.id;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.userId) session.user.id = token.userId as string;
      if (token.username) session.user.username = token.username;
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.refreshToken) session.refreshToken = token.refreshToken;

      return session;
    },
  },
  // Add this to extend default sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
