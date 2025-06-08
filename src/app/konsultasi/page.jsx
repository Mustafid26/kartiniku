import React from "react";
import HeaderConsultation from "@/components/headerConsultation";
import ConsultationSection from "@/components/consultationSection";
import Preload from "@/components/preload";

export default function Consultation() {
    const services = [
        {
            title: "Keluarga",
            imageUrl: "/images/konsultasi/keluarga.png",
            description:
                "Layanan konsultasi dan konseling bagi keluarga, orang tua, dan calon pengantin untuk meningkatkan kualitas pengasuhan dan kesejahteraan keluarga.",
        },
        {
            title: "Kesehatan",
            imageUrl: "/images/konsultasi/kesehatan.png",
            description:
                "Layanan konsultasi kesehatan gratis 24 jam yang memungkinkan warga berkonsultasi langsung dengan dokter tanpa harus datang ke fasilitas kesehatan.",
        },
        {
            title: "Sosial",
            imageUrl: "/images/konsultasi/sosial.png",
            description:
                "Menyediakan layanan konsultasi dan pengaduan terkait masalah sosial dan kesejahteraan masyarakat.",
        },
        {
            title: "Informasi Publik",
            imageUrl: "/images/konsultasi/informasi-publik.png",
            description:
                "Menyediakan layanan informasi publik dan menerima aspirasi, ide, serta gagasan dari masyarakat untuk mendukung pembangunan kota.",
        },
        {
            title: "Perempuan & Anak",
            imageUrl: "/images/konsultasi/perempuan-anak.png",
            description:
                "Layanan ini memungkinkan masyarakat untuk melaporkan kasus kekerasan terhadap perempuan dan anak secara cepat dan aman.",
        },
    ];

    return (
        <>
            <Preload />        
            <div className="app min-h-screen bg-white">
                {" "}
                {/* Contoh background global jika diinginkan */}
                <HeaderConsultation />
                <ConsultationSection services={services} />
                {/* Anda bisa menambahkan komponen Footer di sini jika ada */}
            </div>
        </>
    );
}
