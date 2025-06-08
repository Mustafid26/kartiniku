"use client";
import React from "react";
import "aos/dist/aos.css";
import WorkshopSection from "@/components/WorkshopSection";
import Preload from "@/components/preload";

export default function WorkshopPage() {
    const workshops = [
        {
            imageLink: "/images/workshop/workshop-1.svg",
            title: "Perempuan Hebat, Pendidikan Kuat",
            description:
                "Workshop ini membahas pentingnya akses pendidikan berkualitas bagi anak perempuan dan strategi membangun sekolah yang inklusif, aman, dan mendukung potensi mereka.",
            date: "19 Juni 2025",
            time: "09.00 - Selesai",
            location: "Hotel Horizon Pandanaran Semarang",
            isZoom: false,
        },
        {
            imageLink: "/images/workshop/workshop-2.svg",
            title: "Pemimpin Masa Depan: Membangun Karakter Perempuan Sejak Dini",
            description:
                "Pelatihan untuk guru dan pendidik dalam menanamkan nilai kepemimpinan, percaya diri, dan empati kepada siswi di sekolah perempuan.",
            date: "10 Juni 2025",
            time: "10.00 - Selesai",
            location: "Zoom Meeting",
            isZoom: true,
        },
    ];
    const workshops_lalu = [
        {
            imageLink: "/images/workshop/workshop-3.svg",
            title: "Teknologi untuk Sekolah Perempuan: Solusi Digital Masa Kini",
            description:
                "Eksplorasi pemanfaatan teknologi seperti Learning Management System (LMS) dalam meningkatkan kualitas pembelajaran dan partisipasi siswi di era digital.",
            date: "9 Juni 2025",
            time: "16.00 - Selesai",
            location: "Zoom Meeting",
            isZoom: true,
        },
        {
            imageLink: "/images/workshop/workshop-4.svg",
            title: "Dari Sekolah ke Dunia Nyata: Persiapan Karier untuk Siswi",
            description:
                "Membekali siswi dengan keterampilan hidup dan karier melalui bimbingan, pelatihan, dan pemetaan potensi diri sejak bangku sekolah.",
            date: "7 Juni 2025",
            time: "10.00 - Selesai",
            location: "Balai Kota Semarang",
            isZoom: false,
        },
        {
            imageLink: "/images/workshop/workshop-5.svg",
            title: "Koneksi Global untuk Sekolah Perempuan",
            description:
                "Workshop kolaboratif tentang membangun jaringan antar sekolah perempuan secara nasional dan internasional untuk saling berbagi praktik baik dan inspirasi.",
            date: "30 Mei 2025",
            time: "14.00 - Selesai",
            location: "SDK Semarang",
            isZoom: false,
        },
        {
            imageLink: "/images/workshop/workshop-6.svg",
            title: "Sekolah Aman, Siswi Nyaman",
            description:
                "Diskusi dan praktik menciptakan lingkungan belajar yang aman dari kekerasan, diskriminasi, dan bias gender di sekolah khusus perempuan.",
            date: "29 Mei 2025",
            time: "19.00 - Selesai",
            location: "Zoom Meeting",
            isZoom: true,
        },
    ];

    return (
        <>
            <Preload />
            <div className="flex justify-center">
                <div className="min-h-screen bg-white px-4 py-10">
                    <h1 className="text-3xl font-bold mb-6">
                        Informasi Workshop
                    </h1>

                    <WorkshopSection
                        title="Terbaru"
                        workshops={workshops}
                        data-aos="fade-up"
                    />
                    <WorkshopSection
                        title="Telah Lalu"
                        workshops={workshops_lalu}
                        data-aos="fade-up"
                    />
                </div>
            </div>
        </>
    );
}
