'use client';

import { usePathname } from 'next/navigation';
import Navbar from "./navbar";
import Footer from "./footer";
import Chatbot from "./chat-interface";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

    const exclude =
    pathname.includes('/pretest') ||
    pathname.includes('/posttest') ||
    pathname.startsWith('/video-materi');
    console.log('Current Path:', pathname);

  return (
    <>
      {!exclude && <Navbar />}
      {children}
      {!exclude && <Chatbot />}
      {!exclude && <Footer />}
    </>
  );
}
