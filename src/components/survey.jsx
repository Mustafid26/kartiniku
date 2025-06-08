"use client";
import React, { useState } from "react";

export default function SurveyKelas1() {
    const [responses, setResponses] = useState({
        q1: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses({ ...responses, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hasil Survey:", responses);
        alert("Terima kasih telah mengisi survey!");
    };

    const options = [
        { label: "😞", value: "1", desc: "Tidak Suka" },
        { label: "🙂", value: "2", desc: "Suka" },
        { label: "😍", value: "3", desc: "Sangat Suka" },
    ];

    return (
        <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-md p-6">
                <h2 className="text-2xl font-bold text-center mb-8">
                    Survey Kelas 1
                </h2>
                <form onSubmit={handleSubmit}>
                    {[1].map((num) => (
                        <div className="mb-6" key={num}>
                            <p className="mb-4 text-center">
                                Apakah suka dengan materi ini?
                            </p>
                            <div className="flex justify-around">
                                {options.map((opt) => (
                                    <label
                                        key={opt.value}
                                        className="flex flex-col items-center text-sm cursor-pointer"
                                    >
                                        <input
                                            type="radio"
                                            name={`q${num}`}
                                            value={opt.value}
                                            checked={
                                                responses[`q${num}`] ===
                                                opt.value
                                            }
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span
                                            className={`text-3xl transition-all ${
                                                responses[`q${num}`] ===
                                                opt.value
                                                    ? "scale-125"
                                                    : "opacity-60"
                                            }`}
                                        >
                                            {opt.label}
                                        </span>
                                        <span className="mt-1 text-xs">
                                            {opt.desc}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="bg-pink-500 hover:bg-pink-400 text-white py-2 px-6 rounded block mx-auto mt-6"
                    >
                        Selesai
                    </button>
                </form>
            </div>
        </div>
    );
}
