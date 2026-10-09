import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const email = String(credentials?.email || "").toLowerCase().trim();
        const password = String(credentials?.password || "");

        if (!email || !password) return null;

        await dbConnect();

        const user = await User.findOne({ email });
        if (!user) return null;

        // Shudhu admin login korte parbe
        if (user.role !== "admin") return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      // Settings e name change korle session update hobe
      if (trigger === "update" && session?.user?.name) {
        token.name = session.user.name;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    // Middleware e use hole: shudhu admin role e allow
    async authorized({ auth }) {
      return auth?.user?.role === "admin";
    },
  },

  pages: {
    signIn: "/admin/login",
  },

  session: {
    strategy: "jwt",
  },
});