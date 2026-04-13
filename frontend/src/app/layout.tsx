import type { Metadata } from "next";
import { Be_Vietnam_Pro, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LandingNav from "@/components/navbar/landingNav"; // 👈 Import here

// Headlines: Plus Jakarta Sans (Weights 700 and 800)
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

// Body: Be Vietnam Pro (Weights 400 and 500)
export const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "FreshHaat | Fresh from Farm to Table",
  description: "Connecting local farmers directly to your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${beVietnamPro.variable} h-full antialiased`}
    >
      <body className={`${beVietnamPro.className} min-h-full flex flex-col bg-gray-50 text-slate-900`}>
        <LandingNav />
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  );
}