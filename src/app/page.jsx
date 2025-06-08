"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Homepage from "@/components/homepage";
import About from "@/components/about";
import Mitra from "@/components/mitra";
import Dokumentasi from "@/components/dokumentasi";
import Testimoni from "@/components/testimoni";
import Preload from "@/components/preload";


export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
      mirror: true, 
    });
  }, []);

  return (
    <>
      <Preload />
      <Homepage />
      <About />
      <Mitra />
      <Dokumentasi />
      <Testimoni />
    </>
  );
}
