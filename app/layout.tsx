import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "ToC Assignment",
  description: "Interview assignment for Tired of Cancer (ToC)",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link>
            {' | '}
            <Link href="/mylist">My List</Link>
          </nav>
        </header>

        {children}

        <footer>
        </footer>
      </body>
    </html>
  );
}
