"use client";
import React from "react";
import "aos/dist/aos.css";
import "./about.css";

export default function About() {
  return (
    <section className="flex justify-center w-full py-12 lg:mt-[4rem]">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center max-w-6xl">
        {/* Gambar di kiri */}
        <div className="flex justify-center" data-aos="fade-right">
          <img src="/about.svg" alt="Logo" className="w-full max-w-2md px-8 img-about" />
        </div>

        {/* Teks di kanan */}
        <div className="text-center lg:text-left px-8" data-aos="fade-left">
          <h1 className="text-3xl font-bold mb-4">Apa Itu KartiniKu?</h1>
          <p className="text-lg text-gray-700">
            Kartini (KartiniKu) merupakan LMS model pemberdayaan
            perempuan akar rumput yang bertujuan mengembangkan kapasitas
            perempuan melalui peningkatan kesadaran dan pemikiran kritis,
            kecakapan hidup, solidaritas dan pembelajaran sepanjang hayat
          </p>
          {/* <button className="bg-[#E53888] text-white hover:text-[#E53888] hover:bg-white px-4 mt-5 py-2 rounded-md transition duration-300 border border-[#E53888]">
            Selengkapnya
          </button> */}
        </div>
      </div>
    </section>
  );
}
