import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { AI } from "./action";
import { Providers } from "@/components/providers";
import { Hotjar } from "nextjs-hotjar";
import { init as initFullStory, FullStory } from "@fullstory/browser";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "./globals.css";

const meta = {
  title: "綠濾",
  description: "See your money through the lens of sustainability",
};
export const metadata: Metadata = {
  ...meta,
  title: {
    default: "綠濾",
    template: `%s - 綠濾`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    ...meta,
    card: "summary_large_image",
    site: "@krishaamer",
  },
  openGraph: {
    ...meta,
    locale: "en-US",
    type: "website",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    title: "綠濾",
    statusBarStyle: "black-translucent",
    startupImage: [
      "/apple-touch-icon.png",
      {
        url: "/apple-touch-icon.png",
        media: "(device-width: 768px) and (device-height: 1024px)",
      },
    ],
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  initFullStory({ orgId: "o-1XVGW4-na1" });

  FullStory("trackEvent", {
    name: "Ziran Init",
    properties: {
      myprop: "somedata",
    },
  });

  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics trackPageViews />
      <Hotjar id="4956812" sv={6} />;
      <body
        className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <Toaster />
        <AI>
          <Providers
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </Providers>
        </AI>
        <Analytics />
      </body>
    </html>
  );
}

export const runtime = "edge";
