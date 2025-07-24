import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { CtaSection } from "@/components/cta-section";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/components/theme-provider";

// Configure Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans", // Define CSS variable for Plus Jakarta Sans
  display: "swap",
});

// Configure Poppins
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins", // Define CSS variable for Poppins
  weight: ["400", "500", "600", "700"], // Specify weights you need
  display: "swap",
});

export const metadata = {
  title: "Vendr OS",
  description: "Government Contracts Made Easy for First-Time Vendors",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${poppins.variable}`}
    >
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Toaster richColors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
