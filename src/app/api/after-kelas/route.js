import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET() {
  try {
    const token = cookies().get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    // Ambil kelas dan progress user dengan LEFT JOIN secara manual melalui Prisma
    const kelasList = await prisma.kelas.findMany({
      include: {
        user_kelas_progress: {
          where: { user_id: userId },
          select: {
            pretest_done: true,
            materi_done: true,
            posttest_done: true,
            survey_done: true,
          }
        }
      }
    });

    const kelasWithStatus = kelasList.map(kelas => {
      const progress = kelas.user_kelas_progress[0] || {};
      let status = 'belum';

      if (progress.posttest_done) status = 'selesai';
      else if (progress.pretest_done || progress.materi_done || progress.survey_done) status = 'inprogress';

      return {
        id: kelas.id,
        nama_kelas: kelas.nama_kelas,
        status,
      };
    });

    return NextResponse.json(kelasWithStatus);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
