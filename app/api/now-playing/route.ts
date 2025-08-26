import { NextResponse } from 'next/server';
import { getNowPlayingAggregated } from '@/library/tmdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const data = await getNowPlayingAggregated({
    page: Number(searchParams.get('page') || '1'),
    sort: searchParams.get('sort') || undefined,
    rating: Number(searchParams.get('rating') || '0'),
    genres: searchParams.get('genres') || undefined,
    region: searchParams.get('region') || undefined,
  })
  return NextResponse.json(data)
}