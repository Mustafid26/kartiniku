"use client";
import { useState } from "react";
import React from "react";
import Link from "next/link";
export default function RegisterPage() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message);
    };
    return (
        <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100">
            <div className="flex flex-col md:flex-row justify-center items-center md:bg-white md:shadow-lg md:rounded-lg max-w-3xl md:max-w-5xl md:py-[70px] p-4 w-full">
                <div className="image">
                    <img src="/images/register.svg" alt="kartiniku" className="w-96" />
                </div>
                <div className="pt-5 md:ml-8 md:py-8 max-w-md w-full">
                    <h1 className="text-center text-xl font-bold mb-4">
                        Selamat Datang 👋
                    </h1>
                    {message && (
                    <div
                        className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                        message.toLowerCase().includes("berhasil")
                            ? "bg-green-100 text-green-800 border border-green-400"
                            : "bg-red-100 text-red-800 border border-red-400"
                        }`}
                    >
                        {message}
                    </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Nama
                            </label>
                            <input
                                type="text"
                                id="nama"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-pink-300"
                                placeholder="Nama Lengkap"
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-pink-300"
                                placeholder="contoh@gmail.com"
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-semibold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring focus:ring-pink-300"
                                placeholder="minimal 8 karakter"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        password: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-pink-500 text-white font-bold py-2 rounded-lg w-full hover:bg-pink-600 transition"
                        >
                            Daftar
                        </button>
                        <p className="mt-4 text-center">
                            Sudah punya akun?{" "}
                            <Link
                                href="/login"
                                className="text-pink-500 hover:underline"
                            >
                                Masuk
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
