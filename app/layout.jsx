import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "AI Chat App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
