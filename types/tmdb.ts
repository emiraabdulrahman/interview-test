export type Genre = { id: number; name: string }
export type Movie = {
  id: number
  title: string
  release_date?: string
  popularity: number
  vote_average: number
  poster_path: string | null
  genre_ids?: number[]
}

export type Credit = { id: number; name: string; character?: string }
export type MovieDetails = Movie & {
  overview?: string
  genres?: Genre[]
  credits?: { cast?: Credit[] }
}
