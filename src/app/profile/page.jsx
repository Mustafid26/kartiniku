"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({ name: "", email: "" });
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/me");
                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    setForm({ name: data.user.name, email: data.user.email });
                } else {
                    router.push("/login");
                }
            } catch (error) {
                router.push("/login");
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/");
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setMessage("Data berhasil diperbarui");
                setMessageType("success");
            } else {
                setMessage("Gagal memperbarui data");
                setMessageType("error");
            }
        } catch {
            setMessage("Terjadi kesalahan");
            setMessageType("error");
        }
        setLoading(false);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/change-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(passwordForm),
            });
            if (res.ok) {
                setMessage("Password berhasil diubah");
                setMessageType("success");
                setPasswordForm({ currentPassword: "", newPassword: "" });
            } else {
                const err = await res.json();
                setMessage(err.message || "Gagal mengubah password");
                setMessageType("error");
            }
        } catch {
            setMessage("Terjadi kesalahan");
            setMessageType("error");
        }
        setLoading(false);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Memuat profil...</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl lg:max-w-7xl md:max-w-4xl mx-auto p-6 my-10 bg-white shadow-md rounded-lg space-y-10">
            <h1 className="text-2xl font-bold text-[#E53888]">
                Profil Pengguna
            </h1>

            {/* Feedback Message */}
            {message && (
                <div
                    className={`relative p-3 rounded-md text-sm border ${
                        messageType === "success"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-red-100 text-red-800 border-red-300"
                    }`}
                >
                    <button
                        type="button"
                        onClick={() => setMessage("")}
                        className="absolute top-2 right-2 text-lg font-bold text-gray-400 hover:text-gray-700 focus:outline-none"
                        aria-label="Tutup"
                    >
                        ×
                    </button>
                    {message}
                </div>
            )}

            {/* Edit Data Diri */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold">Nama</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#E53888] text-white px-4 py-2 rounded-md hover:bg-[#d0276c] transition"
                >
                    {loading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </form>

            {/* Ganti Password */}
            <form onSubmit={handlePasswordChange} className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Ganti Password
                </h2>
                <div>
                    <label className="block text-sm font-semibold">
                        Password Saat Ini
                    </label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={(e) =>
                            setPasswordForm({
                                ...passwordForm,
                                currentPassword: e.target.value,
                            })
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold">
                        Password Baru
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={(e) =>
                            setPasswordForm({
                                ...passwordForm,
                                newPassword: e.target.value,
                            })
                        }
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    {loading ? "Mengganti..." : "Ganti Password"}
                </button>
            </form>

            {/* Aksi */}
            <div className="pt-4 border-t mt-6 flex justify-between">
                <button
                    onClick={() => router.push("/")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-700 transition"
                >
                    Kembali ke Beranda
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
