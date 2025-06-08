import { Poppins } from "next/font/google";
import "./globals.css";
import LayoutWrapper from '@/components/LayoutWrapper';

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "KartiniKU",
  description: "LMS Sekolah Kartini",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
