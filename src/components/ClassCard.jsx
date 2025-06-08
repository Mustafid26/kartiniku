"use client";
import React from "react";
import "aos/dist/aos.css";

export default function ClassCard({ title, status }) {
  const statusColor = {
    belum: "bg-gray-400",
    progress: "bg-yellow-400",
    inprogress: "bg-yellow-400", // kalau kamu pakai ini juga
    selesai: "bg-green-500",
  };

  return (
    <div className="bg-white p-4 flex justify-between items-center rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex items-center gap-3">
        <img
          src="/icon-kelas.svg"
          alt="Deskripsi"
          className="w-8 h-8 text-gray-500"
        />

        <p className="font-medium text-sm">{title}</p>
      </div>
      {status && (
        <span
          className={`text-xs font-semibold text-white px-3 py-1 rounded-full uppercase ${
            statusColor[status.toLowerCase()]
          }`}
        >
          {status}
        </span>
      )}
    </div>
  );
}
