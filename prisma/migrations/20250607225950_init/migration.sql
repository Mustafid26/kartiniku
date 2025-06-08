-- CreateEnum
CREATE TYPE "JenisTes" AS ENUM ('pretest', 'posttest');

-- CreateEnum
CREATE TYPE "Jawaban" AS ENUM ('A', 'B', 'C', 'D');

-- CreateEnum
CREATE TYPE "TipeKonten" AS ENUM ('teks', 'video', 'file');

-- CreateEnum
CREATE TYPE "JenisNilai" AS ENUM ('pretest', 'posttest', 'materi');

-- CreateEnum
CREATE TYPE "TipeSurvey" AS ENUM ('text', 'choice', 'rating');

-- CreateEnum
CREATE TYPE "StatusBelajar" AS ENUM ('belum', 'inprogress', 'selesai');

-- CreateTable
CREATE TABLE "Articles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT,
    "content" TEXT,
    "image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JawabanSurvey" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "surveyId" INTEGER,
    "jawaban" TEXT,
    "waktu_jawab" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JawabanSurvey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JawabanUser" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "soalId" INTEGER,
    "kelasId" INTEGER,
    "jenis" "JenisTes" NOT NULL,
    "jawaban" "Jawaban",
    "benar" BOOLEAN,

    CONSTRAINT "JawabanUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kelas" (
    "id" SERIAL NOT NULL,
    "nama_kelas" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "Kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materi" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER,
    "judul" TEXT,
    "konten" TEXT,
    "tipe" "TipeKonten" NOT NULL DEFAULT 'teks',

    CONSTRAINT "Materi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "jenis" "JenisNilai" NOT NULL,
    "score" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Soal" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER,
    "jenis" "JenisTes" NOT NULL,
    "pertanyaan" TEXT NOT NULL,
    "opsi_a" TEXT,
    "opsi_b" TEXT,
    "opsi_c" TEXT,
    "opsi_d" TEXT,
    "jawaban_benar" "Jawaban" NOT NULL,

    CONSTRAINT "Soal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "kelasId" INTEGER,
    "pertanyaan" TEXT,
    "tipe" "TipeSurvey" NOT NULL DEFAULT 'text',
    "pilihan" TEXT,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserKelas" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "status" "StatusBelajar" NOT NULL DEFAULT 'belum',
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserKelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserKelasProgres" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "kelasId" INTEGER NOT NULL,
    "pretest_done" BOOLEAN NOT NULL DEFAULT false,
    "materi_done" BOOLEAN NOT NULL DEFAULT false,
    "posttest_done" BOOLEAN NOT NULL DEFAULT false,
    "survey_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserKelasProgres_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Articles_slug_key" ON "Articles"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Nilai_userId_kelasId_jenis_key" ON "Nilai"("userId", "kelasId", "jenis");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserKelas_userId_kelasId_key" ON "UserKelas"("userId", "kelasId");

-- CreateIndex
CREATE UNIQUE INDEX "UserKelasProgres_userId_kelasId_key" ON "UserKelasProgres"("userId", "kelasId");

-- AddForeignKey
ALTER TABLE "Articles" ADD CONSTRAINT "Articles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JawabanSurvey" ADD CONSTRAINT "JawabanSurvey_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JawabanUser" ADD CONSTRAINT "JawabanUser_soalId_fkey" FOREIGN KEY ("soalId") REFERENCES "Soal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materi" ADD CONSTRAINT "Materi_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Soal" ADD CONSTRAINT "Soal_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKelas" ADD CONSTRAINT "UserKelas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKelas" ADD CONSTRAINT "UserKelas_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKelasProgres" ADD CONSTRAINT "UserKelasProgres_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKelasProgres" ADD CONSTRAINT "UserKelasProgres_kelasId_fkey" FOREIGN KEY ("kelasId") REFERENCES "Kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
