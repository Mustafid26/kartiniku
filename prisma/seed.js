const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // Seed Users
    await prisma.users.createMany({
        data: [
            { id: 1, name: 'Mahasiswa1', email: 'buatapapun99@gmail.com', password: '$2b$10$dvjJ9JXlYfzW.YJu.rMj8uqC8n02LPSgwaNTRHxgZCLH/UJezW18O' },
            { id: 4, name: 'Dicta incidunt omni', email: 'minprim@gmail.com', password: '$2b$10$52PfWLa3YLV1VyUbp/eNz.oy9fjI6RYl6mJyaPi5XgzaxmMlXv0JS' },
            { id: 6, name: 'Mahasiswa2', email: 'admin@example.com', password: '$2b$10$E3APHL2fQ1LcBP75oeFpGeoz4cMLLRGiSXqTFXvLawDY4zJ7zzXgu' },
            { id: 7, name: 'Kaisa', email: 'admin@example.comm', password: '$2b$10$UjyhumIurFlltUB9Vtlr0ubzM8mdsJ.xkymuBaEB7teWN1IsaM4vG' },
        ],
        skipDuplicates: true,
    })

    // Seed Kelas
    await prisma.kelas.createMany({
        data: [
            {
                id: 1,
                nama_kelas: 'Meningkatkan Kreatifitas bersama Anak dengan Kegiatan Ecoprint',
                deskripsi: 'Kelas ini akan mengajarkan cara mengurangi paparan digital pada anak-anak melalui kegiatan ecoprint yang dapat sekaligus meningkatkan kreativitas anak'
            },
            {
                id: 2,
                nama_kelas: 'Mengurangi Dampak Paparan Digital pada Anak dengan Memaksimalkan Permainan Kreatif',
                deskripsi: 'Kelas ini bertujuan untuk memberikan strategi kepada orang tua dalam mengurangi paparan digital pada anak-anak mereka dengan memanfaatkan permainan kreatif. '
            },
            {
                id: 3,
                nama_kelas: 'Strategi 3R dalam Pengelolaan Sampah Dan Implementasi 3R (Recycle)',
                deskripsi: 'Kelas ini bertujuan untuk memberikan pemahaman tentang praktik pengelolaan sampah yang berkelanjutan. Materi yang disampaikan akan mencakup tiga konsep utama dalam pengelolaan sampah dengan implementasi pemanfaatan minyak jelantah menjadi lilin'
            },
            {
                id: 4,
                nama_kelas: 'Pelatihan Foto Produk',
                deskripsi: 'Dalam pelatihan ini, peserta akan diajak untuk mempelajari berbagai teknik yang berkaitan dengan fotografi produk, yang bertujuan untuk meningkatkan daya tarik branding visual produk. '
            },
        ],
        skipDuplicates: true,
    })

    // Seed Soal
    await prisma.soal.createMany({
        data: [
            {
                id: 1,
                kelasId: 1,
                jenis: 'pretest',
                pertanyaan: 'Apa itu pretest?',
                opsi_a: 'a',
                opsi_b: 'b',
                opsi_c: 'c',
                opsi_d: 'd',
                jawaban_benar: 'A'
            },
            {
                id: 2,
                kelasId: 1,
                jenis: 'pretest',
                pertanyaan: 'apa itu wow?',
                opsi_a: 'a',
                opsi_b: 'b',
                opsi_c: 'c',
                opsi_d: 'd',
                jawaban_benar: 'B'
            },
            {
                id: 3,
                kelasId: 1,
                jenis: 'posttest',
                pertanyaan: 'Apa itu postest?',
                opsi_a: 'a',
                opsi_b: 'b',
                opsi_c: 'c',
                opsi_d: 'd',
                jawaban_benar: 'B'
            }
        ],
        skipDuplicates: true,
    })

    // Seed Articles
    await prisma.articles.createMany({
        data: [
            {
                id: 1,
                title: 'Pelatihan Keterampilan Usaha bagi Perempuan Desa Tani',
                userId: 1,
                slug: 'Pelatihan-Keterampilan',
                summary: 'Kelompok wanita tani mendapatkan bantuan berupa sarana prasarana pendukung produksi hasil pertanian...',
                content: 'Kelompok wanita tani mendapatkan bantuan berupa sarana prasarana pendukung produksi hasil pertanian...',
                image_url: '/images/img-artikel.svg',
                created_at: new Date('2025-05-28T07:55:46'),
                updated_at: new Date('2025-05-28T08:07:17')
            },
            {
                id: 2,
                title: 'Mengapa Usaha Tani Selalu "Didinginkan" oleh Negara Sendiri?',
                userId: 6,
                slug: 'Mengapa-Usaha-Tani',
                summary: 'Berdasarkan studi kasus yang dilakukan oleh Prof. Suestiawan...',
                content: 'Berdasarkan studi kasus yang dilakukan oleh Prof. Suestiawan...',
                image_url: '/images/img-artikel.svg',
                created_at: new Date('2025-05-28T08:14:53'),
                updated_at: new Date('2025-05-28T08:15:15')
            },
            {
                id: 3,
                title: 'PESERTA SEKARI BERLATIH MELAKUKAN FOTO PRODUK BERSAMA TIM PPK ORMAWA HMTI UDINUS',
                userId: 1,
                slug: 'PESERTA-SEKARI-BERLATIH',
                summary: 'Demak - Tim PPK Ormawa HMTI Udinus menggelar pelatihan foto produk...',
                content: 'Demak - Tim PPK Ormawa HMTI Udinus menggelar pelatihan foto produk...',
                image_url: '/images/artikel1.png',
                created_at: new Date('2025-05-28T08:26:13'),
                updated_at: new Date('2025-05-28T08:26:13')
            },
            {
                id: 4,
                title: 'SEKARI 03 BERLATIH UNTUK MEMBANGUN WEBSITE MENGGUNAKAN GOOGLE SITES BERSAMA TIM PPK ORMAWA HMTI UDINUS',
                userId: 1,
                slug: 'BERLATIH-UNTUK-MEMBANGUN-WEBSITE',
                summary: 'Demak - Tim PPK Ormawa HMTI Udinus melakukan penyuluhan pelatihan pembuatan website...',
                content: 'Demak - Tim PPK Ormawa HMTI Udinus melakukan penyuluhan pelatihan pembuatan website...',
                image_url: '/images/artikel2.jpg',
                created_at: new Date('2025-05-28T08:32:16'),
                updated_at: new Date('2025-05-28T08:32:16')
            }
        ],
        skipDuplicates: true,
    })

    console.log('✅ Seeding selesai.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => prisma.$disconnect())
