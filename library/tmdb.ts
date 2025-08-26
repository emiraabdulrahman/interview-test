const API_BASE = "https://api.themoviedb.org/3";

export async function fetchNowPlaying(page: number = 1) {
 
  const res = await fetch(
    `${API_BASE}/movie/now_playing?language=en-US&page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  if (!res.ok) {
     console.error("Error fetching genres:", await res.text());
    throw new Error("Failed to fetch genres");
  }
  const data = await res.json();
  //console.log("Server-side API response:", data); // 👈 will log in terminal
  return data;

}

export async function fetchGenres() {
  const res = await fetch(`${API_BASE}/genre/movie/list?language=en-US`, {
    headers: {
       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }
  return res.json();
}

export async function fetchMovieDetails(id: number) {
  const res = await fetch(
    `${API_BASE}/movie/${id}?append_to_response=credits&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY ?? process.env.TMDB_API_KEY}`,
      "Content-Type": "application/json;charset=utf-8",
      },
      next: { revalidate: 60 },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }
  return res.json();
}
