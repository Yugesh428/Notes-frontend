import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/store/Providers";
import NavbarWrapper from "@/components/NavbarWrapper";
import FooterWrapper from "@/components/FooterWrapper"; // Import the wrapper instead

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pustakalaya | Digital Notes Portal",
  description:
    "A professional notes sharing platform for students from Class 1 to PhD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <Providers>
          {/* Navbar handles its own hydration fix */}
          <NavbarWrapper />

          {/* Main Content Area */}
          <main className="min-h-screen bg-gray-50/30">{children}</main>

          {/* This wrapper now controls footer visibility based on URL */}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
