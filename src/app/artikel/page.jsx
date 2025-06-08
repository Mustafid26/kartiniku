"use client";
import React, { useEffect, useState } from "react";
import ArticleSection from "@/components/articleSection";
import Preload from "@/components/preload";

export default function Artikel() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
        const fetchArticles = async () => {
            const res = await fetch("/api/artikel");
            const data = await res.json();
            // Urutkan dari terbaru ke terlama
            const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setArticles(sorted);
        };

        fetchArticles();
    }, []);

    const latestArticles = articles.slice(0, 3); 
    const previousArticles = articles.slice(3); 

  return (
    <>
      <Preload />
      <div className="max-w-3xl lg:max-w-6xl mx-auto px-4 lg:px-0 py-6 space-y-6">
        <ArticleSection title="Artikel Terbaru" articles={latestArticles} />
        <ArticleSection title="Artikel Sebelumnya" articles={previousArticles} />
      </div>
    </>
  );
}
