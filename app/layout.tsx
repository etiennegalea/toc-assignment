import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "ToC Assignemnt",
  description: "Interview assignment for Tired of Cancer (ToC)",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <header></header>
      <body>
        {children}
      </body>
      <footer></footer>
    </html>
  )
}
