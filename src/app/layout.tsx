import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito, Oswald } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito-sans",
  subsets: ["cyrillic"],
});

const oswald = Oswald({
  variable: "--font-oswald-sans",
  subsets: ["cyrillic"],
});



export const metadata: Metadata = {
  title: "FSbox - кращі моди для ігор",
  description: "скачати моди для Minecraft, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації.",
  icons: {
    icon: "/public/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=calendar_month" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${oswald.variable} antialiased`}
      >
        <div className="wrapper">
          <Header />
          <div className="md:flex">
            {children}
            <Sidebar />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
