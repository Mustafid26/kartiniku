import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 

const SECRET_KEY = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}

export async function PUT(req) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    
    const data = await req.json();
    console.log('Decoded JWT:', decoded);
    console.log('Data from frontend:', data);

    const updatedUser = await prisma.users.update({
      where: { id: decoded.id },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    // Buat token baru
    const newToken = jwt.sign(
      { id: updatedUser.id, name: updatedUser.name, email: updatedUser.email },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({ user: updatedUser });
    response.cookies.set('token', newToken, { httpOnly: true, secure: true, path: '/' });

    return response;
  } catch (err) {
    console.error('Error updating profile:', err.message, err.stack);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
