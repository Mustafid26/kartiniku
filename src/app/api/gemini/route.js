import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { prisma } from '@/lib/prisma'; 

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(request) {
  try {
    const { message, id } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    let infoKelas = "";
    let nama_kelas = "";
    let deskripsi = "";

    if (id !== undefined) {
  const kelasId = Number(id);

  if (isNaN(kelasId)) {
    return NextResponse.json({ error: "id harus berupa angka" }, { status: 400 });
  }

  const kelas = await prisma.kelas.findUnique({
    where: { id: kelasId },
    select: {
      nama_kelas: true,
      deskripsi: true
    }
  });

  if (kelas) {
    nama_kelas = kelas.nama_kelas;
    deskripsi = kelas.deskripsi;
    infoKelas = `Informasi kelas: ${kelas.nama_kelas}. ${kelas.deskripsi}`;
  } else {
    infoKelas = `Tidak ditemukan kelas dengan ID ${kelasId}.`;
  }
}


    const systemPrompt = `Kamu adalah asisten virtual yang membantu menjawab pertanyaan tentang Kartiniku — sebuah website LMS khusus perempuan di Semarang yang menyediakan pembelajaran nonformal dan layanan konseling online.

    Kartiniku memiliki 5 layanan konseling: 
    1. Keluarga
    2. Kesehatan
    3. Informasi publik
    4. Sosial
    5. Perempuan dan anak

    Gunakan bahasa Indonesia yang mudah dimengerti, singkat, dan ramah. Jangan menggunakan awalan seperti "konselor berkata" atau simbol seperti tanda bintang (*). Jika pesan berupa sapaan seperti "halo", "hai", atau "assalamualaikum", balaslah dengan sapaan juga. Untuk pertanyaan lain, langsung jawab dengan jelas dan to the point.

    Jika ada pertanyaan seperti:
    - "nama kelas ini apa", "kelas ini namanya apa", dan sejenisnya → jawab dengan kalimat yang natural dan mudah dimengerti, misalnya: "Nama kelas ini adalah ${nama_kelas}."
    - "deskripsi kelas ini apa", "kelas ini membahas apa", dan sejenisnya → jawab dengan kalimat informatif, contohnya: "Kelas ini berisi materi tentang ${deskripsi}."

    ${infoKelas ? infoKelas : "Saat ini belum ada informasi detail mengenai kelas yang tersedia."}

    Sekarang, jawablah pertanyaan ini dengan singkat, jelas, dan sesuai konteks: ${message}`;


    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: systemPrompt,
      config: {
        maxOutputTokens: 200,
        temperature: 0.7,
      },
    }); 

    return NextResponse.json(
      {
        summary: result.text,
        message: "Berhasil generate jawaban",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
