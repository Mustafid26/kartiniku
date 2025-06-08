'use client';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail, MdCall } from "react-icons/md";

export default function Footer() {
  return (
      <footer className="bg-[#1f1f1f] text-white px-8 bottom-0 w-full">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 py-10 gap-8">
              {/* Logo & Contact */}
              <div>
                  <div className="flex items-center mb-4">
                      <img
                          src="/logo-mobile.svg"
                          alt="KartiniKU Logo"
                          className="w-[15rem]"
                      />
                  </div>
                  <div className="flex items-center text-sm mb-1">
                      <MdEmail className="mr-2 text-pink-400" />
                      kartiniku@gmail.com
                  </div>
                  <div className="flex items-center text-sm">
                      <MdCall className="mr-2 text-pink-400" />
                      kartiniku@gmail.com
                  </div>
                  <div className="flex space-x-4 mt-4 text-pink-400 text-lg">
                      <FaInstagram className="hover:text-pink-600 cursor-pointer" />
                      <FaFacebookF className="hover:text-pink-600 cursor-pointer" />
                      <FaTwitter className="hover:text-pink-600 cursor-pointer" />
                      <FaYoutube className="hover:text-pink-600 cursor-pointer" />
                  </div>
              </div>

              {/* Menu: KartiniKu */}
              <div className="lg:flex flex flex-col lg:flex-row lg:gap-[5rem] md:gap-[5rem] gap-[2rem] w-full">
                  <div>
                      <h3 className="font-semibold text-[20px] mb-3">
                          KartiniKu
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                          <li>
                              <a href="#" className="hover:text-[#E53888]">
                                  Artikel
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:text-[#E53888]">
                                  Mitra
                              </a>
                          </li>
                      </ul>
                  </div>

                  {/* Menu: Layanan */}
                  <div className="">
                      <h3 className="font-semibold text-[20px] mb-3">
                          Layanan
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                          <li>
                              <a href="/kelas" className="hover:text-[#E53888]">
                                  Kelas
                              </a>
                          </li>
                          <li>
                              <a href="/konsultasi" className="hover:text-[#E53888]">
                                  Konsultasi
                              </a>
                          </li>
                          <li>
                              <a href="/workshop" className="hover:text-[#E53888]">
                                  Workshop
                              </a>
                          </li>
                      </ul>
                  </div>

                  {/* Menu: Bantuan */}
                  <div className="flex-1">
                      <h3 className="font-semibold text-[20px] mb-3">
                          Bantuan dan Panduan
                      </h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                          <li>
                              <a href="#" className="hover:text-[#E53888]">
                                  Buku Panduan
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:text-[#E53888]">
                                  Syarat dan Ketentuan
                              </a>
                          </li>
                          <li>
                              <a href="#" className="hover:text-[#E53888]">
                                  Bantuan
                              </a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400 border-t border-gray-700 py-4">
              © 2025 KartiniKu. All Rights Reserved
          </div>
      </footer>
  );
}
