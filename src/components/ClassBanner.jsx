"use client";
import React from "react";
import "aos/dist/aos.css";

export default function ClassBanner({ text, imageLink }) {
    return (
        <div
            className="relative rounded-md h-[250px] bg-cover bg-center text-white mb-6"
            style={{ backgroundImage: `url(${imageLink})` }}
        >
            <div className="absolute inset-0 bg-black/30 rounded-md" />
            <div className="relative z-10 flex justify-center items-center h-full p-6">
                <h2 className="text-3xl text-center font-semibold">
                    {text}
                </h2>
            </div>
        </div>
    );
}
