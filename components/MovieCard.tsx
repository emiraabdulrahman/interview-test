"use client";
import Image from "next/image";

type Props = {
  movie: any;
  onClick: () => void;
};

export default function MovieCard({ movie, onClick }: Props) {
  return (
    <div
      className="relative cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition"
      onClick={onClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={300}
        height={450}
        className="w-full h-80 object-cover"
      />
      <div className="absolute p-4 left-0 top-0 w-full h-full bg-black bg-opacity-50 hover:bg-black">
        <h3 className="font-semibold text-m">{movie.title}</h3>
        <p className="text-sm text-white">{movie.release_date}</p>
      </div>
    </div>
  );
}
