"use client";
import React, { useEffect, useState } from "react";

const Pretest = ({ id, userId }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [totalSoal, setTotalSoal] = useState(0);
  const [totalBenar, setTotalBenar] = useState(0);
  const [user, setUser] = useState(null);

  const [pretestDone, setPretestDone] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(true);
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

  async function handleSubmit() {
    let correct = 0;
    const payload = questions.map((q) => {
      const userAnswer = selectedAnswers[q.id];
      const correctAnswer = q.jawaban_benar.toLowerCase();
      const isCorrect = userAnswer === correctAnswer;
      if (isCorrect) correct++;

      return {
        soal_id: q.id,
        jawaban: userAnswer?.toUpperCase(),
        benar: isCorrect ? 1 : 0,
      };
    });

    try {
      const resJawaban = await fetch("/api/jawaban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jawaban: payload,
          kelas_id: id,
          user_id: userId,
          score: correct,
        }),
      });

      if (!resJawaban.ok) throw new Error("Gagal menyimpan jawaban.");

      const resNilai = await fetch(`/api/jawaban`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          kelas_id: id,
          jenis: "pretest",
          score: correct,
        }),
      });


      if (!resNilai.ok) throw new Error("Gagal menyimpan nilai.");

      setScore(correct);
      setIsFinished(true);
      setPretestDone(true);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan jawaban atau nilai.");
    }
  }


    useEffect(() => {
      async function fetchSoal() {
        try {
          const res = await fetch(`/api/kelas/${id}/pretest?userId=${userId}`);
          if (!res.ok) throw new Error("Gagal mengambil data soal");

          const data = await res.json();
          const soal = data.soal?.flat?.() ?? data.soal; 
          setQuestions(soal);
          setPretestDone(data.pretest_done); 

        } catch (error) {
          console.error(error);
        } finally {
          setLoadingStatus(false);
        }
      }

      if (id && userId) fetchSoal();
    }, [id, userId]);
    useEffect(() => {
      async function fetchNilai() {
        const res = await fetch(`/api/kelas/${id}/nilaipre?user_id=${userId}`);
        const data = await res.json();
        setTotalSoal(data.total_soal);
        setTotalBenar(data.total_benar);
      }

      fetchNilai();
    }, [userId]);

  function handleOptionChange(soalId, option) {
    setSelectedAnswers((prev) => ({
      ...prev,
      [soalId]: option,
    }));
  }

  if (loadingStatus) {
    return (
      <div className="flex justify-center items-center h-full">      
        <p className="text-center text-pink-600 font-semibold">
          Memuat status pretest...
        </p>
      </div>
    );
  }

  if (pretestDone) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center p-10 w-full">
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Pretest Sudah Selesai
          </h2>
          <p className="mt-4 text-lg">
            Nilai Anda: {((score ?? totalBenar) / (questions.length || totalSoal) * 100).toFixed(0)}
          </p>
          <p>Anda sudah menyelesaikan pretest untuk kelas ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 w-full">
      {!isFinished && questions.length === 0 && (
        <p className="text-center text-pink-600 font-semibold">Memuat soal...</p>
      )}

      {!isFinished && questions.length > 0 && (
        <>
          <div className="text-black rounded-xl p-2">
            <p className="font-semibold">
              Soal {currentIndex + 1}/{questions.length}
            </p>
            <p className="mt-2">{questions[currentIndex].pertanyaan}</p>
          </div>
          <div className="mt-6 space-y-4">
            {["a", "b", "c", "d"].map((optionKey) => {
              const optionText = questions[currentIndex][`opsi_${optionKey}`];
              return (
                <label
                  key={optionKey}
                  className={`flex items-center justify-between border-2 rounded-xl px-4 py-2 cursor-pointer ${
                    selectedAnswers[questions[currentIndex].id] === optionKey
                      ? "border-pink-500 bg-pink-100"
                      : "border-pink-700"
                  }`}
                >
                  <span>{optionText}</span>
                  <input
                    type="radio"
                    name={`soal-${questions[currentIndex].id}`}
                    className="form-radio text-pink-500"
                    checked={
                      selectedAnswers[questions[currentIndex].id] === optionKey
                    }
                    onChange={() =>
                      handleOptionChange(questions[currentIndex].id, optionKey)
                    }
                  />
                </label>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => {
                  if (!selectedAnswers[questions[currentIndex].id]) {
                    alert("Harap pilih jawaban terlebih dahulu.");
                    return;
                  }
                  setCurrentIndex(currentIndex + 1);
                }}
                className="bg-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-600"
              >
                Lanjut
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700"
              >
                Selesai
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Pretest;
