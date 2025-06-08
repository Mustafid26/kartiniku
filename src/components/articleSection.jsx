"use client";
import React from "react";
import ArticleItem from "@/components/articleCard";

export default function ArticleSection({ title, articles }) {
    return (
        <section className="mb-10">
            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center bg-[#FFC1DA]">
                    <span className="w-2 h-8 bg-pink-500 mr-2"></span>{" "}
                    {title}
                </h2>
                <div className="bg-white p-4 space-y-4 rounded-b-md">
                    {articles.map((article, index) => (
                        <ArticleItem key={index} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
}
