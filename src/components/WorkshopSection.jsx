"use client";
import React from "react";
import "aos/dist/aos.css";
import WorkshopCard from "./workshopCard";

export default function WorkshopSection({
    title,
    workshops,
}) {
    return (
        <section className="mb-10 md:max-w-7xl">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-2 h-6 bg-pink-500 mr-2 rounded"></span>{" "}
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {workshops.map((item, idx) => (
                    <WorkshopCard key={idx} {...item} />
                ))}
            </div>
        </section>
    );
}
