import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { ToastProvider } from "@/components/Contacts/toast";
import { Menu } from "@/components/menu/Menu";
import { IntroProvider } from "@/context/IntroContext";
import { PageShowHandler } from "@/providers/PageShowHandler";
import LenisProvider from "@/providers/LenisProvider";
import GSAPProvider from "@/providers/GSAPProvider";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MobileBottomNav } from "@/components/mobile/MobileBottomNav";
import { SITE_URL } from "@/lib/seo";

// Load Inter font with CSS variables
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  openGraph: {
    siteName: "Sumit Patel",
    locale: "en_US",
    type: "website",
  },
  icons: {
    apple: [
      { url: "/favicons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/favicons/apple-touch-icon-167x167.png", sizes: "167x167", type: "image/png" },
    ],
    other: [
      // Microsoft Tile (IE11 / legacy Edge)
      { rel: "msapplication-TileImage", url: "/favicons/mstile-150x150.png" },
      { rel: "msapplication-config", url: "/favicons/browserconfig.xml" },
    ],
  },
  // Controls the browser UI chrome color on mobile
  other: {
    "msapplication-TileColor": "#0a0a0a",
  },
};

// Viewport is separated from metadata per Next.js App Router API
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}>
        <LenisProvider>
          <GSAPProvider>
            <ToastProvider>
              <IntroProvider>
                <PageShowHandler />
                <ContactModalProvider>
                  <TransitionProvider>
                    <main className="relative flex-1 flex flex-col">
                      <div className="hidden md:block">
                        <Menu />
                      </div>
                      {children}
                    </main>
                    <div className="hidden md:block">
                      <Footer />
                    </div>
                  </TransitionProvider>
                    <div className="md:hidden">
                      <MobileBottomNav />
                    </div>
                  <Analytics />
                  <SpeedInsights />
                </ContactModalProvider>
              </IntroProvider>
            </ToastProvider>
          </GSAPProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
