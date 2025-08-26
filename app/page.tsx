"use client";
import { useEffect, useState } from "react";
import { fetchNowPlaying, fetchGenres } from "@/library/tmdb";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";

import "./page.css";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [page, setPage] = useState(1); // our "virtual" page (30 movies each)
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  useEffect(() => {
    async function loadMovies() {
      // Map our "page" into TMDB pages
      const tmdbPage1 = page * 2 - 1;
      const tmdbPage2 = page * 2;

      const res1 = await fetchNowPlaying(tmdbPage1);
      const res2 = await fetchNowPlaying(tmdbPage2);

      // Merge and slice 30 movies
      const combined = [...res1.results, ...res2.results].slice(0, 30);
      setMovies(combined);
    }

    loadMovies();
    fetchGenres().then((res) => setGenres(res.genres));
  }, [page]);

  const filtered = movies
    .filter((m) =>
      selectedGenre ? m.genre_ids.includes(selectedGenre) : true
    ) // filter by genre
    .filter((m) => m.vote_average >= minRating) // filter by rating
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "release_date")
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      if (sortBy === "vote_average") return b.vote_average - a.vote_average;
      return b.popularity - a.popularity;
    }); // sort by popularity, movie title, release date or ratings

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Now Playing</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <select
          className="border rounded p-2 w-1/3"
          onChange={(e) =>
            setSelectedGenre(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded p-2 w-1/3"
          onChange={(e) => setMinRating(Number(e.target.value))}
        >
          <option value="0">All Ratings</option>
          <option value="5">5+</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="8">8+</option>
        </select>
        <select
          className="border rounded p-2 w-1/3"
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity.desc">Most popular</option>
          <option value="title">Title</option>
          <option value="release_date">Release Date</option>
          <option value="vote_average">Rating</option>
        </select>
      </div>

      {/* Movie grid */}
      <div className="grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {filtered.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onClick={() => setSelectedMovie(m.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-white hover:text-black"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="px-3 py-1 border rounded hover:bg-white hover:text-black"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      <MovieModal
        movieId={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </main>
  );
}
