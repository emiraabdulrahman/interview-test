import { NextResponse } from 'next/server';
import { getMovieDetails } from '@/library/tmdb';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const data = await getMovieDetails(Number(params.id))
  return NextResponse.json(data)
}