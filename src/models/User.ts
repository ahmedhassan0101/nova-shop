// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

// --- 1. Address Sub-Interface ---
// Defines the structure for a user's delivery or billing address.
export interface IAddress {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

// --- 2. Main User Interface ---
// Defines the complete user object structure.
export interface IUser extends Document {
  // _id: Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  password?: string;
  image?: string;

  // Authentication & Verification
  emailVerified?: Date; // Tracks when the email was last verified (NextAuth requirement)
  phoneVerified?: boolean; // Status of phone number verification
  provider: "credentials" | "google" | "facebook";

  // OTP for phone authentication
  otp?: string; // One-Time Password hash
  otpExpires?: Date;

  // Email Verification Token
  verificationToken?: string; // Token used for email confirmation link
  verificationTokenExpires?: Date;

  // Password Reset
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;

  // Profile Completion
  isProfileComplete: boolean; // Simple flag to guide users to complete their profile
  profileCompletionStep: number; // 1: basic, 2: address, 3: preferences

  // User Data
  addresses: IAddress[];
  dateOfBirth?: Date;
  gender?: "male" | "female";

  // Preferences
  preferredLanguage: "ar" | "en";
  newsletter: boolean;

  // Security
  twoFactorEnabled: boolean;
  twoFactorSecret?: string; // Secret key for 2FA apps (e.g., Google Authenticator)

  // Metadata & Access Control
  role: "user" | "admin"; // Flag to disable/ban a user without deleting the record
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// --- 3. Sub-Schema Definition ---
const AddressSchema = new Schema<IAddress>({
  label: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

// --- 4. Main Schema Definition ---
const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to have a null/undefined email (crucial if you allow phone-only sign-up)
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents to have a null/undefined phone
    },
    password: {
      type: String,
      // select: false
    },
    image: { type: String },

    // Verification fields
    emailVerified: { type: Date },
    phoneVerified: { type: Boolean, default: false },
    provider: {
      type: String,
      enum: ["credentials", "google", "facebook"],
      default: "credentials",
    },

    // Token fields (used for temporary one-time actions)
    otp: { type: String },
    otpExpires: { type: Date },

    verificationToken: { type: String },
    verificationTokenExpires: { type: Date },

    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },

    // Profile completion tracking
    isProfileComplete: { type: Boolean, default: false },
    profileCompletionStep: { type: Number, default: 0 },
    // 0: just registered
    // 1: basic info completed
    // 2: address added
    // 3: preferences set

    // User details
    addresses: [AddressSchema],
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ["male", "female"] },

    // Preferences
    preferredLanguage: {
      type: String,
      enum: ["ar", "en"],
      default: "en",
    },
    newsletter: { type: Boolean, default: false },

    // Security
    twoFactorEnabled: { type: Boolean, default: false },
    twoFactorSecret: { type: String },

    // Metadata & Access Control
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  {
    // Automatically manage createdAt and updatedAt fields
    timestamps: true,
  }
);

// --- 5. Model Export ---
// Standard Next.js/Mongoose pattern to prevent Model Redefinition errors
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
