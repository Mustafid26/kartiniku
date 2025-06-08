import Preload from "@/components/preload";
import React from "react";

export default async function AfterArtikel({ params }) {
  const { slug } = params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/artikel/${slug}`, {
    cache: "no-store",
  });

  const data = await res.json();

  const article = data.article;
  const nextArticle = data.nextArticle;
  console.log(data);
  return (
    <>
      <Preload />
      <div className="max-w-5xl mx-auto p-4 bg-white">
        <hr className="border-t-4 border-[#E53888]" />
        <div className="py-6 px-4 rounded-t-lg text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-[#E53888]">
            {article.title}
          </h1>
        </div>
        <hr className="border-t-4 border-[#E53888]" />
        <p className="text-sm text-gray-600 mt-2">
          oleh: {article.user_name} -{" "}
          {new Date(article.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-2">
            <div className="relative">
              <img
                src={article.image_url}
                alt="Pelatihan Usaha"
                className="w-full h-auto rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[#E53888] rounded-b-lg" />
            </div>
            <div className="mt-4 space-y-4 text-justify text-sm md:text-base">
              <p>{article.content}</p>
            </div>
          </div>

          <div className="bg-[#D96098] p-8 rounded-lg shadow-md text-white">
            {nextArticle ? (
              <>
                <h2 className="text-lg font-semibold mb-2 text-center">
                  {nextArticle.title}
                </h2>
                <img
                  src={nextArticle.image_url}
                  alt="Pelatihan Usaha"
                  className="w-full h-auto mb-5 shadow-md"
                />
                <p className="text-sm">
                  {nextArticle.content}
                </p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-sm">Tidak ada artikel lain yang tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
