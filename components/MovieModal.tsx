"use client";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/library/tmdb";

type Props = {
  movieId: number | null;
  onClose: () => void;
};

export default function MovieModal({ movieId, onClose }: Props) {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails(movieId).then(setMovie);
    }
  }, [movieId]);

  if (!movieId || !movie) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white max-w-lg w-full p-4 rounded-xl relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold text-black">{movie.title}</h2>
        <p className="text-gray-500 mb-2">Release date: {movie.release_date}</p>
        <h3 className="font-semibold text-black">Summary:</h3>
        <p className="mb-4">{movie.overview}</p>
        <h3 className="font-semibold text-black">Cast:</h3>
        <ul className="text-sm text-gray-700">
          {movie.credits?.cast?.slice(0, 5).map((c: any) => (
            <li key={c.id}>
              {c.name} as {c.character}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
