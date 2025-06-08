import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function POST(req) {
  const SECRET_KEY = process.env.JWT_SECRET
  if (!SECRET_KEY) {
    return NextResponse.json(
      { message: 'JWT_SECRET belum dikonfigurasi' },
      { status: 500 }
    )
  }

  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email dan password wajib diisi' },
        { status: 400 }
      )
    }

    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Email tidak ditemukan' },
        { status: 404 }
      )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Password salah' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      SECRET_KEY,
      { expiresIn: '1d' }
    )

    const response = NextResponse.json({ message: 'Login berhasil' })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 hari
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Terjadi kesalahan pada server' },
      { status: 500 }
    )
  }
}
