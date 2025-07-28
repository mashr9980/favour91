import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Vendr OS - Government Contracts Made Easy",
  description: "Transform your government contracting journey with AI-powered tools, smart workflows, and proven strategies. Join thousands of successful vendors.",
  keywords: "government contracts, procurement, bidding, proposals, SaaS, AI tools",
  authors: [{ name: "Vendr OS" }],
  openGraph: {
    title: "Vendr OS - Government Contracts Made Easy",
    description: "Transform your government contracting journey with AI-powered tools and smart workflows.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vendr OS - Government Contracts Made Easy",
    description: "Transform your government contracting journey with AI-powered tools and smart workflows.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${poppins.variable} dark`}
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative">
          <Header />
          <main className="relative">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster 
          richColors 
          position="top-right"
          closeButton
          expand={false}
          visibleToasts={3}
        />
      </body>
    </html>
  );
}