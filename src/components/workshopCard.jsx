"use client";
import React from "react";
import "aos/dist/aos.css";

export default function WorkshopCard({
    imageLink,
    title,
    description,
    date,
    time,
    location,
    isZoom,
}) {
    return (
        <div className="flex flex-col justify-between rounded-xl shadow-lg overflow-hidden bg-white">
            <div>
                <img
                    src={imageLink}
                    alt="Workshop"
                    className="w-full h-36 object-cover"
                />
                <div className="p-4">
                    <h3 className="font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{description}</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-center gap-2">📅 {date}</li>
                        <li className="flex items-center gap-2">⏰ {time}</li>
                        <li className="flex items-center gap-2">
                            📍 {location}
                        </li>
                    </ul>
                </div>
            </div>
            <button className="py-2 m-4 text-sm font-semibold bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">
                Daftar
            </button>
        </div>
    );
}
