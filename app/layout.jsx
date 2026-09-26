import "./globals.css";
import { Cairo } from "next/font/google";
import Providers from "@/components/Providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Verdia",
  description: "Verdia — مساعدك الذكي للمحادثة",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="font-cairo">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
