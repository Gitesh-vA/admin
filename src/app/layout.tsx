import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback"/>
        <link rel="stylesheet" href="../plugins/fontawesome-free/css/all.min.css"/>
        <link rel="stylesheet" href="../plugins/icheck-bootstrap/icheck-bootstrap.min.css"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
