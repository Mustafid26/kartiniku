"use client";
import React from "react";

export default function HeaderConsultation() {
    return (
        <header className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

            <div className="container mx-auto max-w-7xl">
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                    {/* Kolom Gambar */}
                    <div className=" flex justify-center items-center">
                        <img
                            src="/images/konsultasi.svg"
                            alt="Ilustrasi Konseling"
                            className="max-w-xs sm:max-w-sm md:max-w-50% h-auto"
                        />
                    </div>
                    {/* Kolom Teks */}
                    <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-10">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
                            Konsultasi
                        </h2>
                        <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                            Selamat datang di halaman Layanan Konsultasi. Halaman
                            ini menyediakan berbagai informasi dan akses
                            langsung ke layanan konsultasi resmi yang disediakan
                            oleh pemerintah untuk membantu masyarakat dalam
                            menghadapi berbagai persoalan kehidupan sehari-hari.
                            Kami menyediakan jalur komunikasi dan pendampingan
                            yang bersifat gratis, ramah, aman, dan terpercaya
                            untuk mendukung kesejahteraan individu, keluarga,
                            dan komunitas.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
