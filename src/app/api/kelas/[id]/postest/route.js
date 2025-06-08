import { prisma } from '@/lib/prisma'

export async function GET(req, { params }) {
  const id = parseInt(params.id)
  const url = new URL(req.url)
  const userId = parseInt(url.searchParams.get('userId'))

  if (!userId) {
    return new Response(
      JSON.stringify({ error: 'userId is required' }),
      { status: 400 }
    )
  }

  try {
    const jenis = 'posttest'

    // Ambil soal berdasarkan kelas_id dan jenis 'posttest'
    const soal = await prisma.soal.findMany({
      where: {
        kelasId: id,
        jenis: jenis,
      },
      select: {
        id: true,
        pertanyaan: true,
        opsi_a: true,
        opsi_b: true,
        opsi_c: true,
        opsi_d: true,
        jawaban_benar: true,
      },
    })

    // Cek apakah user sudah menyelesaikan posttest
    const progres = await prisma.userKelasProgres.findFirst({
      where: {
        userId: userId,
        kelasId: id,
      },
      select: {
        posttest_done: true,
      },
    })

    const postestDone = progres ? progres.posttest_done : false

    return new Response(
      JSON.stringify({
        soal,
        postest_done: postestDone,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Gagal mengambil data posttest' }),
      { status: 500 }
    )
  }
}
