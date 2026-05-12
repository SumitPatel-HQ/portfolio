import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { ContactModalProvider } from "@/context/ContactModalContext";
import { ToastProvider } from "@/components/Contacts/toast";
import { Menu } from "@/components/menu/Menu";
import { IntroProvider } from "@/context/IntroContext";
import LenisProvider from "@/providers/LenisProvider";
import GSAPProvider from "@/providers/GSAPProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Load Inter font with CSS variables
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sumit Patel | Software Engineer",
  description: "Portfolio of Sumit Patel, a Software Engineer.",
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
              <ContactModalProvider>
                <IntroProvider>
                  <Menu />
                  <main className="flex-1 flex flex-col">
                    {children}
                  </main>
                </IntroProvider>
                <Footer />
                <Analytics />
                <SpeedInsights />
              </ContactModalProvider>
            </ToastProvider>
          </GSAPProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
