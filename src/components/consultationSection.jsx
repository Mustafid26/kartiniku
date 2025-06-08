import React from "react";
import ConsultationCard from "@/components/consultationCard";

export default function ConsultationSection({ services }) {
    return (
        <section className="py-4 md:py-12 px-4 sm:px-6 lg:px-8">
            {" "}
            {/* Ganti warna background jika perlu */}
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center mb-10 sm:mb-12 lg:mb-16">
                    Layanan Konseling
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
                    {services.map((service, index) => (
                        <ConsultationCard
                            key={index}
                            title={service.title}
                            imageUrl={service.imageUrl}
                            description={service.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
