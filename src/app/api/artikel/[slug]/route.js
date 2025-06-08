import { prisma } from '@/lib/prisma';

export async function GET(req, { params }) {
  try {
    const slug = params.slug;

    // Ambil artikel berdasarkan slug dan join dengan user (relation)
    const article = await prisma.articles.findUnique({
      where: { slug },
      include: {
        user: {
          select: { name: true }
        }
      }
    });

    if (!article) {
      return new Response(JSON.stringify({ error: "Artikel tidak ditemukan" }), { status: 404 });
    }

    // Ambil artikel lain selain yang sedang diambil sebagai "nextArticle"
    const nextArticle = await prisma.articles.findFirst({
      where: {
        slug: { not: slug }
      },
      take: 1
    });

    const response = {
      article,
      nextArticle: nextArticle || null,
    };

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching article:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
