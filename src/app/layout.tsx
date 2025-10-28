import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Nunito, Oswald } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import About from "@/components/About";


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
  title: "FSbox - скачати безкоштовно моди для Майнкрафт та для інших ігор",
  description: "Cкачати моди для Майнкрафт, скачати моди для Stardew Valley, скачати моди для Terraria та інших ігор. Безплатно, швидко, без реєстрації.",
  icons: {
    icon: "/favicon.ico"
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
        <meta name="google-adsense-account" content="ca-pub-3225881199838520"></meta>
        <meta name="wot-verification" content="d2d35e775075c47a76b6" />
        <meta name="blogarama-site-verification" content="blogarama-f65351db-200a-469d-9878-a863412f08d2" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="FSBox RSS Feed"
          href="/rss.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss"
        />
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3225881199838520"
          crossOrigin="anonymous"></Script>
        <Script src="https://analytics.ahrefs.com/analytics.js" data-key="vP4pGDp8OZm8gnXTfwI4XA" async></Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${oswald.variable} antialiased`}
      >
        <div className="wrapper">
          <HeaderWrapper />
          <div className="md:flex">
            {children}
            <Sidebar />
            <Analytics />
          </div>
          <About />
          <Footer />
        </div>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-NP9SJ9M1Y9"></script>
        <script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments)
          }
          gtag('js', new Date());

          gtag('config', 'G-NP9SJ9M1Y9');`}
        </script>
      </body>
    </html>
  );
}
