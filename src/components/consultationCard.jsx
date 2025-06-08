"use client";
import React from "react";
import Link from "next/link";

export default function ConsultationCard({ title, imageUrl, description }) {
    return (
        <>
            <Link
            href={`/konsultasi/${title.toLowerCase()}`}
            className="w-full max-w-[220px] sm:max-w-none sm:w-[200px] h-[280px] rounded-xl overflow-hidden relative shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer group">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover block transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="text-center">
                        <h3 className="text-white text-lg px-2 font-medium w-full">
                            {title}
                        </h3>
                        <p className="text-white text-sm font-normal w-full px-2 hidden group-hover:block transition-all duration-300 ease-in-out">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </>
    );
}
