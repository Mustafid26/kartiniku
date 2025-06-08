"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const testimonials = [
      {
          id: 1,
          name: "Tuti",
          role: "Guru",
          rating: 5,
          text: "Websitenya sangat membantu! Materi mudah diakses dan tampilannya ramah pengguna. Cocok banget untuk pembelajaran di sekolah perempuan.",
          image: "/images/profile-1.png", // Ganti dengan path gambar sebenarnya
      },
      {
          id: 2,
          name: "Tuti",
          role: "Guru",
          rating: 5,
          text: "Dengan aplikasi ini, saya bisa belajar mandiri dengan nyaman. Fitur-fitur seperti kuis sangat mendukung proses belajar.",
          image: "/images/profile-2.png", // Ganti dengan path gambar sebenarnya
      },
      {
          id: 3,
          name: "Sari",
          role: "Pengusaha",
          rating: 5,
          text: "Desain aplikasinya menarik dan relevan dengan dunia remaja perempuan. Saya jadi lebih semangat belajar setiap hari!",
          image: "/images/profile-3.png", // Ganti dengan path gambar sebenarnya
      },
      {
          id: 4,
          name: "Dewi",
          role: "Pelajar",
          rating: 4,
          text: "Guru dan siswa jadi lebih terhubung. Proses belajar jadi lebih interaktif, aman, dan sesuai dengan kebutuhan siswi.",
          image: "/images/profile-4.png", // Ganti dengan path gambar sebenarnya
      },
  ];

  // Komponen bintang rating
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={i < rating ? "#E53888" : "#D1D5DB"}
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>
    );
  };

  if (!mounted) {
    return null; // Hindari render di server untuk komponen Swiper
  }

  return (
    <section className="py-16 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          Apa Kata Mereka
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }}
            className="pb-12"
            data-aos="fade-up"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-lg shadow-md p-6 min-h-[250px] flex flex-col h-full relative border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
                      {/* Gunakan placeholder jika tidak ada gambar */}
                      <div className="w-full h-full bg-pink-100 flex items-center justify-center">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-pink-500 font-bold">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {testimonial.name}
                      </h3>
                      <p className="text-pink-500 text-sm">
                        {testimonial.role}
                      </p>
                      <RatingStars rating={testimonial.rating} />
                    </div>
                    <div className="absolute top-4 right-4 text-pink-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="opacity-25"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609v.998c-3.843.993-5.236 4.317-5.236 6.487v1.131h4.653v9.384h-8.4zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609v.998c-3.843.993-5.236 4.317-5.236 6.487v1.131h4.653v9.384h-8.417z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center gap-4 mt-8">
            <button className="custom-prev w-12 h-12 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="custom-next w-12 h-12 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white transition focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
