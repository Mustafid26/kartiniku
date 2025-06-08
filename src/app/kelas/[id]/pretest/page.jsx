"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const Pretest = () => {
  const { id } = useParams(); // Ambil id kelas dari URL
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { soalId: pilihan }

  useEffect(() => {
    async function fetchSoal() {
      try {
        const res = await fetch(`/api/kelas/${id}/pretest`);
        if (!res.ok) throw new Error("Gagal mengambil data soal");
        const data = await res.json();
        const soal = data.flat().filter((item) => item.pertanyaan);
        setQuestions(soal);
      } catch (error) {
        console.error(error);
      }
    }
    if (id) fetchSoal();
  }, [id]);

  function handleOptionChange(soalId, option) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [soalId]: option,
    }));
  }

  function handleBack() {
    router.back();
  }

  function handleNext() {
    // Validasi semua soal sudah dijawab
    if (questions.some((q) => !selectedAnswers[q.id])) {
      alert("Harap jawab semua pertanyaan terlebih dahulu.");
      return;
    }

    // Misal lanjut ke halaman selanjutnya
    alert("Jawaban sudah dipilih, kamu bisa proses simpan/jalankan selanjutnya.");

    // Contoh navigasi ke halaman berikutnya
    // router.push(`/kelas/${id}/postest`);
  }

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full max-w-xl relative">
        {questions.length === 0 && (
          <p className="text-center text-pink-600 font-semibold">Memuat soal...</p>
        )}

        {questions.map((q, index) => (
          <div key={q.id} className="mb-10">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white">
              {index + 1}
            </div>
            <div className="mt-16 bg-pink-300 text-white rounded-xl p-6 text-center">
              <p className="font-semibold">
                Kuis {index + 1}/{questions.length}
              </p>
              <p className="mt-2">{q.pertanyaan}</p>
            </div>

            <div className="mt-6 space-y-4">
              {["a", "b", "c", "d"].map((optionKey) => {
                const optionText = q[`opsi_${optionKey}`];
                return (
                  <label
                    key={optionKey}
                    className={`flex items-center justify-between border-2 rounded-xl px-4 py-2 cursor-pointer ${
                      selectedAnswers[q.id] === optionKey
                        ? "border-pink-500 bg-pink-100"
                        : "border-pink-700"
                    }`}
                  >
                    <span>{optionText}</span>
                    <input
                      type="radio"
                      name={`soal-${q.id}`}
                      className="form-radio text-pink-500"
                      checked={selectedAnswers[q.id] === optionKey}
                      onChange={() => handleOptionChange(q.id, optionKey)}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        ))}

        {questions.length > 0 && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBack}
              className="bg-white border border-pink-500 text-pink-500 px-6 py-2 rounded-xl font-semibold hover:bg-pink-50"
            >
              Kembali
            </button>
            <button
              onClick={handleNext}
              className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-600"
            >
              Lanjut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pretest;
