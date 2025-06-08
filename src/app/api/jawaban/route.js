import { connectDB } from "@/lib/db";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const cookies = req.cookies;
    const token = cookies.get("token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const user_id = decoded.id;
    const db = await connectDB();

    const body = await req.json();
    const { jawaban = [], score, kelas_id } = body;

    // Validasi bahwa jawaban adalah array
    if (!Array.isArray(jawaban)) {
      return new Response(JSON.stringify({ error: "Jawaban harus berupa array" }), {
        status: 400,
      });
    }

    // Simpan jawaban jika ada
    for (const item of jawaban) {
      const id = uuidv4();
      await db.query(
        "INSERT INTO jawaban_user (id, user_id, soal_id, kelas_id, jenis, jawaban, benar) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [id, user_id, item.soal_id, kelas_id, 'pretest', item.jawaban, item.benar]
      );
    }

    // Update progress pretest_done
    await db.query(
      `INSERT INTO user_kelas_progres (user_id, kelas_id, pretest_done, materi_done, posttest_done, survey_done)
       VALUES (?, ?, 1, 0, 0, 0)
       ON DUPLICATE KEY UPDATE pretest_done = 1`,
      [user_id, kelas_id]
    );

    // Simpan skor total ke tabel nilai
    await db.query(
      `INSERT INTO nilai (user_id, kelas_id, jenis, score)
       VALUES (?, ?, 'pretest', ?)
       ON DUPLICATE KEY UPDATE score = ?`,
      [user_id, kelas_id, score, score]
    );

    return new Response(JSON.stringify({ success: true, score }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API error (pretest):", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
