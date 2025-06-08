"use client";
import React from "react";
import "aos/dist/aos.css";
import { Lock, Pencil, BookOpen, Star } from "lucide-react";

export default function ClassItem({ icon, label, locked }) {
    const IconComponent = {
        pretest: <Pencil className="w-4 h-4 text-pink-500" />,
        materi: <BookOpen className="w-4 h-4 text-pink-500" />,
        posttest: <Pencil className="w-4 h-4 text-pink-500" />,
        survey: <Star className="w-4 h-4 text-pink-500" />,
    }[icon];

    return (
        <li className="flex items-center justify-between py-4 border-b last:border-none">
            <div className="flex items-center gap-2 text-sm">
                {IconComponent}
                {label}
            </div>
            {locked && <Lock className="w-4 h-4 text-gray-400" />}
        </li>
    );
}
