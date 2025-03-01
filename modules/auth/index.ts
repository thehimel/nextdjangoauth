import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import axios from "axios";

import { AUTH_URLS } from "@/modules/auth/urls";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Attach the Google access_token to the JWT token during sign-in
        token.accessToken = account.access_token;
        const headers = { "Content-Type": "application/json" };
        const params = { access_token: account.access_token };

        // Sync with the Django backend
        try {
          await axios.post(AUTH_URLS.GOOGLE_AUTH_API_URL, params, {headers: headers});
        } catch (error) {
          console.error("Error syncing token with Django backend:", error);
        }
      }

      return token;
    },
  },
});
