'use client'

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Film, Star, Calendar, Users, ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { getImageUrl, formatDate } from '@/library/utils';
import type { Movie, Genre, MovieDetails } from '@/types/tmdb';

const SORTS = [
  { value: 'popularity.desc', label: 'Popularity' },
  { value: 'vote_average.desc', label: 'Rating' },
  { value: 'title.asc', label: 'Title (A→Z)' },
  { value: 'title.desc', label: 'Title (Z→A)' },
  { value: 'release_date.desc', label: 'Release date (newest)' },
  { value: 'release_date.asc', label: 'Release date (oldest)' },
];

const RATINGS = [0, 5, 6, 7, 8, 8.5];

export default function MoviesShell({ initialSearch }: { initialSearch: Record<string, string> }) {
  const router = useRouter();
  const sp = useSearchParams();

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<MovieDetails | null>(null);

  const page = Number(sp.get('page') || initialSearch.page || '1');
  const sort = (sp.get('sort_by') || initialSearch.sort || 'popularity.desc');
  const rating = (sp.get('rating') || initialSearch.rating || '0');
  const genreParam = (sp.get('genre_ids') || initialSearch.genres || '');
  const region = (sp.get('region') || initialSearch.region || process.env.NEXT_PUBLIC_DEFAULT_REGION || '');

  const selectedGenres = useMemo(() => genreParam.split(',').filter(Boolean), [genreParam])

  const setQuery = (patch: Record<string, string | number | undefined>) => {
    const params = new URLSearchParams(sp.toString())
    Object.entries(patch).forEach(([k, v]) => {
      if (v === undefined || v === '' || v === '0') params.delete(k)
      else params.set(k, String(v))
    })
    params.set('page', String(patch.page ?? page))
    router.push(`/?${params.toString()}`)
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [genRes, movRes] = await Promise.all([
          fetch(`/api/genres?region=${region}`),
          fetch(`/movie/now_playing?language=en-US&page=${page}&sort_by=${sort}`),
        ])
        const g = await genRes.json()
        const m = await movRes.json()
        setGenres(g.genres || [])
        setMovies(m.results || [])
        setTotal(m.total || 0)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [page, sort, rating, genreParam, region])

  const onToggleGenre = (id: number) => {
    const set = new Set(selectedGenres)
    if (set.has(String(id))) set.delete(String(id))
    else set.add(String(id))
    setQuery({ genres: Array.from(set).join(','), page: 1 })
  }

  const openModal = async (id: number) => {
    const res = await fetch(`/api/movie/${id}`)
    const data: MovieDetails = await res.json()
    setSelected(data)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-neutral-400">Sort</label>
            <div className="flex gap-2">
              <div className="relative inline-flex items-center">
                <ArrowUpDown className="w-4 h-4 mr-2 text-neutral-400" />
                <select
                  className="bg-neutral-800/70 border border-white/10 rounded-xl px-3 py-2 text-sm"
                  value={sort}
                  onChange={(e) => setQuery({ sort: e.target.value, page: 1 })}
                >
                  {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="relative inline-flex items-center">
                <Star className="w-4 h-4 mr-2 text-neutral-400" />
                <select
                  className="bg-neutral-800/70 border border-white/10 rounded-xl px-3 py-2 text-sm"
                  value={rating}
                  onChange={(e) => setQuery({ rating: e.target.value, page: 1 })}
                >
                  {RATINGS.map(r => <option key={r} value={r}>{r}+ rating</option>)}
                </select>
              </div>
              <div className="relative inline-flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-2 text-neutral-400" />
                <input
                  placeholder="Region (e.g. MY, US)"
                  className="bg-neutral-800/70 border border-white/10 rounded-xl px-3 py-2 text-sm w-28"
                  defaultValue={region}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setQuery({ region: (e.target as HTMLInputElement).value, page: 1 })
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className="text-xs uppercase tracking-wider text-neutral-400">Genres</label>
            <div className="flex flex-wrap gap-2">
              {genres.map(g => (
                <button
                  key={g.id}
                  className={`badge border ${selectedGenres.includes(String(g.id)) ? 'border-white/50 bg-white/20' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => onToggleGenre(g.id)}
                >{g.name}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {loading ? Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="card aspect-[2/3] animate-pulse" />
        )) : movies.map(m => (
          <motion.button
            key={m.id}
            layout
            onClick={() => openModal(m.id)}
            className="card overflow-hidden text-left hover:-translate-y-1 transition-transform"
            whileHover={{ scale: 1.01 }}
          >
            <div className="relative aspect-[2/3]">
              {m.poster_path ? (
                <Image src={getImageUrl(m.poster_path, 500)} alt={m.title} fill sizes="(max-width:768px) 50vw, 20vw" className="object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center text-neutral-500"><Film className="w-10 h-10" /></div>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium leading-tight line-clamp-2">{m.title}</div>
              <div className="text-xs text-neutral-400 flex items-center gap-1 mt-1"><Calendar className="w-3 h-3" /> {formatDate(m.release_date)}</div>
              <div className="text-xs text-neutral-300 mt-1 flex items-center gap-1"><Star className="w-3 h-3" /> {m.vote_average?.toFixed(1) ?? '–'}</div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3">
        <button
          className="badge bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
          onClick={() => setQuery({ page: Math.max(1, page - 1) })}
          disabled={page <= 1}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <div className="text-sm text-neutral-400">Page <span className="text-neutral-100">{page}</span> · Total <span className="text-neutral-100">{total}</span></div>
        <button
          className="badge bg-white/5 border border-white/10 hover:bg-white/10 disabled:opacity-40"
          onClick={() => setQuery({ page: page + 1 })}
          disabled={movies.length === 0}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div className="card max-w-3xl w-full m-4 overflow-hidden" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }} onClick={e => e.stopPropagation()}>
              <div className="grid md:grid-cols-[200px_1fr]">
                <div className="relative aspect-[2/3] md:aspect-auto md:h-full">
                  {selected.poster_path ? (
                    <Image src={getImageUrl(selected.poster_path, 500)} alt={selected.title} fill className="object-cover" />
                  ) : <div className="h-full flex items-center justify-center text-neutral-500"><Film className="w-10 h-10" /></div>}
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold leading-tight">{selected.title}</h3>
                  <div className="flex gap-3 text-sm text-neutral-300">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {formatDate(selected.release_date)}</span>
                    <span className="flex items-center gap-1"><Star className="w-4 h-4" /> {selected.vote_average?.toFixed(1)}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Cast: {selected?.credits?.cast?.slice(0, 3).map(c => c.name).join(', ') || '–'}</span>
                  </div>
                  <p className="text-sm text-neutral-200 leading-relaxed line-clamp-6 md:line-clamp-none">{selected.overview || 'No synopsis available.'}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selected.genres?.map(g => <span key={g.id} className="badge border border-white/10">{g.name}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}