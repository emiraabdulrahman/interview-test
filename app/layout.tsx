import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Now Playing — TMDB",
  description:
    "Now playing movies with filters, sorting & modal — Next.js 14 + Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container-max py-8">
          <header className="flex items-end justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Popcorn Time
              </h1>
              <p className="text-sm text-neutral-400">
                Data from The Movie Database (TMDB)
              </p>
            </div>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noopener" className="text-xs text-neutral-400 hover:text-neutral-200">
              TMDB
            </a>
          </header>
          {children}
          <footer className="mt-12 text-center text-neutral-500 text-xs">
          </footer>
        </div>
      </body>
    </html>
  );
}
