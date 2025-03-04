import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

import { authUrls } from "@/modules/auth/urls";

interface UserResponse {
  pk: string;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
}

interface AuthResponse {
  user: UserResponse;
  access: string;
  refresh: string;
}

// Configuration object
const authConfig: NextAuthConfig = {
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
        if (!credentials?.token) return null;

        try {
          const { data } = await axios.post<AuthResponse>(
            authUrls.VERIFY_MAGIC_LINK_URL,
            { token: credentials.token },
            { headers: { "Content-Type": "application/json" } },
          );

          if (!data?.user) return null;

          const { user } = data;
          const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();

          return {
            id: user.pk,
            email: user.email,
            name: fullName || user.email,
            username: user.username,
            access_token: data.access,
            refresh_token: data.refresh,
          };
        } catch (error) {
          console.error("Magic link verification failed:", error);

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
      if (account?.provider !== "google") return true;

      try {
        await axios.post(
          authUrls.GOOGLE_AUTH_API_URL,
          { access_token: account.access_token },
          { headers: { "Content-Type": "application/json" } },
        );

        return true;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          const errorData = error.response.data;

          if (errorData.code === "email_registered_with_email_login") {
            const encodedEmail = encodeURIComponent(profile?.email ?? "");

            return `/auth/signin?error=email_registered_with_email_login&email=${encodedEmail}`;
          }
        }

        // Return a specific error code for Google Auth API unavailability
        return `/auth/signin?error=google_auth_unavailable`;
      }
    },

    async jwt({ token, account, user }) {
      if (!account || !user) return token;

      const isGoogleAuth = account.provider === "google";
      const isMagicLink = account.provider === "magic-link";

      return {
        ...token,
        accessToken: isGoogleAuth ? account.access_token : user.access_token,
        refreshToken: isMagicLink ? user.refresh_token : undefined,
        username: isMagicLink ? user.username : undefined,
        userId: user.id,
        email: user.email,
      };
    },

    // @ts-ignore
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: {
          ...session.user,
          username: token.username,
          id: token.userId,
        },
      };
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
