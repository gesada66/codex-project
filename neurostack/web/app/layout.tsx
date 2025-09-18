import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./(ui)/components/Sidebar";
import TopNav from "./(ui)/components/TopNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeuroStack",
  description: "NeuroStack – Emerald Noir UI (MVP)",
  metadataBase: new URL("http://localhost:3000"),
};

export const viewport: Viewport = {
  themeColor: "#0B0F0C",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex bg-[color:var(--bg)] text-text">
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <TopNav />
            <div className="p-4 lg:p-6 space-y-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
