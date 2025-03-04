import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    access_token: string;
    refresh_token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      username: string;
      access_token: string;
      refresh_token: string;
    };
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    userId: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    username: string;
  }
}
