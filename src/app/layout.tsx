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
  description: "Cкачати моди для Minecraft, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації.",
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
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=calendar_month" />
        <link rel="canonical" href="https://fsbox.pp.ua/" />
        <link rel="stylesheet" href="https://fsbox.pp.ua/page/2" />
        <meta property="og:title" content="FSBox pp ua" />
        <meta property="og:description" content="Cкачати моди для Minecraft, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації." />
        <meta property="og:url" content="https://fsbox.pp.ua/" />
        <meta property="og:title" content="FSBox pp ua" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
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
