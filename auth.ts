import Credentials from "next-auth/providers/credentials";

import NextAuth, { type DefaultSession } from "next-auth";
import axiosInstance from "./lib/axiosInstance";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      token: string;
      image: string | null;
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      authorize: async (credentials) => {
        try {
          const providedCredentials = { email: credentials.email, password: credentials.password };
          const res = await axiosInstance.post("/auth/login", providedCredentials);
          const { data } = res.data;
          if (!data) return null;
          const user = { name: data.name, email: data.email, id: data.id, token: data.token, image: data.image };

          return user;
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token?.user) {
        session.user = token.user as typeof session.user;
      }
      return session;
    },
  },
});
