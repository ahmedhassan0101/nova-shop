import connectDB from "@/lib/mongodb";
import User, { IUser } from "@/models/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import mongoose from "mongoose";

export const authOptions: NextAuthOptions = {
  providers: [
    // Local login with email/phone and password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Basic input validation
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("auth.login.missingCredentials");
        }

        // Connect to the database
        await connectDB();

        // Find user by email or phone
        const user = await User.findOne({
          $or: [
            { email: credentials.identifier },
            { phone: credentials.identifier },
          ],
        }).lean<IUser & { _id: mongoose.Types.ObjectId }>();

        // User not found or password missing
        if (!user || !user.password) {
          throw new Error("auth.login.invalidCredentials");
        }
        // Compare passwords
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("auth.login.invalidCredentials");
        }

        // Ensure user verified and active
        if (!user.emailVerified && !user.phoneVerified) {
          throw new Error("auth.login.notVerified");
        }
        if (!user.isActive) {
          throw new Error("auth.login.accountDeactivated");
        }

        // Update last login time
        // user.lastLogin = new Date();
        await User.updateOne(
          { _id: user._id },
          { $set: { lastLogin: new Date() } }
        );
        // await user.save();

        // Return user data for session token
        return {
          id: user._id.toString(),
          email: user.email || undefined,
          name: user.name,
          image: user.image || undefined,
          role: user.role,
          isProfileComplete: user.isProfileComplete,
        };
      },
    }),

    // Google OAuth provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // Runs when a user signs in
    async signIn({ user, account, profile }) {
      console.log("🚀 ~ signIn ~ profile:", profile);
      if (account?.provider === "google") {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          // Create a new user if not exists
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: "google",
            emailVerified: new Date(),
            isProfileComplete: false,
            profileCompletionStep: 1,
            lastLogin: new Date(),
          });
        } else {
          // Update last login for existing user
          existingUser.lastLogin = new Date();
          await existingUser.save();
        }
      }
      return true;
    },
    // Customize JWT token
    async jwt({ token, user, trigger, session }) {
      // When first created (user signs in)
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isProfileComplete = user.isProfileComplete;
        token.email = user.email;
      }

      // When manually updated from client (triggered by "update")
      if (trigger === "update" && session) {
        // Merge new session data into existing token
        token = { ...token, ...session };
      }

      return token;
    },
    // Define what session looks like on client side
    async session({ session, token }) {
      if (token && token.email) {
        await connectDB();

        const userInDB = await User.findOne({ email: token.email }).lean();

        if (!userInDB || !userInDB.isActive) {
          return {
            ...session,
            user: undefined,
            expires: new Date(0).toISOString(),
          };
        }

        if (session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          session.user.isProfileComplete = token.isProfileComplete as boolean;
        }
      }
      return session;
    },
    // async session({ session, token }) {

    //   if (token && session.user) {
    //     session.user.id = token.id as string;
    //     session.user.role = token.role as string;
    //     session.user.isProfileComplete = token.isProfileComplete as boolean;
    //   }
    //   return session;
    // },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    // newUser: "/profile/new-user",
    // signOut: "/auth/signout",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Secret key for encrypting tokens
  secret: process.env.NEXTAUTH_SECRET,
};
