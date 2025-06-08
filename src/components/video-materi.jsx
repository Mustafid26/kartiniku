"use client";
import React from "react";
import "./video-materi.css"; // Import your CSS file here

export default function MateriVideo() {
    return (
        <div className="w-full max-w-4xl rounded video-materi">
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/0_xXUjx4f9E?si=CY_lUwViJf7knQqJ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                className="w-full h-full"
            ></iframe>
            <div className="mt-3">
                <div className="flex items-center justify-end">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-md transition mr-3">
                        Kembali
                    </button>
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md font-md transition">
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}
