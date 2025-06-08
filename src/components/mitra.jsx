'use client';
import React from "react";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Mitra() {
  return (
      <section className="w-full py-12 lg:mt-[4rem]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              <div
                  className="text-center lg:text-left px-8"
                  data-aos="fade-right"
              >
                  <h1 className="text-3xl font-bold mb-4">Mitra Kami</h1>
                  <p className="text-lg text-gray-700">
                      Kami percaya bahwa kolaborasi adalah kunci untuk
                      menciptakan dampak yang lebih luas. Bersama para mitra,
                      kami membangun sinergi untuk menghadirkan solusi terbaik
                      bagi masyarakat.
                  </p>
              </div>

              {/* Mobile: Slider */}
              <div className="md:hidden w-full">
                  <Swiper spaceBetween={20} slidesPerView={1} loop={true}>
                      <SwiperSlide>
                          <div className="flex justify-center">
                              <Image
                                  src="/images/logo-udinus.png"
                                  alt="Logo Udinus"
                                  width={100}
                                  height={100}
                              />
                          </div>
                      </SwiperSlide>
                      <SwiperSlide>
                          <div className="flex justify-center">
                              <Image
                                  src="/images/logo-pemprov.png"
                                  alt="Logo Pemprov"
                                  width={125}
                                  height={125}
                              />
                          </div>
                      </SwiperSlide>
                      <SwiperSlide>
                          <div className="flex justify-center">
                              <Image
                                  src="/images/logo-dp3ap2kb.svg"
                                  alt="Logo DP3AP2KB"
                                  width={320}
                                  height={320}
                              />
                          </div>
                      </SwiperSlide>
                  </Swiper>
              </div>

              {/* Desktop: Grid */}
              <div
                  className="hidden md:flex flex-row gap-10 justify-center items-center"
                  data-aos="fade-left"
              >
                  <Image
                      src="/images/logo-udinus.png"
                      alt="Logo Udinus"
                      width={80}
                      height={80}
                  />
                  <Image
                      src="/images/logo-pemprov.png"
                      alt="Logo Pemprov"
                      width={105}
                      height={105}
                  />
                  <Image
                      src="/images/logo-dp3ap2kb.svg"
                      alt="Logo DP3AP2KB"
                      width={300}
                      height={300}
                  />
              </div>
          </div>
      </section>
  );
}
