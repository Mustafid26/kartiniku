"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState, useEffect } from "react";

export default function DokumentasiSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const slides = [
    { id: 1, image: "/images/kegiatan1.webp", deskripsi: "Kegiatan pelatihan Ecoprint" },
    { id: 2, image: "/images/kegiatan2.webp", deskripsi: "Sambutan ibu RW 13" },
    { id: 3, image: "/images/kegiatan3.jpg", deskripsi: "Pelatihan membangun website menggunakan google sites" },
    { id: 4, image: "/images/kegiatan4.jpg", deskripsi: "Kegiatan pembuatan lilin aromaterapi" },
    { id: 5, image: "/images/kegiatan5.jpg", deskripsi: "Pelatihan memasak makanan bergizi dengan resep sehat" },
  ];

  useEffect(() => {
    if (swiperRef.current) {
      setActiveIndex(swiperRef.current.realIndex);
    }
  }, []);

  return (
    <section className="w-full bg-pink-500 py-16 px-4 relative" data-aos="fade-up">
      <h2 className="text-white text-center text-xl font-bold mb-10">
        Dokumentasi
      </h2>

      {/* Tambahkan padding atas & bawah untuk memberi ruang bagi scaled card */}
      <div className="relative max-w-6xl mx-auto overflow-visible">
        {/* Custom Buttons */}
        <button className="custom-prev2 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 p-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 transition">
          &lt;
        </button>
        <button className="custom-next2 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 p-2 rounded-full text-white bg-pink-600 hover:bg-pink-700 transition">
          &gt;
        </button>

        {/* Swiper dengan padding bawah untuk menampung scaling */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1.2}
          loop={true}
          centeredSlides={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{
            768: { slidesPerView: 2.2 },
            1024: { slidesPerView: 3 },
          }}
          navigation={{
            nextEl: ".custom-next2",
            prevEl: ".custom-prev2",
          }}
          className="!px-4 !py-8" 
        >
          {slides.map((item, i) => (
            <SwiperSlide key={i} className="!overflow-visible py-4">
              {({ isActive }) => (
                <div
                  className={`transition-all duration-300 ${
                    isActive ? "scale-105 shadow-lg" : "scale-95 opacity-80"
                  } bg-white rounded-lg shadow-md p-4 h-64 flex flex-col justify-between`}
                >
                  <img
                    src={item.image}
                    alt={`Dokumentasi ${item.id}`}
                    className="h-40 w-full object-cover rounded mb-4"
                  />
                  <p className="text-center font-semibold">Dokumentasi {item.deskripsi}</p>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}