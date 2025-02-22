import { Geist, Geist_Mono } from "next/font/google";
import "../../../../app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Admin Sign In",
  description: "Admin authentication page",
};

export default function RootLayout({ children }) {
  console.log("Admin Auth Layout Loaded!"); // Debugging

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          {children}
        </div>
      </body>
    </html>
  );
}
