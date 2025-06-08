import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request, { params }) {
  const { id } = params

  try {
    const kelas = await prisma.kelas.findUnique({
      where: {
        id: parseInt(id),
      },
    })

    if (!kelas) {
      return NextResponse.json({ message: 'Kelas tidak ditemukan' }, { status: 404 })
    }

    return NextResponse.json(kelas)
  } catch (error) {
    console.error('Error ambil data kelas:', error)
    return NextResponse.json({ message: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
