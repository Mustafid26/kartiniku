"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ClassBanner from "@/components/ClassBanner";
import ClassItem from "@/components/classItem";
import Preload from "@/components/preload";
import Pretest from "@/components/pretest"; 
import Postest from "@/components/posttest"; 
import VideoMateri from "@/components/video-materi";
import Survey from "@/components/survey";

export default function ClassDetail() {
  const { id } = useParams();
  const [kelas, setKelas] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
      async function fetchUser() {
        try {
          const res = await fetch("/api/me");
          console.log(res);
          if (res.ok) {
            const data = await res.json();
            setUserId(data.user.id);
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
        const res = await fetch(`/api/kelas/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data kelas");
        const data = await res.json();
        setKelas(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) fetchKelas();
  }, [id]);

  return (
      <>
          <Preload />
          <div className="max-w-6xl mx-auto px-4 py-9 space-y-6">
              <ClassBanner
                  text={kelas?.nama_kelas || "Memuat..."}
                  imageLink="/images/banner-materi2.png"
              />

              <div className="flex flex-col lg:flex-row gap-6 transition-all duration-500 sidebar">
                  {/* Sidebar */}
                  <div
                      className={`bg-gray-50 rounded-lg shadow p-4 space-y-2 transition-all duration-500 ease-in-out ${
                          selectedMenu ? "w-full lg:w-1/3 h-[70vh]" : "w-full"
                      } flex flex-col`}
                  >
                      <h3 className="font-semibold mb-4">
                          {kelas?.nama_kelas || "Memuat..."}
                      </h3>
                      <ul className="space-y-2">
                          <button
                              onClick={() =>
                                  setSelectedMenu((prev) =>
                                      prev === "pretest" ? null : "pretest"
                                  )
                              }
                              className="w-full text-left hover:text-pink-500 transition-colors duration-300"
                          >
                              <ClassItem
                                  icon="pretest"
                                  label="Pretest"
                                  locked={false}
                              />
                          </button>
                          <hr />
                          <button
                              onClick={() =>
                                  setSelectedMenu((prev) =>
                                      prev === "materi" ? null : "materi"
                                  )
                              }
                              className="w-full text-left hover:text-pink-500 transition-colors duration-300"
                          >
                              <ClassItem
                                  icon="materi"
                                  label="Materi Pelatihan"
                                  locked={false}
                              />
                          </button>
                          <hr />
                          <button
                              onClick={() =>
                                  setSelectedMenu((prev) =>
                                      prev === "posttest" ? null : "posttest"
                                  )
                              }
                              className="w-full text-left hover:text-pink-500 transition-colors duration-300"
                          >
                              <ClassItem
                                  icon="posttest"
                                  label="Postest"
                                  locked={false}
                              />
                          </button>
                          <hr />
                          <button
                              onClick={() =>
                                  setSelectedMenu((prev) =>
                                      prev === "survey" ? null : "survey"
                                  )
                              }
                              className="w-full text-left hover:text-pink-500 transition-colors duration-300"
                          >
                              <ClassItem
                                  icon="survey"
                                  label="Survey"
                                  locked={false}
                              />
                          </button>
                      </ul>
                  </div>

                  {/* Konten */}
                  {selectedMenu && (
                      <div className="bg-white rounded-lg shadow p-4 animate-fade-slide outline outline-1 outline-pink-500 rounded-3xl h-[70vh] p-8 lg:w-2/3 flex-grow konten ">
                          {/* Adjust the max height as needed */}
                          <div className="flex justify-center items-center h-full">
                              {selectedMenu === "pretest" && (
                                  <Pretest id={id} userId={userId} />
                              )}
                              {selectedMenu === "materi" && <VideoMateri />}
                              {selectedMenu === "posttest" && (
                                  <Postest id={id} userId={userId} />
                              )}
                              {selectedMenu === "survey" && <Survey />}
                          </div>
                      </div>
                  )}
              </div>
          </div>
      </>
  );
}