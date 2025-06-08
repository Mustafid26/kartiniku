"use client";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FamilyCounselingSection() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center p-6 rounded-xl gap-8 max-w-5xl mx-auto my-10">
            {/* Gambar */}
            <div className="w-full max-w-[220px] sm:max-w-none sm:w-[220px] h-[320px] rounded-xl">
                <img
                    src="/images/konsultasi/perempuan-anak.png"
                    alt="Ilustrasi Konseling Keluarga"
                    className="w-full h-full object-cover block rounded-xl"
                />
            </div>

            {/* Konten */}
            <div className="text-left max-w-xl">
                <h2 className="text-2xl font-semibold mb-2">
                    Konsultasi Perempuan & Anak
                </h2>
                <p className="text-gray-700 mb-4">
                    Menyediakan layanan pendampingan bagi korban kekerasan,
                    eksploitasi, dan diskriminasi terhadap perempuan dan anak
                    yang berbasis gender.
                </p>

                <div className="mb-4">
                    <h3 className="font-semibold mb-2">
                        Layanan yang Disediakan:
                    </h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Konseling Psikologis dan Sosial</li>
                        <li>Pendampingan Hukum</li>
                        <li>Mediasi dan Home Visit</li>
                        <li>Rujukan Layanan Kesehatan</li>
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
