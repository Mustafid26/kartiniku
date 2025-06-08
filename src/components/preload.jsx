"use client";

import { useState, useEffect, useTransition } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Preload() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // mulai fade out
      // tunggu animasi fade out selesai (misal 500ms), lalu sembunyikan
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }, 2000); // durasi preload 2 detik

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Kalau sudah tidak loading, return null
  if (!loading && !fadeOut) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999999,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        pointerEvents: loading ? "auto" : "none", // supaya klik bisa jalan pas fadeout
      }}
    >
      <DotLottieReact
        src="https://lottie.host/03f2db2e-da75-41ad-aacf-1df84286ef15/JrflYxBZNB.lottie"
        loop
        autoplay={!fadeOut} // stop animasi saat fadeout supaya halus
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
}
