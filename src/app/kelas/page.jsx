"use client";

import React, { useEffect, useState } from "react";
import UserBanner from "@/components/ClassBanner";
import ClassCard from "@/components/ClassCard";
import Preload from "@/components/preload";
import Link from "next/link";

export default function Class() {
  const [kelas, setKelas] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    async function fetchKelas() {
      try {
        const res = await fetch("/api/kelas");
        if (!res.ok) throw new Error("Failed to fetch kelas");
        const data = await res.json();
        console.log(data);
        setKelas(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchKelas();
  }, []);

  return (
    <>
      <Preload />
      <div className="max-w-3xl lg:max-w-7xl mx-auto px-4 lg:px-0 py-6 space-y-6">
        <UserBanner
          text={user ? user.name : "Pengunjung"}
          imageLink="/images/banner-kelas.png"
        />

        <div className="my-5 space-y-3">
          <h3 className="font-semibold text-lg">Kelas Saya</h3>
          {kelas.map((k) => (
            <Link key={k.id} href={`/kelas/${k.id}`}>
              <ClassCard title={k.nama_kelas} status={k.status} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
