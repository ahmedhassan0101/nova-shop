import { Cairo, Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

// English fonts
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Arabic font
export const cairoFont = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

// Metadata
export const siteMetadata: Metadata = {
  title: "Nova Shop - Your Online Shopping Destination",
  description: "Discover amazing products at unbeatable prices",
};