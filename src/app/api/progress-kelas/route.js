import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const body = await req.json();
    const { kelas_id, tahap } = body; // tahap = 'pretest', 'posttest', dll

    if (!kelas_id || !tahap) {
      return NextResponse.json({ message: 'kelas_id dan tahap wajib diisi' }, { status: 400 });
    }

    // Cek apakah record user_progress untuk user dan kelas ini sudah ada
    const existing = await prisma.user_progress.findFirst({
      where: {
        user_id: userId,
        kelas_id: kelas_id,
      },
    });

    if (!existing) {
      // Belum ada, insert baru
      let status = 'belum';
      if (tahap === 'pretest') status = 'progress';
      if (tahap === 'posttest') status = 'selesai';

      await prisma.user_progress.create({
        data: {
          user_id: userId,
          kelas_id: kelas_id,
          status: status,
          updated_at: new Date(),
        },
      });
    } else {
      // Sudah ada, update status jika perlu
      let newStatus = existing.status;

      if (tahap === 'pretest' && newStatus === 'belum') {
        newStatus = 'progress';
      } else if (tahap === 'posttest') {
        newStatus = 'selesai';
      }

      await prisma.user_progress.update({
        where: { id: existing.id },
        data: {
          status: newStatus,
          updated_at: new Date(),
        },
      });
    }

    return NextResponse.json({ message: 'Progress updated' });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
