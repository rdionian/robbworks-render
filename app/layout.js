import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RobbWorks | Indie Game & Freelance Web Developer in Florida",
  description:
    "Game and web development projects by Robert Dionian, a freelance developer in Florida. Indie games, mobile apps, and custom websites.",
  keywords: [
    "game developer Florida",
    "indie game developer Florida",
    "freelance game developer",
    "mobile game developer Florida",
    "web developer Florida",
    "freelance developer Florida",
    "Robert Dionian",
    "RobbWorks",
  ],
  openGraph: {
    title: "RobbWorks | Indie Game & Freelance Web Developer in Florida",
    description:
      "Game and web development projects by Robert Dionian, a freelance developer in Florida.",
    url: "https://robbworks.dev",
    siteName: "RobbWorks",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://robbworks.dev/ogImage_2.png",
        width: 1200,
        height: 630,
        alt: "RobbWorks — Indie Game & Freelance Web Developer in Florida",
      },
    ],
  },
  alternates: {
    canonical: "https://robbworks.dev",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
