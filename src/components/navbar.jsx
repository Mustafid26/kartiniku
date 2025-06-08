"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false); // Tutup menu mobile
        setDropdownOpen(false); // Tutup dropdown profil
    }, [pathname]);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                }
            } catch (err) {
                setUser(null);
            }
        }

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/";
    };

    const handleNavClick = (path) => {
        if (!user) {
            window.location.href = "/login";
        } else {
            window.location.href = path;
        }
    };

    return (
        <nav className="bg-white p-4 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
                {/* Logo */}
                <div className="flex items-center flex-none">
                    <Image
                        src="/logo-mobile.svg"
                        alt="Logo"
                        width={130}
                        height={130}
                    />
                </div>

                {/* Menu tengah */}
                <div className="hidden md:flex flex-1 justify-center">
                    <ul className="flex space-x-6 text-black font-medium">
                        <li>
                            <Link
                                href="/"
                                className={`transition hover:text-[#E53888] ${
                                    pathname === "/" ? "text-[#E53888]" : ""
                                }`}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <a
                                onClick={() => handleNavClick("/kelas")}
                                className={`cursor-pointer transition hover:text-[#E53888] ${
                                    pathname.startsWith("/kelas")
                                        ? "text-[#E53888]"
                                        : ""
                                }`}
                            >
                                Kelas
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/workshop"
                                className={`transition hover:text-[#E53888] ${
                                    pathname.startsWith("/workshop")
                                        ? "text-[#E53888]"
                                        : ""
                                }`}
                            >
                                Workshop
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/konsultasi"
                                className={`transition hover:text-[#E53888] ${
                                    pathname.startsWith("/konsultasi")
                                        ? "text-[#E53888]"
                                        : ""
                                }`}
                            >
                                Konsultasi
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/artikel"
                                className={`transition hover:text-[#E53888] ${
                                    pathname.startsWith("/artikel")
                                        ? "text-[#E53888]"
                                        : ""
                                }`}
                            >
                                Artikel
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Tombol kanan */}
                <div className="hidden md:flex items-center flex-none space-x-3 relative">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center space-x-1 text-[#E53888] font-semibold"
                            >
                                <span>Halo, {user.name}</span>
                                <ChevronDown className="w-4 h-4 ml-1" />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profil
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="bg-[#E53888] text-white px-4 py-2 rounded-md hover:bg-white transition duration-300 hover:text-[#E53888] border  border-[#E53888]"
                            >
                                Masuk
                            </Link>
                            <Link
                                href="/register"
                                className="text-[#E53888] hover:text-white hover:bg-[#E53888] px-4 py-2 rounded-md transition duration-300 border border-[#E53888]"
                            >
                                Daftar
                            </Link>
                        </>
                    )}
                </div>

                {/* Hamburger icon */}
                <div className="md:hidden flex-none">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div
                    className="md:hidden mt-4 space-y-3 text-center font-medium flex flex-col fade-down"
                    data-aos="fade-down"
                >
                    <Link href="/" className="hover:text-[#E53888] transition">
                        Beranda
                    </Link>
                    <Link
                        href="/kelas"
                        className="hover:text-[#E53888] transition"
                    >
                        Kelas
                    </Link>
                    <Link
                        href="/workshop"
                        className="hover:text-[#E53888] transition"
                    >
                        Workshop
                    </Link>
                    <Link
                        href="/konsultasi"
                        className="hover:text-[#E53888] transition"
                    >
                        Konsultasi
                    </Link>
                    <Link
                        href="/artikel"
                        className="hover:text-[#E53888] transition"
                    >
                        Artikel
                    </Link>
                    <div className="mt-4 space-y-2">
                        {user ? (
                            <>
                                <span className="text-[#E53888] font-semibold">
                                    Halo, {user.name}
                                </span>
                                <Link
                                    href="/profile"
                                    className="block text-[#E53888] hover:underline"
                                >
                                    Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-[#E53888] hover:underline"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="bg-[#E53888] text-white px-4 py-2 rounded-md"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-[#E53888] border border-[#E53888] px-4 py-2 rounded-md"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
