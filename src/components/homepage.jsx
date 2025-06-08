"use client";
import React from "react";
import Image from "next/image";
import "./homepage.css";

export default function Homepage() {
    return (
        <section
            className="hero relative w-full h-[90vh] overflow-hidden"
            data-aos="fade-down"
        >
            {/* Background image */}
            <Image
                src="/normal-hero.svg" // Ganti sesuai file kamu
                alt="Hero Background"
                fill
                className="object-cover object-center img-hero"
                priority
            />

            {/* Konten */}
            <div
                className="relative z-10 flex items-center h-full justify-start"
                data-aos="fade-right"
            >
                <div className="w-full max-w-7xl mx-auto">
                    <div className="max-w-xl text-white text-center p-2 md:p-0 md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                            KARTINIKU
                        </h1>
                        <h2 className="text-xl md:text-2xl font-medium mb-3">
                            Langkah Awal Perempuan Menginspirasi Dunia
                        </h2>
                        <p className="text-sm md:text-base mb-6 leading-relaxed">
                            Sampai kapanpun, kemajuan perempuan itu ternyata
                            menjadi faktor penting dalam peradaban bangsa.
                            <br />
                            <span className="italic">- R. A. Kartini</span>
                        </p>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-semibold transition">
                                Mulai Belajar
                            </button>
                            <button className="border border-white text-white px-6 py-2 rounded-md font-semibold hover:bg-white hover:text-pink-700 transition">
                                Konsultasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wave SVG */}
            <div className="wave-1 absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180 z-0">
                <svg
                    viewBox="0 0 500 150"
                    preserveAspectRatio="none"
                    className="w-full h-36 md:h-40 lg:h-48"
                >
                    <g transform="translate(0, 20)">
                        <path
                            d="M0,50 C150,150 350,-50 500,50 L500,0 L0,0 Z"
                            fill="#E53888"
                        />
                    </g>
                    <path
                        d="M0,50 C150,150 350,-50 500,50 L500,0 L0,0 Z"
                        fill="#fff"
                    />
                </svg>
            </div>
        </section>
    );
}
