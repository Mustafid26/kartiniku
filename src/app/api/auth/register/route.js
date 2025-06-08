import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req) {
  const { name, email, password } = await req.json()

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: 'Semua field wajib diisi' }), {
      status: 400,
    })
  }

  try {
    // Cek apakah user sudah ada
    const existingUser = await prisma.users.findUnique({
      where: { email },
    })

    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email sudah terdaftar' }), {
        status: 409,
      })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Simpan user baru
    await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return new Response(JSON.stringify({ message: 'Registrasi berhasil' }), {
      status: 201,
    })
  } catch (error) {
    console.error('Register error:', error)
    return new Response(JSON.stringify({ message: 'Terjadi kesalahan server' }), {
      status: 500,
    })
  }
}
