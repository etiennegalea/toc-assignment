import type { Metadata } from "next";
import "./globals.css";
import Nav from "./nav";
import { SavedArticlesProvider } from "./contexts/savedArticlesContext";

export const metadata: Metadata = {
  title: "ToC Assignment",
  description: "Interview assignment for Tired of Cancer (ToC)",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en">
      <body>
        <header>
          <Nav />
        </header>
        <SavedArticlesProvider>
            {children}
        </SavedArticlesProvider>

        <footer>
        </footer>
      </body>
    </html>
  );
}
