import { Inter } from "next/font/google";
import "./globals.css";

import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Money Divider",
  description: "This is money divider app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://unpkg.com/@phosphor-icons/web" />
      </head>
      <body className={inter.className}>
      <NextTopLoader />
        {children}
        </body>
    </html>
  );
}
