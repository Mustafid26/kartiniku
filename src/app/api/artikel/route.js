import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const articles = await prisma.articles.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        summary: true,
        image_url: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch articles' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
