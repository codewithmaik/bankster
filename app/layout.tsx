import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-kumbh-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bankster-bank.vercel.app"),
  title: {
    default: "Bankster — Open a digital bank account in minutes",
    template: "%s — Bankster",
  },
  description:
    "Bankster is the easiest way to open a digital bank account. Automatic expense tracking, budgets and AI-powered insights. Join today and get $250 in credits.",
  applicationName: "Bankster",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={kumbhSans.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
