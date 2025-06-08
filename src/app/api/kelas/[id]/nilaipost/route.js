import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  try {
    const kelas_id = parseInt(params.id)
    const url = new URL(req.url)
    const user_id = parseInt(url.searchParams.get('user_id'))

    if (!user_id || !kelas_id) {
      return new Response(
        JSON.stringify({ error: 'Missing user_id or kelas_id' }),
        { status: 400 }
      )
    }

    // Ambil nilai pretest user untuk kelas ini
    const nilaiPretest = await prisma.nilai.findFirst({
      where: {
        userId: user_id,
        kelasId: kelas_id,
        jenis: 'pretest',
      },
      select: {
        score: true,
      },
    })

    // Hitung total soal posttest yang dijawab user
    const totalSoal = await prisma.jawabanUser.count({
      where: {
        userId: user_id,
        kelasId: kelas_id,
        jenis: 'posttest',
      },
    })

    // Hitung total jawaban benar
    const totalBenar = await prisma.jawabanUser.count({
      where: {
        userId: user_id,
        kelasId: kelas_id,
        jenis: 'posttest',
        benar: true,
      },
    })

    return new Response(
      JSON.stringify({
        score: nilaiPretest?.score ?? null,
        total_soal: totalSoal,
        total_benar: totalBenar,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('API nilai error:', error)
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    )
  }
}
