import NextAuth, { Session, JWT } from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { authUrls } from "@/modules/auth/urls";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      async profile(profile) {
        return {
          ...profile,
          id: profile.sub,
        };
      },
    }),

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
    error: "/auth/signin",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        try {
          const headers = { "Content-Type": "application/json" };
          const params = { access_token: account.access_token };

          await axios.post(authUrls.GOOGLE_AUTH_API_URL, params, { headers: headers });

          return true;
        } catch (error) {
          if (axios.isAxiosError(error) && error.response?.status === 400) {
            const errorData = error.response.data;

            if (errorData.code === "email_registered_with_email_login") {
              return `/auth/signin?error=email_registered_with_email_login&email=${encodeURIComponent(profile?.email || "")}`;
            }
          }

          return false;
        }
      }

      return true;
    },

    async jwt({ token, account, user }) {
      // Initial sign-in
      if (account && user) {
        // Google authentication
        if (account.provider === "google") {
          token.accessToken = account.access_token;
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

    // @ts-ignore
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.accessToken) session.accessToken = token.accessToken;
      if (token.refreshToken) session.refreshToken = token.refreshToken;
      if (token.username) session.user.username = token.username;
      if (token.userId) session.user.id = token.userId as string;

      return session;
    },
  },
  // Add this to extend default sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
});
