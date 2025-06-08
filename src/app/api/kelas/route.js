import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const decoded = jwt.verify(token, SECRET_KEY)
    const userId = decoded.id

    // Ambil semua kelas
    const semuaKelas = await prisma.kelas.findMany()

    // Ambil progres user untuk semua kelas
    const progresUser = await prisma.userKelas.findMany({
      where: { userId },
      select: {
        kelasId: true,
        status: true,
      },
    })

    // Gabungkan data kelas dengan status progres user (jika ada)
    const hasilGabungan = semuaKelas.map(kelas => {
      const progress = progresUser.find(p => p.kelasId === kelas.id)
      return {
        ...kelas,
        status: progress?.status || null,
      }
    })

    return NextResponse.json(hasilGabungan)
  } catch (error) {
    console.error('GET kelas error:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}
