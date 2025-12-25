import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(
            "https://dummyjson.com/auth/login",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          const data = response.data;
          if (!data?.id) return null;

          return {
            id: data.id,
            username: data.username,
            email: data.email,
            role: data.username === "emilys" ? "admin" : "user",
            accessToken: data.accessToken,
          };
        } catch (err: any) {
          console.error(
            "DummyJSON login error:",
            err.response?.data || err.message
          );
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          username: token.username,
          role: token.role,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
