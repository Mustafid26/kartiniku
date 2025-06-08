"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FamilyCounselingSection() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 rounded-xl gap-8 max-w-5xl mx-auto my-10">
            {/* Gambar */}
            <div className="w-full max-w-[220px] sm:max-w-none sm:w-[220px] h-[320px] rounded-xl">
                <img
                    src="/images/konsultasi/sosial.png"
                    alt="Ilustrasi Konseling Keluarga"
                    className="w-full h-full object-cover block rounded-xl"
                />
            </div>

            {/* Konten */}
            <div className="text-left max-w-xl">
                <h2 className="text-2xl font-semibold mb-2">
                    Konsultasi Sosial
                </h2>
                <p className="text-gray-700 mb-4">
                    Menyediakan layanan konsultasi dan pengaduan terkait masalah
                    sosial dan kesejahteraan masyarakat yang dapat diakses oleh
                    masyarakat secara langsung.
                </p>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">
                        Layanan yang Disediakan:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Pelayanan rujukan</li>
                        <li>Layanan data dan pengaduan</li>
                        <li>Pelayanan sosial dasar</li>
                        <li>Pelayanan rehabilitasi sosial</li>
                    </ul>
                </div>

                {/* Tombol */}
                <a
                    href="https://wa.me/+6282157639907"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition duration-300"
                >
                    <FaWhatsapp className="mr-2 text-xl" />
                    Hubungi
                </a>
            </div>
        </div>
    );
}
