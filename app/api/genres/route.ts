import { NextResponse } from 'next/server';
import { getGenres } from '@/library/tmdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const region = searchParams.get('region') || undefined
  const genres = await getGenres(region)
  return NextResponse.json({ genres })
}