import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniFindr - Discover Your Dream College",
  description: "Search, explore, compare, and decide colleges efficiently with UniFindr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('unifindr-theme');
                if (theme) {
                  theme = JSON.parse(theme).state.theme;
                } else {
                  theme = 'dark';
                }
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}>
        <QueryProvider>
          <ThemeProvider>
            <Navbar />
            <PageTransition>
              {children}
            </PageTransition>
            <Footer />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
