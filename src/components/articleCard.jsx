"use client";
import React from "react";
import Link from "next/link";

export default function ArticleCard({ article }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="w-40 h-25 flex-shrink-0">
                <img
                    src={article.image_url}
                    alt="Artikel"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <Link href={`/artikel/${article.slug}`}  className="hover:underline">
                    <div className="font-semibold text-sm md:text-base">
                        {article.title}
                    </div>
                </Link>
                <div className="text-xs text-gray-500">{article.date}</div>
            </div>
        </div>
    );
}
